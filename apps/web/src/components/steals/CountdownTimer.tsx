"use client";

import { useMemo } from "react";

import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/cn";

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function CountdownTimer({
  className,
  target,
}: {
  className?: string;
  target: Date;
}) {
  const { hours, minutes, seconds } = useCountdown(target);
  const urgent = hours < 1;
  const critical = hours === 0 && minutes < 5;
  const parts = useMemo(
    () => [
      { label: "hours", value: pad(hours) },
      { label: "minutes", value: pad(minutes) },
      { label: "seconds", value: pad(seconds) },
    ],
    [hours, minutes, seconds],
  );

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 font-[var(--font-mono)] text-lg",
        urgent && "text-[var(--ayco-brand-coral)]",
        critical && "shadow-[var(--ayco-glow-heat)]",
        className,
      )}
    >
      {parts.map((part, index) => (
        <span className="flex items-center gap-2" key={part.label}>
          <span className="min-w-8 text-center">{part.value}</span>
          {index < parts.length - 1 ? (
            <span className="text-[var(--ayco-text-secondary)]">:</span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
