import { z } from "zod";
export const paginationMetaSchema = z.object({
    cursor: z.string().optional(),
    hasMore: z.boolean().optional(),
    nextCursor: z.string().nullable().optional(),
    page: z.number().int().positive().optional(),
    pageSize: z.number().int().positive().optional(),
    total: z.number().int().nonnegative().optional(),
});
export function paginatedResponseSchema(itemSchema) {
    return z.object({
        items: z.array(itemSchema),
        pagination: paginationMetaSchema.optional(),
    });
}
//# sourceMappingURL=pagination.js.map