import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "vibes-shimmer rounded-[var(--radius-md)] bg-white/6",
        className,
      )}
    />
  );
}
