"use client";

import { useEffect, useState } from "react";

import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import { useInView } from "@/hooks/useInView";
import type { ZoneSlug } from "@/types/product";

import { ProductCard } from "../product/ProductCard";
import { ProductCardSkeleton } from "../product/ProductCardSkeleton";
import { DialInPanel } from "./DialInPanel";

export function ZoneExplorer({ zone }: { zone: ZoneSlug }) {
  const [priceRange, setPriceRange] = useState([5, 80]);
  const [heatOnly, setHeatOnly] = useState(false);
  const [sort, setSort] = useState("heat");
  const { ref, inView } = useInView();
  const query = useInfiniteProducts({
    heatOnly,
    maxPrice: priceRange[1],
    minPrice: priceRange[0],
    sort,
    zone,
  });

  useEffect(() => {
    if (inView && query.hasNextPage && !query.isFetchingNextPage) {
      void query.fetchNextPage();
    }
  }, [inView, query]);

  const items = query.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[290px,1fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <DialInPanel
          onHeatOnlyChange={setHeatOnly}
          onPriceChange={setPriceRange}
          onSortChange={setSort}
        />
      </div>
      <div className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {query.isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index.toString()} />
              ))
            : null}
        </div>
        <div className="flex justify-center py-6" ref={ref}>
          {query.isFetchingNextPage ? (
            <div className="grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index.toString()} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
