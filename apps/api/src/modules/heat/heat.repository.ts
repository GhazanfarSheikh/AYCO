import { Injectable } from "@nestjs/common";
import type { Prisma } from "@ayco/db";
import { ProductStatus } from "@ayco/db";

import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { productCatalogInclude } from "@/modules/products/products.mapper";

const buildHeatInclude = (campus?: string) =>
  ({
    ...productCatalogInclude,
    heatSnapshots: {
      orderBy: {
        capturedAt: "desc",
      },
      take: 1,
      where: campus
        ? {
            campus: {
              slug: campus,
            },
          }
        : {
            campusId: null,
          },
    },
  }) satisfies Prisma.ProductInclude;

export type HeatProductRecord = Prisma.ProductGetPayload<{
  include: ReturnType<typeof buildHeatInclude>;
}>;

@Injectable()
export class HeatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listHeatCandidates(campus?: string) {
    return this.prisma.product.findMany({
      include: buildHeatInclude(campus),
      where: {
        status: ProductStatus.active,
      },
    });
  }
}
