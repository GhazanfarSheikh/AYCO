import { cn } from "@/lib/cn";

export function Chip({
  active,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        "rounded-full border px-3 py-2 text-sm transition",
        active
          ? "border-[var(--ayco-brand-cyan)] bg-[var(--ayco-brand-cyan)]/12 text-[var(--ayco-text-primary)]"
          : "border-white/10 bg-white/5 text-[var(--ayco-text-secondary)] hover:border-white/20",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
