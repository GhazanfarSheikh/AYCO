"use client";

import { Button } from "@/components/ui/Button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-shell flex min-h-[100svh] items-center justify-center">
      <div className="glass-panel space-y-4 rounded-[var(--radius-xl)] p-8">
        <p className="eyebrow">Ping</p>
        <h1 className="font-[var(--font-heading)] text-3xl font-bold">
          Something bounced. We’re on it.
        </h1>
        <p className="text-sm text-[var(--ayco-text-secondary)]">
          Try again. If it keeps acting up, the issue is on us, not you.
        </p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </main>
  );
}
