import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { ProductCard } from "@/components/product/ProductCard";
import { CountdownTimer } from "@/components/steals/CountdownTimer";
import { getSteals } from "@/features/catalog/api";

export const metadata: Metadata = {
  description:
    "Today's student-friendly steals, hookups, and under-$20 fast movers.",
  title: "Steals | AYCO",
};

export const dynamic = "force-dynamic";

export default async function StealsPage() {
  const steals = await getSteals({ limit: 12 });
  const featured = steals.lead;
  const target = steals.endsAt ? new Date(steals.endsAt) : new Date();

  return (
    <Section
      className="pt-0"
      description="Steals rotate every 24 hours. This page now keeps the promise honest: time-based deals and fast movers, without claiming every item sits under the same price ceiling."
      eyebrow="Steals"
      title="Daily deals worth checking before they bounce."
      useContainer={false}
    >
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <p className="max-w-2xl text-sm text-[var(--text-body)]">
          New deals drop every day, and the lead item gets extra space instead
          of forcing the whole section into a glowing promo box.
        </p>
        <CountdownTimer target={target} />
      </div>

      {featured ? (
        <section className="mb-10 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[linear-gradient(135deg,rgba(132,204,22,0.12),rgba(15,21,35,0.92))] p-6 shadow-[var(--shadow-card)]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-center">
            <ProductCard priority product={featured} />
            <div className="space-y-4">
              <p className="eyebrow !text-[var(--accent-lime)]">
                Steal of the Day
              </p>
              <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold text-[var(--text-strong)]">
                {featured.name}
              </h2>
              <p className="max-w-2xl text-[var(--text-body)]">
                {featured.description || featured.subtitle}
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                Featured for pace and value, not because the UI is trying to
                oversell it.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steals.items.slice(featured ? 1 : 0).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
}
