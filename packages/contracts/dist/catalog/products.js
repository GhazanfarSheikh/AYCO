import { z } from "zod";
import { apiResponseSchema } from "../common/api-response";
export const priceSchema = z.object({
    amount: z.number().nonnegative(),
    compareAtAmount: z.number().nonnegative().nullable(),
    currency: z.string().default("USD"),
});
export const productMediaSchema = z.object({
    alt: z.string().nullable(),
    id: z.string(),
    sortOrder: z.number().int().nonnegative(),
    type: z.enum(["image", "video"]),
    url: z.string().url(),
});
export const productVariantSchema = z.object({
    color: z.string().nullable(),
    id: z.string(),
    isDefault: z.boolean(),
    name: z.string(),
    price: priceSchema.optional(),
    size: z.string().nullable(),
    sku: z.string(),
});
export const productSpecSchema = z.object({
    label: z.string(),
    value: z.string(),
});
export const productCardSchema = z.object({
    heatScore: z.number().int().nonnegative(),
    heatTier: z.enum(["cold", "warming", "heating", "blazing"]),
    id: z.string(),
    isExamRelevant: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    primaryImage: productMediaSchema.nullable(),
    price: priceSchema,
    ratingAverage: z.number().nonnegative().nullable(),
    ratingCount: z.number().int().nonnegative(),
    receiptCount: z.number().int().nonnegative().default(0),
    slug: z.string(),
    subtitle: z.string().nullable(),
    title: z.string(),
    zoneSlugs: z.array(z.string()),
});
export const productDetailSchema = productCardSchema.extend({
    description: z.string(),
    dispatchDays: z.number().int().positive().nullable(),
    features: z.array(z.string()),
    media: z.array(productMediaSchema),
    receiptCount: z.number().int().nonnegative(),
    specs: z.array(productSpecSchema),
    tags: z.array(z.string()),
    variants: z.array(productVariantSchema),
});
export const catalogProductQuerySchema = z.object({
    campus: z.string().optional(),
    cursor: z.string().optional(),
    examMode: z.coerce.boolean().optional(),
    heatOnly: z.coerce.boolean().optional(),
    limit: z.coerce.number().int().positive().max(50).default(20),
    maxPrice: z.coerce.number().nonnegative().optional(),
    minPrice: z.coerce.number().nonnegative().optional(),
    page: z.coerce.number().int().positive().optional(),
    sort: z
        .enum(["newest", "price-asc", "price-desc", "grabbed", "heat"])
        .default("newest"),
    zone: z.string().optional(),
});
export const listProductsResponseSchema = apiResponseSchema(z.object({
    items: z.array(productCardSchema),
}));
export const productDetailResponseSchema = apiResponseSchema(productDetailSchema);
export const relatedProductsResponseSchema = apiResponseSchema(z.object({
    items: z.array(productCardSchema),
}));
//# sourceMappingURL=products.js.map