import { Injectable } from "@nestjs/common";
import { ProductStatus } from "@ayco/db";

import { PrismaService } from "@/infrastructure/prisma/prisma.service";

@Injectable()
export class ZonesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listActiveZones() {
    return this.prisma.zone.findMany({
      include: {
        _count: {
          select: {
            productLinks: true,
          },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      where: {
        isActive: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.zone.findFirst({
      include: {
        _count: {
          select: {
            productLinks: true,
          },
        },
      },
      where: {
        isActive: true,
        slug,
      },
    });
  }

  async findPriceRangeForZone(slug: string) {
    const prices = await this.prisma.productPrice.findMany({
      select: {
        amount: true,
      },
      where: {
        isActive: true,
        productVariant: {
          product: {
            status: ProductStatus.active,
            zones: {
              some: {
                zone: {
                  slug,
                },
              },
            },
          },
        },
      },
    });

    if (!prices.length) {
      return null;
    }

    const amounts = prices.map((entry) => Number(entry.amount));

    return {
      max: Math.max(...amounts),
      min: Math.min(...amounts),
    };
  }
}
