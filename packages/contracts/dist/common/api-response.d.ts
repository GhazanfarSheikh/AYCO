import { z } from "zod";
export declare const apiErrorSchema: z.ZodObject<{
    code: z.ZodString;
    details: z.ZodOptional<z.ZodUnknown>;
    message: z.ZodString;
}, z.core.$strip>;
export declare const apiMetaSchema: z.ZodObject<{
    pagination: z.ZodOptional<z.ZodObject<{
        cursor: z.ZodOptional<z.ZodString>;
        hasMore: z.ZodOptional<z.ZodBoolean>;
        nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        page: z.ZodOptional<z.ZodNumber>;
        pageSize: z.ZodOptional<z.ZodNumber>;
        total: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    requestId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare function successResponseSchema<T extends z.ZodTypeAny>(dataSchema: T): z.ZodObject<{
    data: T;
    meta: z.ZodOptional<z.ZodObject<{
        pagination: z.ZodOptional<z.ZodObject<{
            cursor: z.ZodOptional<z.ZodString>;
            hasMore: z.ZodOptional<z.ZodBoolean>;
            nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            page: z.ZodOptional<z.ZodNumber>;
            pageSize: z.ZodOptional<z.ZodNumber>;
            total: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        requestId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    success: z.ZodLiteral<true>;
}, z.core.$strip>;
export declare function errorResponseSchema(): z.ZodObject<{
    data: z.ZodNull;
    error: z.ZodObject<{
        code: z.ZodString;
        details: z.ZodOptional<z.ZodUnknown>;
        message: z.ZodString;
    }, z.core.$strip>;
    meta: z.ZodOptional<z.ZodObject<{
        pagination: z.ZodOptional<z.ZodObject<{
            cursor: z.ZodOptional<z.ZodString>;
            hasMore: z.ZodOptional<z.ZodBoolean>;
            nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            page: z.ZodOptional<z.ZodNumber>;
            pageSize: z.ZodOptional<z.ZodNumber>;
            total: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        requestId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    success: z.ZodLiteral<false>;
}, z.core.$strip>;
export declare function apiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T): z.ZodUnion<readonly [z.ZodObject<{
    data: T;
    meta: z.ZodOptional<z.ZodObject<{
        pagination: z.ZodOptional<z.ZodObject<{
            cursor: z.ZodOptional<z.ZodString>;
            hasMore: z.ZodOptional<z.ZodBoolean>;
            nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            page: z.ZodOptional<z.ZodNumber>;
            pageSize: z.ZodOptional<z.ZodNumber>;
            total: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        requestId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    success: z.ZodLiteral<true>;
}, z.core.$strip>, z.ZodObject<{
    data: z.ZodNull;
    error: z.ZodObject<{
        code: z.ZodString;
        details: z.ZodOptional<z.ZodUnknown>;
        message: z.ZodString;
    }, z.core.$strip>;
    meta: z.ZodOptional<z.ZodObject<{
        pagination: z.ZodOptional<z.ZodObject<{
            cursor: z.ZodOptional<z.ZodString>;
            hasMore: z.ZodOptional<z.ZodBoolean>;
            nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            page: z.ZodOptional<z.ZodNumber>;
            pageSize: z.ZodOptional<z.ZodNumber>;
            total: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        requestId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    success: z.ZodLiteral<false>;
}, z.core.$strip>]>;
export type ApiErrorCode = string;
export type ApiErrorShape = z.infer<typeof apiErrorSchema>;
export type ApiMeta = z.infer<typeof apiMetaSchema>;
export type ApiResponse<T> = {
    data: T;
    error?: never;
    meta?: ApiMeta;
    success: true;
} | {
    data: null;
    error: ApiErrorShape;
    meta?: ApiMeta;
    success: false;
};
//# sourceMappingURL=api-response.d.ts.map