import Link from "next/link";

import { buttonStyles } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="page-shell space-y-10 py-20">
      <section className="glass-panel space-y-5 rounded-[var(--radius-xl)] p-8">
        <p className="eyebrow">Page Bounced</p>
        <h1 className="font-[var(--font-heading)] text-4xl font-bold">
          This page bounced. Let’s find what you need.
        </h1>
        <p className="max-w-2xl text-sm text-[var(--ayco-text-secondary)]">
          We couldn’t find that route, but the good stuff is still live across
          Zones, Heat, and today’s Steals.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link className={buttonStyles()} href="/zones">
            Browse Zones
          </Link>
          <Link className={buttonStyles({ variant: "ghost" })} href="/heat">
            See What’s On Heat
          </Link>
        </div>
      </section>
    </main>
  );
}
