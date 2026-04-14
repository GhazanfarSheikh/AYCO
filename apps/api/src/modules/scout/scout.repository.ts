import { Injectable } from "@nestjs/common";
import { ProductStatus } from "@ayco/db";

import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { productCatalogInclude } from "@/modules/products/products.mapper";

@Injectable()
export class ScoutRepository {
  constructor(private readonly prisma: PrismaService) {}

  async searchProducts(term: string, campus?: string) {
    return this.prisma.product.findMany({
      include: productCatalogInclude,
      take: 20,
      where: {
        AND: [
          {
            OR: [
              { title: { contains: term, mode: "insensitive" } },
              { subtitle: { contains: term, mode: "insensitive" } },
              { description: { contains: term, mode: "insensitive" } },
              { searchKeywords: { has: term.toLowerCase() } },
              {
                tags: {
                  some: {
                    label: { contains: term, mode: "insensitive" },
                  },
                },
              },
              {
                zones: {
                  some: {
                    zone: {
                      name: { contains: term, mode: "insensitive" },
                    },
                  },
                },
              },
            ],
          },
          campus ? { OR: [{ campus: { slug: campus } }, { campusId: null }] } : {},
        ],
        status: ProductStatus.active,
      },
    });
  }

  async searchZones(term: string) {
    return this.prisma.zone.findMany({
      include: {
        _count: {
          select: {
            productLinks: true,
          },
        },
      },
      take: 6,
      where: {
        isActive: true,
        OR: [
          { name: { contains: term, mode: "insensitive" } },
          { description: { contains: term, mode: "insensitive" } },
          { slug: { contains: term, mode: "insensitive" } },
        ],
      },
    });
  }
}
