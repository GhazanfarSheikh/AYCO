import { z } from "zod";
export declare const paginationMetaSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    hasMore: z.ZodOptional<z.ZodBoolean>;
    nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    page: z.ZodOptional<z.ZodNumber>;
    pageSize: z.ZodOptional<z.ZodNumber>;
    total: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare function paginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T): z.ZodObject<{
    items: z.ZodArray<T>;
    pagination: z.ZodOptional<z.ZodObject<{
        cursor: z.ZodOptional<z.ZodString>;
        hasMore: z.ZodOptional<z.ZodBoolean>;
        nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        page: z.ZodOptional<z.ZodNumber>;
        pageSize: z.ZodOptional<z.ZodNumber>;
        total: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
//# sourceMappingURL=pagination.d.ts.map