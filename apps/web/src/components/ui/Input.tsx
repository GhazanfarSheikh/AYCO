import { forwardRef } from "react";

import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, ...props },
  ref,
) {
  return (
    <label className="flex flex-col gap-2 text-sm text-[var(--ayco-text-secondary)]">
      {label ? <span>{label}</span> : null}
      <input
        className={cn(
          "min-h-12 rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3 text-[var(--ayco-text-primary)] placeholder:text-[var(--ayco-text-muted)] focus:border-[var(--ayco-brand-cyan)] focus:outline-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    </label>
  );
});
