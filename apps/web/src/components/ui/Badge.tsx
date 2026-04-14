import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "amber" | "cyan" | "indigo" | "lime" | "neutral";
};

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  amber: "bg-[var(--ayco-brand-amber)]/16 text-[var(--ayco-brand-amber)]",
  cyan: "bg-[var(--ayco-brand-cyan)]/14 text-[var(--ayco-brand-cyan)]",
  indigo: "bg-[var(--ayco-brand-indigo)]/18 text-[var(--ayco-text-primary)]",
  lime: "bg-[var(--ayco-brand-lime)]/18 text-[var(--ayco-brand-lime)]",
  neutral: "bg-white/6 text-[var(--ayco-text-secondary)]",
};

export function Badge({ children, className, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.72rem] font-medium tracking-[0.12em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
