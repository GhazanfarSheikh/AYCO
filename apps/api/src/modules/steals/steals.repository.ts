import { Injectable } from "@nestjs/common";
import type { Prisma } from "@ayco/db";

import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { productCatalogInclude } from "@/modules/products/products.mapper";

const stealInclude = {
  product: {
    include: productCatalogInclude,
  },
} satisfies Prisma.StealInclude;

export type StealRecord = Prisma.StealGetPayload<{
  include: typeof stealInclude;
}>;

@Injectable()
export class StealsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listActiveSteals(campus?: string) {
    const now = new Date();
    const [campusSteals, globalSteals] = await Promise.all([
      campus
        ? this.prisma.steal.findMany({
            include: stealInclude,
            orderBy: [{ priority: "desc" }, { endsAt: "asc" }],
            where: {
              campus: { slug: campus },
              endsAt: { gt: now },
              isActive: true,
              startsAt: { lte: now },
            },
          })
        : Promise.resolve([]),
      this.prisma.steal.findMany({
        include: stealInclude,
        orderBy: [{ priority: "desc" }, { endsAt: "asc" }],
        where: {
          campusId: null,
          endsAt: { gt: now },
          isActive: true,
          startsAt: { lte: now },
        },
      }),
    ]);

    return [...campusSteals, ...globalSteals];
  }
}
