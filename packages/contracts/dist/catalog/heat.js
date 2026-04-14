import { z } from "zod";
import { apiResponseSchema } from "../common/api-response";
import { productCardSchema } from "./products";
export const heatTierSchema = z.enum(["cold", "warming", "heating", "blazing"]);
export const heatProductSchema = productCardSchema.extend({
    campusScore: z.number().int().nonnegative().nullable().optional(),
});
export const listHeatQuerySchema = z.object({
    campus: z.string().optional(),
    examMode: z.coerce.boolean().optional(),
    limit: z.coerce.number().int().positive().max(50).default(24),
    tier: heatTierSchema.optional(),
});
export const heatResponseSchema = apiResponseSchema(z.object({
    tiers: z.array(z.object({
        items: z.array(heatProductSchema),
        label: z.string(),
        tier: heatTierSchema,
    })),
}));
//# sourceMappingURL=heat.js.map