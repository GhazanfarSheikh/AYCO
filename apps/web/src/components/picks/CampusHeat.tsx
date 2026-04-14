"use client";

import { useQuery } from "@tanstack/react-query";
import { getHeat } from "@/features/catalog/api";
import { useUserStore } from "@/stores/user.store";
import type { Product } from "@/types/product";

import { ProductCard } from "../product/ProductCard";

export function CampusHeat({
  initialProducts = [],
}: {
  initialProducts?: Product[];
}) {
  const campus = useUserStore((state) => state.profile.campus);
  const { data } = useQuery({
    initialData: {
      tiers: initialProducts.length
        ? [
            {
              items: initialProducts,
              label: "Campus Heat",
              tier: "warming",
            },
          ]
        : [],
    },
    queryFn: () => getHeat({ campus, limit: 4 }),
    queryKey: ["campus-heat", campus],
    staleTime: 60_000,
  });
  const campusProducts = data?.tiers.flatMap((tier) => tier.items) ?? [];

  return (
    <section className="space-y-5">
      <div className="section-heading">
        <p className="eyebrow">Campus Heat</p>
        <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold">
          On Heat at {campus}
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {campusProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
