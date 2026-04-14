import { z } from "zod";
import { paginationMetaSchema } from "./pagination";
export const apiErrorSchema = z.object({
    code: z.string(),
    details: z.unknown().optional(),
    message: z.string(),
});
export const apiMetaSchema = z.object({
    pagination: paginationMetaSchema.optional(),
    requestId: z.string().optional(),
});
export function successResponseSchema(dataSchema) {
    return z.object({
        data: dataSchema,
        meta: apiMetaSchema.optional(),
        success: z.literal(true),
    });
}
export function errorResponseSchema() {
    return z.object({
        data: z.null(),
        error: apiErrorSchema,
        meta: apiMetaSchema.optional(),
        success: z.literal(false),
    });
}
export function apiResponseSchema(dataSchema) {
    return z.union([successResponseSchema(dataSchema), errorResponseSchema()]);
}
//# sourceMappingURL=api-response.js.map