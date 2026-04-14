import { forwardRef } from "react";

import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "danger" | "ghost" | "lime" | "primary";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  danger:
    "bg-[var(--ayco-brand-coral)] text-[var(--ayco-text-primary)] hover:opacity-90",
  ghost:
    "border border-white/10 bg-white/5 text-[var(--ayco-text-primary)] hover:border-[var(--ayco-brand-cyan)] hover:bg-[var(--ayco-bg-glass-hover)]",
  lime: "bg-[var(--ayco-brand-lime)] text-[var(--ayco-text-inverse)] hover:brightness-105",
  primary:
    "bg-[var(--ayco-brand-indigo)] text-white shadow-[var(--ayco-glow-indigo)] hover:bg-[var(--ayco-brand-indigo-hover)]",
};

export function buttonStyles({
  className,
  variant = "primary",
}: Pick<ButtonProps, "className" | "variant"> = {}) {
  return cn(
    "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-sm)] px-4 py-3 font-[500] transition duration-200 ease-[var(--ease-out-expo)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, type = "button", variant = "primary", ...props },
    ref,
  ) {
    return (
      <button
        className={buttonStyles({ className, variant })}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);
