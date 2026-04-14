import { SORT_OPTIONS, ZONES } from "@/lib/constants";
import {
  getProductById,
  listProductsByZone,
  listRelatedProducts,
  listStealProducts,
  products,
} from "@/lib/mock-data";
import type { Product, Zone, ZoneSlug } from "@/types/product";

import { CatalogApiError, normalizeCampusSlug } from "./shared";

type ProductQuery = {
  campus?: string;
  examMode?: boolean;
  heatOnly?: boolean;
  limit?: number;
  maxPrice?: number;
  minPrice?: number;
  page?: number;
  q?: string;
  sort?: string;
  zone?: string;
};

function getZoneProductCount(slug: ZoneSlug) {
  return products.filter((product) => product.zone === slug).length;
}

function toZoneWithCount(zone: Zone): Zone {
  return {
    ...zone,
    productCount: getZoneProductCount(zone.slug),
  };
}

function matchesCampus(product: Product, campus?: string) {
  if (!campus) {
    return true;
  }

  const normalizedCampus = normalizeCampusSlug(campus);
  return product.campusHeat.some(
    (entry) => normalizeCampusSlug(entry) === normalizedCampus,
  );
}

function getRankedProducts(input: ProductQuery = {}) {
  const {
    campus,
    examMode,
    heatOnly,
    maxPrice,
    minPrice,
    sort = "newest",
    zone,
  } = input;

  let items = zone ? listProductsByZone(zone as ZoneSlug) : [...products];

  items = items.filter((product) => {
    if (!matchesCampus(product, campus)) {
      return false;
    }

    if (heatOnly && product.heatScore < 80) {
      return false;
    }

    if (minPrice !== undefined && product.price < minPrice) {
      return false;
    }

    if (maxPrice !== undefined && product.price > maxPrice) {
      return false;
    }

    return true;
  });

  const ranked = [...items];
  ranked.sort((left, right) => {
    const leftBoost =
      (examMode && left.tags.includes("Exam Mode") ? 14 : 0) +
      (left.tags.includes("Best Seller") ? 6 : 0);
    const rightBoost =
      (examMode && right.tags.includes("Exam Mode") ? 14 : 0) +
      (right.tags.includes("Best Seller") ? 6 : 0);

    switch (sort) {
      case "price-asc":
        return left.price - right.price;
      case "price-desc":
        return right.price - left.price;
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

export function getFallbackZones() {
  return ZONES.map((zone) => toZoneWithCount(zone));
}

export function getFallbackZoneDetail(slug: string) {
  const zone = ZONES.find((entry) => entry.slug === slug);

  if (!zone) {
    throw new CatalogApiError("That Zone bounced.", "ZONE_NOT_FOUND");
  }

  const zoneProducts = listProductsByZone(zone.slug);
  const prices = zoneProducts.map((product) => product.price);

  return {
    filters: {
      priceRange: prices.length
        ? {
            max: Math.max(...prices),
            min: Math.min(...prices),
          }
        : null,
      sorts: SORT_OPTIONS.map((option) => option.value),
    },
    zone: toZoneWithCount(zone),
  };
}

export function getFallbackProducts(input: ProductQuery = {}) {
  const page = input.page ?? 1;
  const limit = input.limit ?? 20;
  const ranked = getRankedProducts(input);
  const start = (page - 1) * limit;
  const items = ranked.slice(start, start + limit);
  const hasMore = start + limit < ranked.length;

  return {
    items,
    pagination: {
      hasMore,
      nextCursor: hasMore ? String(page + 1) : null,
      page,
      pageSize: limit,
      total: ranked.length,
    },
  };
}

export function getFallbackProductDetail(idOrSlug: string) {
  const product = getProductById(idOrSlug);

  if (!product) {
    throw new CatalogApiError("That product bounced.", "PRODUCT_NOT_FOUND");
  }

  return product;
}

export function getFallbackRelatedProducts(idOrSlug: string) {
  return listRelatedProducts(idOrSlug);
}

export function getFallbackHeat(input: ProductQuery = {}) {
  const ranked = getRankedProducts({
    ...input,
    sort: "heat",
  }).slice(0, input.limit ?? 24);

  return {
    tiers: [
      {
        items: ranked.filter((product) => product.heatScore >= 90),
        label: "Blazing",
        tier: "blazing" as const,
      },
      {
        items: ranked.filter(
          (product) => product.heatScore >= 75 && product.heatScore < 90,
        ),
        label: "Heating Up",
        tier: "heating" as const,
      },
      {
        items: ranked.filter(
          (product) => product.heatScore >= 50 && product.heatScore < 75,
        ),
        label: "Warming",
        tier: "warming" as const,
      },
    ].filter((tier) => tier.items.length > 0),
  };
}

export function getFallbackSteals() {
  const stealItems = listStealProducts();
  const endsAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const startedAt = new Date().toISOString();

  return {
    endsAt,
    items: stealItems,
    lead: stealItems[0] ?? null,
    startedAt,
  };
}

export function getFallbackScout(input: ProductQuery & { q: string }) {
  const query = input.q.trim();

  if (query.length < 2) {
    return {
      products: [],
      query,
      suggestions: [],
      zones: [],
    };
  }

  const normalized = query.toLowerCase();
  const matchedProducts = getRankedProducts({ sort: "heat" })
    .filter((product) => {
      const haystack = [
        product.name,
        product.subtitle,
        product.description,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    })
    .slice(0, 4);

  const matchedZones = ZONES.filter((zone) => {
    return (
      zone.name.toLowerCase().includes(normalized) ||
      zone.description.toLowerCase().includes(normalized)
    );
  }).map((zone) => toZoneWithCount(zone));

  return {
    products: matchedProducts,
    query,
    suggestions: [
      { label: query },
      { label: `${query} under $30` },
      { label: `${query} on Heat` },
    ],
    zones: matchedZones,
  };
}
