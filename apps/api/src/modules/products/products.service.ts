import {
  type ApiMeta,
  type CatalogProductQuery,
  catalogProductQuerySchema,
} from "@ayco/contracts";
import { Injectable } from "@nestjs/common";
import { DomainError } from "@/common/errors/domain-error";
import { ERROR_CODES } from "@/common/errors/error-codes";
import { buildPaginationMeta } from "@/common/http/pagination.util";
import { parsePageNumber } from "@/common/query/parse-pagination";

import { toProductCardDto, toProductDetailDto } from "./products.mapper";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async listProducts(rawQuery: unknown) {
    const parsed = catalogProductQuerySchema.safeParse(rawQuery);
    if (!parsed.success) {
      throw new DomainError(
        ERROR_CODES.catalogFilterInvalid,
        "Those Dial In filters didn't line up.",
        parsed.error.flatten(),
        400,
      );
    }

    const query = parsed.data;
    const page = parsePageNumber(query.page ?? Number(query.cursor));
    const pageSize = query.limit;
    const candidates = await this.productsRepository.listBrowseCandidates({
      campus: query.campus,
      maxPrice: query.maxPrice,
      minPrice: query.minPrice,
      zone: query.zone,
    });

    const ranked = this.rankProducts(
      candidates.map((product) => toProductCardDto(product)),
      query,
    );
    const start = (page - 1) * pageSize;
    const items = ranked.slice(start, start + pageSize);

    return {
      data: { items },
      meta: buildPaginationMeta({
        page,
        pageSize,
        total: ranked.length,
      }),
    } satisfies { data: { items: typeof items }; meta: ApiMeta };
  }

  async getProductDetail(idOrSlug: string) {
    const product = await this.productsRepository.findByIdOrSlug(idOrSlug);

    if (!product) {
      throw new DomainError(
        ERROR_CODES.productNotFound,
        "That product bounced.",
        { idOrSlug },
        404,
      );
    }

    return toProductDetailDto(product);
  }

  async getRelatedProducts(idOrSlug: string) {
    const product = await this.productsRepository.findByIdOrSlug(idOrSlug);

    if (!product) {
      throw new DomainError(
        ERROR_CODES.productNotFound,
        "That product bounced.",
        { idOrSlug },
        404,
      );
    }

    const related = await this.productsRepository.findRelatedCandidates(
      product.id,
      product.zones.map((entry) => entry.zone.slug),
    );

    return {
      items: related.slice(0, 4).map((entry) => toProductCardDto(entry)),
    };
  }

  private rankProducts(
    items: ReturnType<typeof toProductCardDto>[],
    query: CatalogProductQuery,
  ) {
    const ranked = items.filter((item) => {
      if (query.heatOnly && item.heatScore < 80) {
        return false;
      }

      return true;
    });

    ranked.sort((left, right) => {
      const leftBoost = this.getRankingBoost(left, query);
      const rightBoost = this.getRankingBoost(right, query);

      switch (query.sort) {
        case "price-asc":
          return left.price.amount - right.price.amount;
        case "price-desc":
          return right.price.amount - left.price.amount;
        case "grabbed":
          return right.receiptCount - left.receiptCount;
        case "heat":
          return right.heatScore + rightBoost - (left.heatScore + leftBoost);
        default:
          return rightBoost - leftBoost || right.heatScore - left.heatScore;
      }
    });

    return ranked;
  }

  private getRankingBoost(
    item: ReturnType<typeof toProductCardDto>,
    query: CatalogProductQuery,
  ) {
    let boost = 0;

    if (item.isFeatured) {
      boost += 6;
    }

    if (query.examMode && item.isExamRelevant) {
      boost += 14;
    }

    if (query.zone && item.zoneSlugs.includes(query.zone)) {
      boost += 4;
    }

    return boost;
  }
}
