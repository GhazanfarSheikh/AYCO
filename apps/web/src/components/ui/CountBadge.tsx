import { cn } from "@/lib/cn";

export function CountBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[var(--ayco-brand-lime)] px-1.5 text-[10px] font-bold text-[var(--ayco-text-inverse)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
