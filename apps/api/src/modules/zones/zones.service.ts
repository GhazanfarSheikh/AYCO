import { Injectable } from "@nestjs/common";

import { ERROR_CODES } from "@/common/errors/error-codes";
import { DomainError } from "@/common/errors/domain-error";

import { ZonesRepository } from "./zones.repository";

@Injectable()
export class ZonesService {
  constructor(private readonly zonesRepository: ZonesRepository) {}

  async listZones() {
    const items = await this.zonesRepository.listActiveZones();

    return {
      items: items.map((zone) => ({
        accent: zone.accent,
        description: zone.description,
        iconKey: zone.iconKey,
        id: zone.id,
        imageUrl: zone.imageUrl,
        name: zone.name,
        productCount: zone._count.productLinks,
        slug: zone.slug,
      })),
    };
  }

  async getZoneDetail(slug: string) {
    const zone = await this.zonesRepository.findBySlug(slug);

    if (!zone) {
      throw new DomainError(
        ERROR_CODES.zoneNotFound,
        "That Zone bounced.",
        { slug },
        404,
      );
    }

    const priceRange = await this.zonesRepository.findPriceRangeForZone(slug);

    return {
      filters: {
        priceRange,
        sorts: ["newest", "price-asc", "price-desc", "grabbed", "heat"],
      },
      zone: {
        accent: zone.accent,
        description: zone.description,
        iconKey: zone.iconKey,
        id: zone.id,
        imageUrl: zone.imageUrl,
        name: zone.name,
        productCount: zone._count.productLinks,
        slug: zone.slug,
      },
    };
  }
}
