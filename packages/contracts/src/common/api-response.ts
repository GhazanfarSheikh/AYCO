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

export function successResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
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

export function apiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.union([successResponseSchema(dataSchema), errorResponseSchema()]);
}

export type ApiErrorCode = string;
export type ApiErrorShape = z.infer<typeof apiErrorSchema>;
export type ApiMeta = z.infer<typeof apiMetaSchema>;
export type ApiResponse<T> =
  | {
      data: T;
      error?: never;
      meta?: ApiMeta;
      success: true;
    }
  | {
      data: null;
      error: ApiErrorShape;
      meta?: ApiMeta;
      success: false;
    };
