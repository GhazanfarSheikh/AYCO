import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";

export default function ProductLoading() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index.toString()} />
        ))}
      </div>
    </div>
  );
}
