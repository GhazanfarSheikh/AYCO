import type { Product } from "@/types/product";

import { ProductCard } from "../product/ProductCard";

export function PicksCarousel({
  products,
  title = "Your Picks",
}: {
  products: Product[];
  title?: string;
}) {
  return (
    <section className="space-y-5">
      <div className="section-heading">
        <p className="eyebrow">Picks</p>
        <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold text-[var(--text-strong)]">
          {title}
        </h2>
        <p className="max-w-2xl text-sm text-[var(--text-body)]">
          Curated to feel like useful recommendations, not filler between bigger
          sections.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
