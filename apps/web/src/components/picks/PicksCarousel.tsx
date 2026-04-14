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
        <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold">
          {title}
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
