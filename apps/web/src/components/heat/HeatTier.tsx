import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

import { Badge } from "../ui/Badge";

export function HeatTier({
  products,
  title,
  tone,
}: {
  products: Product[];
  title: string;
  tone: "amber" | "cyan" | "indigo" | "lime" | "neutral";
}) {
  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <Badge tone={tone}>{title}</Badge>
        <div className="space-y-2">
          <h2 className="font-[var(--font-heading)] text-[var(--text-h3)] font-bold text-[var(--text-strong)]">
            {products.length} picks in this tier
          </h2>
          <p className="text-sm text-[var(--text-body)]">
            Ranked by grabs, saves, and current student attention.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
