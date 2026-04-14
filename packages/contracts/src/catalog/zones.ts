import { z } from "zod";

import { apiResponseSchema } from "../common/api-response";

export const zoneSlugSchema = z.string().min(1).max(64);

export const zoneSummarySchema = z.object({
  accent: z.string().nullable().optional(),
  description: z.string().nullable(),
  id: z.string(),
  iconKey: z.string().nullable().optional(),
  imageUrl: z.string().url().nullable(),
  name: z.string(),
  productCount: z.number().int().nonnegative(),
  slug: zoneSlugSchema,
});

export const zoneDetailSchema = z.object({
  filters: z.object({
    priceRange: z
      .object({
        max: z.number().nonnegative(),
        min: z.number().nonnegative(),
      })
      .nullable(),
    sorts: z.array(z.string()),
  }),
  zone: zoneSummarySchema,
});

export const listZonesResponseSchema = apiResponseSchema(
  z.object({
    items: z.array(zoneSummarySchema),
  }),
);

export const getZoneResponseSchema = apiResponseSchema(zoneDetailSchema);

export type ZoneSummary = z.infer<typeof zoneSummarySchema>;
export type ZoneDetailResponse = z.infer<typeof zoneDetailSchema>;
