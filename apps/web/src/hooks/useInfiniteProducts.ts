"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getProducts } from "@/features/catalog/api";
import type { Product, ZoneSlug } from "@/types/product";

type ProductFilters = {
  examMode?: boolean;
  heatOnly?: boolean;
  maxPrice?: number;
  minPrice?: number;
  sort?: string;
  zone?: ZoneSlug;
};

export function useInfiniteProducts(filters: ProductFilters = {}) {
  return useInfiniteQuery<{
    items: Product[];
    nextCursor?: string | null;
    total?: number;
  }>({
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: "1",
    queryFn: async ({ pageParam }) => {
      const result = await getProducts({
        ...filters,
        limit: 6,
        page: Number(pageParam),
      });

      return {
        items: result.items,
        nextCursor: result.pagination?.nextCursor,
        total: result.pagination?.total,
      };
    },
    queryKey: ["products", filters],
  });
}
