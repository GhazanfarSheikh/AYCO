import { z } from "zod";

import { apiResponseSchema } from "../common/api-response";
import { productCardSchema } from "./products";

export const stealDtoSchema = z.object({
  badgeText: z.string().nullable(),
  endsAt: z.string().datetime(),
  id: z.string(),
  priority: z.number().int().nonnegative(),
  product: productCardSchema,
  startsAt: z.string().datetime(),
  stealPrice: z.number().nonnegative(),
});

export const listStealsQuerySchema = z.object({
  campus: z.string().optional(),
  limit: z.coerce.number().int().positive().max(50).default(12),
});

export const stealsResponseSchema = apiResponseSchema(
  z.object({
    endsAt: z.string().datetime().nullable(),
    items: z.array(stealDtoSchema),
    lead: stealDtoSchema.nullable(),
    startedAt: z.string().datetime().nullable().optional(),
  }),
);

export type StealsPayload = Exclude<
  z.infer<
  typeof stealsResponseSchema
> extends { data: infer T }
  ? T
  : never,
  null
>;
export type StealDto = z.infer<typeof stealDtoSchema>;
export type ListStealsQuery = z.infer<typeof listStealsQuerySchema>;
export type StealsResponse = z.infer<typeof stealsResponseSchema>;
