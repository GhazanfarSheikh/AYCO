import { scoutSearchQuerySchema } from "@ayco/contracts";
import { Injectable } from "@nestjs/common";
import { DomainError } from "@/common/errors/domain-error";
import { ERROR_CODES } from "@/common/errors/error-codes";
import { toProductCardDto } from "@/modules/products/products.mapper";

import { ScoutRanker } from "./scout.ranker";
import { ScoutRepository } from "./scout.repository";

@Injectable()
export class ScoutService {
  constructor(
    private readonly scoutRanker: ScoutRanker,
    private readonly scoutRepository: ScoutRepository,
  ) {}

  async search(rawQuery: unknown) {
    const parsed = scoutSearchQuerySchema.safeParse(rawQuery);
    if (!parsed.success) {
      throw new DomainError(
        ERROR_CODES.scoutQueryInvalid,
        "That Scout query didn't come through clean.",
        parsed.error.flatten(),
        400,
      );
    }

    const query = parsed.data.q.trim();
    if (query.length < 2) {
      return {
        products: [],
        query,
        suggestions: [],
        zones: [],
      };
    }

    const [products, zones] = await Promise.all([
      this.scoutRepository.searchProducts(query, parsed.data.campus),
      this.scoutRepository.searchZones(query),
    ]);

    const rankedProducts = this.scoutRanker
      .rankProducts(query, products)
      .slice(0, 4)
      .map((product) => toProductCardDto(product));

    return {
      products: rankedProducts,
      query,
      suggestions: [
        { label: query },
        { label: `${query} under $30` },
        { label: `${query} on Heat` },
      ],
      zones: zones.map((zone) => ({
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
}
