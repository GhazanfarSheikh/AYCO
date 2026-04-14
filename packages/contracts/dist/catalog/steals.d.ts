import { z } from "zod";
export declare const stealDtoSchema: z.ZodObject<{
    badgeText: z.ZodNullable<z.ZodString>;
    endsAt: z.ZodString;
    id: z.ZodString;
    priority: z.ZodNumber;
    product: z.ZodObject<{
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
    }, z.core.$strip>;
    startsAt: z.ZodString;
    stealPrice: z.ZodNumber;
}, z.core.$strip>;
export declare const listStealsQuerySchema: z.ZodObject<{
    campus: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const stealsResponseSchema: z.ZodUnion<readonly [z.ZodObject<{
    data: z.ZodObject<{
        endsAt: z.ZodNullable<z.ZodString>;
        items: z.ZodArray<z.ZodObject<{
            badgeText: z.ZodNullable<z.ZodString>;
            endsAt: z.ZodString;
            id: z.ZodString;
            priority: z.ZodNumber;
            product: z.ZodObject<{
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
            }, z.core.$strip>;
            startsAt: z.ZodString;
            stealPrice: z.ZodNumber;
        }, z.core.$strip>>;
        lead: z.ZodNullable<z.ZodObject<{
            badgeText: z.ZodNullable<z.ZodString>;
            endsAt: z.ZodString;
            id: z.ZodString;
            priority: z.ZodNumber;
            product: z.ZodObject<{
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
            }, z.core.$strip>;
            startsAt: z.ZodString;
            stealPrice: z.ZodNumber;
        }, z.core.$strip>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
export type StealsPayload = Exclude<z.infer<typeof stealsResponseSchema> extends {
    data: infer T;
} ? T : never, null>;
export type StealDto = z.infer<typeof stealDtoSchema>;
export type ListStealsQuery = z.infer<typeof listStealsQuerySchema>;
export type StealsResponse = z.infer<typeof stealsResponseSchema>;
//# sourceMappingURL=steals.d.ts.map