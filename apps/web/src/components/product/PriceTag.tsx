import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/formatters";

export function PriceTag({
  className,
  originalPrice,
  price,
}: {
  className?: string;
  originalPrice?: number;
  price: number;
}) {
  return (
    <div className={cn("flex items-center gap-2 font-mono", className)}>
      <span className="text-lg text-[var(--ayco-text-primary)]">
        {formatCurrency(price)}
      </span>
      {originalPrice ? (
        <span className="text-sm text-[var(--ayco-text-muted)] line-through">
          {formatCurrency(originalPrice)}
        </span>
      ) : null}
    </div>
  );
}
