"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/cn";

export function Avatar({
  fallback,
  ring = "from-[var(--ayco-brand-indigo)] to-[var(--ayco-brand-cyan)]",
}: {
  fallback: string;
  ring?: string;
}) {
  return (
    <div className={cn("rounded-full bg-gradient-to-br p-[2px]", ring)}>
      <AvatarPrimitive.Root className="flex size-10 items-center justify-center rounded-full bg-[var(--ayco-bg-secondary)]">
        <AvatarPrimitive.Fallback className="font-medium text-[var(--ayco-text-primary)]">
          {fallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    </div>
  );
}
