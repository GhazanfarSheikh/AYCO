import { Skeleton } from "../ui/Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3 rounded-[var(--radius-xl)] border border-white/8 bg-white/4 p-4">
      <Skeleton className="aspect-[16/10] w-full rounded-[var(--radius-lg)]" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full rounded-[var(--radius-md)]" />
    </div>
  );
}
