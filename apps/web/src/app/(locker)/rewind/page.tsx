"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { useRewind } from "@/hooks/useRewind";

export default function RewindPage() {
  const { clearRewind, groupedByTime } = useRewind();
  const groups = Object.entries(groupedByTime);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="section-heading">
          <p className="eyebrow">Rewind</p>
          <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
            The stuff you checked, side-eyed, then came back to.
          </h1>
        </div>
        <Button onClick={clearRewind} variant="ghost">
          Clear All
        </Button>
      </div>

      {groups.length > 0 ? (
        groups.map(([group, entries]) => (
          <section className="space-y-5" key={group}>
            <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold">
              {group}
            </h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {entries.map((entry) => (
                <div className="space-y-3" key={entry.product.id}>
                  <ProductCard product={entry.product} />
                  <p className="text-sm text-[var(--ayco-text-secondary)]">
                    Viewed{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(entry.viewedAt))}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="glass-panel rounded-[var(--radius-xl)] p-8 text-center">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold">
            Nothing in Rewind yet.
          </h2>
          <p className="mt-3 text-sm text-[var(--ayco-text-secondary)]">
            Open a few product pages and your recent trail will show up here
            automatically.
          </p>
        </div>
      )}
    </div>
  );
}
