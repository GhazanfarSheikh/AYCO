import { z } from "zod";

export const productDetailParamsSchema = z.object({
  idOrSlug: z.string().min(1).max(160),
});

export type ProductDetailParamsDto = z.infer<typeof productDetailParamsSchema>;
