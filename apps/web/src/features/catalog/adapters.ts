import type {
  HeatPayload,
  ProductCardDto,
  ProductDetailDto,
  ScoutSearchPayload,
  StealsPayload,
  ZoneDetailResponse,
  ZoneSummary,
} from "@ayco/contracts";

import { ZONES } from "@/lib/constants";
import type { Product, Zone, ZoneSlug } from "@/types/product";

function getZoneTheme(slug: string) {
  return ZONES.find((zone) => zone.slug === slug);
}

export function toZoneViewModel(zone: ZoneSummary): Zone {
  const fallback = getZoneTheme(zone.slug);

  return {
    accent: zone.accent ?? fallback?.accent ?? "from-white/5 to-transparent",
    description: zone.description ?? fallback?.description ?? "",
    icon: zone.iconKey ?? fallback?.icon ?? "PackageOpen",
    name: zone.name,
    slug: zone.slug as ZoneSlug,
  };
}

function toBaseProduct(dto: ProductCardDto): Product {
  const primaryImage = dto.primaryImage
    ? {
        alt: dto.primaryImage.alt ?? dto.title,
        src: dto.primaryImage.url,
      }
    : {
        alt: dto.title,
        src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
      };

  return {
    campusHeat: [],
    colors: ["One"],
    description: "",
    dispatchDays: 2,
    features: [],
    heatScore: dto.heatScore,
    id: dto.slug,
    images: [primaryImage],
    inventory: 0,
    name: dto.title,
    originalPrice: dto.price.compareAtAmount ?? undefined,
    price: dto.price.amount,
    rating: dto.ratingAverage ?? 0,
    receiptCount: dto.receiptCount,
    relatedIds: [],
    sizes: ["One Size"],
    specs: [],
    subtitle: dto.subtitle ?? "",
    tags: [],
    zone: (dto.zoneSlugs[0] ?? "essentials") as ZoneSlug,
  };
}

export function toProductCardViewModel(dto: ProductCardDto): Product {
  const product = toBaseProduct(dto);
  return {
    ...product,
    description: dto.subtitle ?? "",
    name: dto.title,
  };
}

export function toProductDetailViewModel(dto: ProductDetailDto): Product {
  const variants = dto.variants;
  const uniqueColors = Array.from(
    new Set(variants.map((variant) => variant.color).filter(Boolean)),
  ) as string[];
  const uniqueSizes = Array.from(
    new Set(variants.map((variant) => variant.size).filter(Boolean)),
  ) as string[];
  const images = dto.media
    .filter((media) => media.type === "image")
    .map((media) => ({
      alt: media.alt ?? dto.title,
      src: media.url,
    }));
  const video = dto.media.find((media) => media.type === "video");

  return {
    ...toBaseProduct(dto),
    colors: uniqueColors.length ? uniqueColors : ["One"],
    description: dto.description,
    dispatchDays: dto.dispatchDays ?? 2,
    features: dto.features,
    images: images.length ? images : toBaseProduct(dto).images,
    name: dto.title,
    relatedIds: [],
    sizes: uniqueSizes.length ? uniqueSizes : ["One Size"],
    specs: dto.specs,
    tags: dto.tags,
    video: video
      ? {
          poster: images[0]?.src ?? video.url,
          src: video.url,
        }
      : undefined,
  };
}

export function toZoneDetailViewModel(response: ZoneDetailResponse) {
  return {
    filters: response.filters,
    zone: toZoneViewModel(response.zone),
  };
}

export function toHeatViewModel(response: HeatPayload) {
  return {
    tiers: response.tiers.map((tier) => ({
      ...tier,
      items: tier.items.map((item) => toProductCardViewModel(item)),
    })),
  };
}

export function toStealsViewModel(response: StealsPayload) {
  return {
    endsAt: response.endsAt,
    items: response.items.map((item) => toProductCardViewModel(item.product)),
    lead: response.lead ? toProductCardViewModel(response.lead.product) : null,
    startedAt: response.startedAt ?? null,
  };
}

export function toScoutViewModel(response: ScoutSearchPayload) {
  return {
    products: response.products.map((product) =>
      toProductCardViewModel(product),
    ),
    query: response.query,
    suggestions: response.suggestions,
    zones: response.zones.map((zone) => toZoneViewModel(zone)),
  };
}
