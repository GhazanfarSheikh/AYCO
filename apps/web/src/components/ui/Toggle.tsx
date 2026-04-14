"use client";

import * as Switch from "@radix-ui/react-switch";
import { useId } from "react";

export function Toggle({
  checked,
  description,
  label,
  onCheckedChange,
}: {
  checked: boolean;
  description?: string;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}) {
  const id = useId();

  return (
    <label
      className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3"
      htmlFor={id}
    >
      <span className="space-y-1">
        <span className="block text-sm text-[var(--ayco-text-primary)]">
          {label}
        </span>
        {description ? (
          <span className="block text-xs text-[var(--ayco-text-secondary)]">
            {description}
          </span>
        ) : null}
      </span>
      <Switch.Root
        checked={checked}
        className="relative h-7 w-12 rounded-full bg-white/12 transition duration-200 data-[state=checked]:bg-[var(--ayco-brand-indigo)]"
        id={id}
        onCheckedChange={onCheckedChange}
      >
        <Switch.Thumb className="block size-5 translate-x-1 rounded-full bg-white transition duration-200 data-[state=checked]:translate-x-6" />
      </Switch.Root>
    </label>
  );
}
