import { z } from "zod";

import { apiResponseSchema } from "../common/api-response";
import { productCardSchema } from "./products";
import { zoneSummarySchema } from "./zones";

export const scoutSearchQuerySchema = z.object({
  campus: z.string().optional(),
  q: z.string().min(1).max(120),
});

export const scoutSuggestionSchema = z.object({
  label: z.string(),
});

export const scoutSearchResponseSchema = apiResponseSchema(
  z.object({
    products: z.array(productCardSchema),
    query: z.string(),
    suggestions: z.array(scoutSuggestionSchema),
    zones: z.array(zoneSummarySchema),
  }),
);

export type ScoutSearchPayload = Exclude<
  z.infer<
  typeof scoutSearchResponseSchema
> extends { data: infer T }
  ? T
  : never,
  null
>;
export type ScoutSearchResponse = z.infer<typeof scoutSearchResponseSchema>;
export type ScoutQuery = z.infer<typeof scoutSearchQuerySchema>;
