export type ZoneSlug =
  | "dorm"
  | "tech"
  | "study"
  | "fit"
  | "fashion"
  | "essentials";

export type ProductMedia = {
  alt: string;
  src: string;
};

export type ProductVideo = {
  poster: string;
  src: string;
};

export type Product = {
  campusHeat: string[];
  colors: string[];
  description: string;
  dispatchDays: number;
  features: string[];
  heatScore: number;
  id: string;
  images: ProductMedia[];
  inventory: number;
  isSteal?: boolean;
  name: string;
  originalPrice?: number;
  price: number;
  rating: number;
  receiptCount: number;
  relatedIds: string[];
  sizes: string[];
  specs: Array<{ label: string; value: string }>;
  subtitle: string;
  tags: string[];
  video?: ProductVideo;
  zone: ZoneSlug;
};

export type Zone = {
  accent: string;
  description: string;
  icon: string;
  name: string;
  productCount?: number;
  slug: ZoneSlug;
};
