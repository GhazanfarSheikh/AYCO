import type { MetadataRoute } from "next";

import { getProducts, getZones } from "@/features/catalog/api";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const now = new Date();
  const [zones, products] = await Promise.all([
    getZones(),
    getProducts({ limit: 50, sort: "heat" }),
  ]);

  return [
    "",
    "/zones",
    "/heat",
    "/steals",
    ...zones.map((zone) => `/zones/${zone.slug}`),
    ...products.items.map((product) => `/product/${product.id}`),
  ].map((route) => ({
    lastModified: now,
    url: `${baseUrl}${route}`,
  }));
}
