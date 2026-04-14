import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

import { Badge } from "../ui/Badge";
import { HeatScoreRing } from "./HeatScoreRing";

export function HeatTier({
  color,
  products,
  title,
  tone,
}: {
  color: string;
  products: Product[];
  title: string;
  tone: "amber" | "cyan" | "indigo" | "lime" | "neutral";
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Badge tone={tone}>{title}</Badge>
          <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold">
            {products.length} picks in this tier
          </h2>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((product) => (
          <div className="relative" key={product.id}>
            <div className="absolute right-3 top-3 z-10">
              <HeatScoreRing color={color} score={product.heatScore} />
            </div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
