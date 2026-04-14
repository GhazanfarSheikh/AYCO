import { Injectable } from "@nestjs/common";

import type { ProductCatalogRecord } from "@/modules/products/products.mapper";

@Injectable()
export class ScoutRanker {
  rankProducts(term: string, products: ProductCatalogRecord[]) {
    const normalizedTerm = term.toLowerCase();

    return [...products].sort((left, right) => {
      return this.scoreProduct(right, normalizedTerm) - this.scoreProduct(left, normalizedTerm);
    });
  }

  private scoreProduct(product: ProductCatalogRecord, term: string) {
    const title = product.title.toLowerCase();
    const subtitle = product.subtitle?.toLowerCase() ?? "";
    const zoneMatch = product.zones.some((zoneLink) =>
      zoneLink.zone.slug.toLowerCase().includes(term),
    );
    const keywordMatch = product.searchKeywords.some((keyword) =>
      keyword.toLowerCase().includes(term),
    );
    const tagMatch = product.tags.some((tag) => tag.label.toLowerCase().includes(term));

    let score = product.heatScore;

    if (title === term) {
      score += 100;
    } else if (title.startsWith(term)) {
      score += 70;
    } else if (title.includes(term)) {
      score += 50;
    }

    if (subtitle.includes(term)) {
      score += 20;
    }

    if (keywordMatch) {
      score += 24;
    }

    if (tagMatch) {
      score += 18;
    }

    if (zoneMatch) {
      score += 14;
    }

    if (product.isExamRelevant && ["study", "exam", "finals", "focus"].some((entry) => term.includes(entry))) {
      score += 22;
    }

    return score;
  }
}
