import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "amber" | "cyan" | "indigo" | "lime" | "neutral";
};

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  amber: "bg-[var(--accent-amber)]/14 text-[var(--accent-amber)]",
  cyan: "bg-[var(--accent-cyan)]/14 text-[var(--accent-cyan)]",
  indigo: "bg-[var(--brand-500)]/18 text-[var(--text-strong)]",
  lime: "bg-[var(--accent-lime)]/16 text-[var(--accent-lime)]",
  neutral: "bg-white/6 text-[var(--text-body)]",
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
