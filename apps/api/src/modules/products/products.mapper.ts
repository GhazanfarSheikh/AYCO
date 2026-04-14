import type {
  PriceDto,
  ProductCardDto,
  ProductDetailDto,
  ProductSpecDto,
  ProductVariantDto,
} from "@ayco/contracts";
import type { Prisma } from "@ayco/db";

export const productCatalogInclude = {
  media: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  primaryZone: true,
  tags: {
    orderBy: {
      label: "asc",
    },
  },
  variants: {
    include: {
      inventory: true,
      prices: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        where: {
          isActive: true,
        },
      },
    },
    orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
  },
  zones: {
    include: {
      zone: true,
    },
  },
} satisfies Prisma.ProductInclude;

export type ProductCatalogRecord = Prisma.ProductGetPayload<{
  include: typeof productCatalogInclude;
}>;

function toNumber(value: Prisma.Decimal | number | null | undefined) {
  if (value === null || value === undefined) {
    return null;
  }

  return Number(value);
}

function getActivePrice(product: ProductCatalogRecord): PriceDto {
  const fallback =
    product.variants.find((variant) => variant.isDefault) ??
    product.variants[0];
  const price = fallback?.prices[0];

  return {
    amount: Number(price?.amount ?? 0),
    compareAtAmount: toNumber(price?.compareAtAmount),
    currency: price?.currency ?? "USD",
  };
}

function normalizeSpecs(specs: Prisma.JsonValue | null): ProductSpecDto[] {
  if (!Array.isArray(specs)) {
    return [];
  }

  return specs.flatMap((entry) => {
    if (
      entry &&
      typeof entry === "object" &&
      "label" in entry &&
      "value" in entry &&
      typeof entry.label === "string" &&
      typeof entry.value === "string"
    ) {
      return [{ label: entry.label, value: entry.value }];
    }

    return [];
  });
}

export function toProductCardDto(
  product: ProductCatalogRecord,
): ProductCardDto {
  return {
    heatScore: product.heatScore,
    heatTier: product.heatTier,
    id: product.id,
    isExamRelevant: product.isExamRelevant,
    isFeatured: product.isFeatured,
    price: getActivePrice(product),
    primaryImage: product.media[0]
      ? {
          alt: product.media[0].alt,
          id: product.media[0].id,
          sortOrder: product.media[0].sortOrder,
          type: product.media[0].type,
          url: product.media[0].url,
        }
      : null,
    ratingAverage: toNumber(product.ratingAverage),
    ratingCount: product.ratingCount,
    receiptCount: product.receiptCount,
    slug: product.slug,
    subtitle: product.subtitle,
    title: product.title,
    zoneSlugs: product.zones.map((zoneLink) => zoneLink.zone.slug),
  };
}

export function toProductVariantDto(
  product: ProductCatalogRecord,
): ProductVariantDto[] {
  return product.variants.map((variant) => ({
    color: variant.color,
    id: variant.id,
    isDefault: variant.isDefault,
    name: variant.name,
    price: variant.prices[0]
      ? {
          amount: Number(variant.prices[0].amount),
          compareAtAmount: toNumber(variant.prices[0].compareAtAmount),
          currency: variant.prices[0].currency,
        }
      : undefined,
    size: variant.size,
    sku: variant.sku,
  }));
}

export function toProductDetailDto(
  product: ProductCatalogRecord,
): ProductDetailDto {
  return {
    ...toProductCardDto(product),
    description: product.description,
    dispatchDays: product.dispatchDays ?? null,
    features: product.features,
    media: product.media.map((media) => ({
      alt: media.alt,
      id: media.id,
      sortOrder: media.sortOrder,
      type: media.type,
      url: media.url,
    })),
    receiptCount: product.receiptCount,
    specs: normalizeSpecs(product.specs),
    tags: product.tags.map((tag) => tag.label),
    variants: toProductVariantDto(product),
  };
}
