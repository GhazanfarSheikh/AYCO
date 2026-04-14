"use client";

import { useStash } from "@/hooks/useStash";
import { listHeatProducts } from "@/lib/mock-data";

import { ProductCard } from "../product/ProductCard";
import { EmptyStash } from "./EmptyStash";
import { StashItem } from "./StashItem";
import { StashSummary } from "./StashSummary";

export function StashView() {
  const { items, removeItem, subtotal, updateQuantity } = useStash();

  if (!items.length) {
    return <EmptyStash />;
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-6 xl:grid-cols-[1fr,360px]">
        <div className="space-y-4">
          {items.map((item) => (
            <StashItem
              item={item}
              key={item.id}
              onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>
        <div className="xl:sticky xl:top-24 xl:self-start">
          <StashSummary subtotal={subtotal()} />
        </div>
      </div>

      <section className="space-y-5">
        <div className="section-heading">
          <p className="eyebrow">Also Grabbed</p>
          <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold">
            Students also grabbed
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {listHeatProducts()
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
    </div>
  );
}
