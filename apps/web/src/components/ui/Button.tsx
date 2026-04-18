import { forwardRef } from "react";

import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "danger" | "ghost" | "lime" | "primary";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  danger:
    "bg-[var(--danger)] text-[var(--text-strong)] shadow-[var(--shadow-soft)] hover:brightness-105",
  ghost:
    "border border-[var(--border-subtle)] bg-white/5 text-[var(--text-strong)] hover:border-[var(--accent-cyan)] hover:bg-white/8",
  lime: "bg-[var(--accent-lime)] text-[var(--text-inverse)] shadow-[var(--shadow-soft)] hover:brightness-105",
  primary:
    "bg-[var(--brand-500)] text-white shadow-[var(--shadow-button)] hover:bg-[var(--brand-600)]",
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
