import { type Prisma, ProductStatus } from "@ayco/db";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/infrastructure/prisma/prisma.service";

import {
  type ProductCatalogRecord,
  productCatalogInclude,
} from "./products.mapper";

type BrowseProductsInput = {
  campus?: string;
  maxPrice?: number;
  minPrice?: number;
  zone?: string;
};

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listBrowseCandidates(
    input: BrowseProductsInput,
  ): Promise<ProductCatalogRecord[]> {
    return this.prisma.product.findMany({
      include: productCatalogInclude,
      orderBy: [{ updatedAt: "desc" }],
      where: this.buildWhere(input),
    });
  }

  async findByIdOrSlug(idOrSlug: string): Promise<ProductCatalogRecord | null> {
    return this.prisma.product.findFirst({
      include: productCatalogInclude,
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        status: ProductStatus.active,
      },
    });
  }

  async findRelatedCandidates(
    productId: string,
    zoneSlugs: string[],
  ): Promise<ProductCatalogRecord[]> {
    return this.prisma.product.findMany({
      include: productCatalogInclude,
      orderBy: [{ heatScore: "desc" }, { ratingCount: "desc" }],
      take: 12,
      where: {
        id: {
          not: productId,
        },
        status: ProductStatus.active,
        zones: zoneSlugs.length
          ? {
              some: {
                zone: {
                  slug: {
                    in: zoneSlugs,
                  },
                },
              },
            }
          : undefined,
      },
    });
  }

  private buildWhere(input: BrowseProductsInput): Prisma.ProductWhereInput {
    return {
      OR: input.campus
        ? [{ campus: { slug: input.campus } }, { campusId: null }]
        : undefined,
      status: ProductStatus.active,
      variants:
        input.minPrice !== undefined || input.maxPrice !== undefined
          ? {
              some: {
                prices: {
                  some: {
                    amount: {
                      gte: input.minPrice,
                      lte: input.maxPrice,
                    },
                    isActive: true,
                  },
                },
              },
            }
          : undefined,
      zones: input.zone
        ? {
            some: {
              zone: {
                slug: input.zone,
              },
            },
          }
        : undefined,
    };
  }
}
