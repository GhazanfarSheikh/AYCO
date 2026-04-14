import { z } from "zod";
export declare const heatTierSchema: z.ZodEnum<{
    cold: "cold";
    warming: "warming";
    heating: "heating";
    blazing: "blazing";
}>;
export declare const heatProductSchema: z.ZodObject<{
    heatScore: z.ZodNumber;
    heatTier: z.ZodEnum<{
        cold: "cold";
        warming: "warming";
        heating: "heating";
        blazing: "blazing";
    }>;
    id: z.ZodString;
    isExamRelevant: z.ZodDefault<z.ZodBoolean>;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
    primaryImage: z.ZodNullable<z.ZodObject<{
        alt: z.ZodNullable<z.ZodString>;
        id: z.ZodString;
        sortOrder: z.ZodNumber;
        type: z.ZodEnum<{
            image: "image";
            video: "video";
        }>;
        url: z.ZodString;
    }, z.core.$strip>>;
    price: z.ZodObject<{
        amount: z.ZodNumber;
        compareAtAmount: z.ZodNullable<z.ZodNumber>;
        currency: z.ZodDefault<z.ZodString>;
    }, z.core.$strip>;
    ratingAverage: z.ZodNullable<z.ZodNumber>;
    ratingCount: z.ZodNumber;
    receiptCount: z.ZodDefault<z.ZodNumber>;
    slug: z.ZodString;
    subtitle: z.ZodNullable<z.ZodString>;
    title: z.ZodString;
    zoneSlugs: z.ZodArray<z.ZodString>;
    campusScore: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
export declare const listHeatQuerySchema: z.ZodObject<{
    campus: z.ZodOptional<z.ZodString>;
    examMode: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    tier: z.ZodOptional<z.ZodEnum<{
        cold: "cold";
        warming: "warming";
        heating: "heating";
        blazing: "blazing";
    }>>;
}, z.core.$strip>;
export declare const heatResponseSchema: z.ZodUnion<readonly [z.ZodObject<{
    data: z.ZodObject<{
        tiers: z.ZodArray<z.ZodObject<{
            items: z.ZodArray<z.ZodObject<{
                heatScore: z.ZodNumber;
                heatTier: z.ZodEnum<{
                    cold: "cold";
                    warming: "warming";
                    heating: "heating";
                    blazing: "blazing";
                }>;
                id: z.ZodString;
                isExamRelevant: z.ZodDefault<z.ZodBoolean>;
                isFeatured: z.ZodDefault<z.ZodBoolean>;
                primaryImage: z.ZodNullable<z.ZodObject<{
                    alt: z.ZodNullable<z.ZodString>;
                    id: z.ZodString;
                    sortOrder: z.ZodNumber;
                    type: z.ZodEnum<{
                        image: "image";
                        video: "video";
                    }>;
                    url: z.ZodString;
                }, z.core.$strip>>;
                price: z.ZodObject<{
                    amount: z.ZodNumber;
                    compareAtAmount: z.ZodNullable<z.ZodNumber>;
                    currency: z.ZodDefault<z.ZodString>;
                }, z.core.$strip>;
                ratingAverage: z.ZodNullable<z.ZodNumber>;
                ratingCount: z.ZodNumber;
                receiptCount: z.ZodDefault<z.ZodNumber>;
                slug: z.ZodString;
                subtitle: z.ZodNullable<z.ZodString>;
                title: z.ZodString;
                zoneSlugs: z.ZodArray<z.ZodString>;
                campusScore: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            }, z.core.$strip>>;
            label: z.ZodString;
            tier: z.ZodEnum<{
                cold: "cold";
                warming: "warming";
                heating: "heating";
                blazing: "blazing";
            }>;
        }, z.core.$strip>>;
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
export type HeatPayload = Exclude<z.infer<typeof heatResponseSchema> extends {
    data: infer T;
} ? T : never, null>;
export type HeatProductDto = z.infer<typeof heatProductSchema>;
export type ListHeatQuery = z.infer<typeof listHeatQuerySchema>;
export type HeatResponse = z.infer<typeof heatResponseSchema>;
//# sourceMappingURL=heat.d.ts.map