import type { Metadata } from "next";
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
    <section className="space-y-8">
      <div className="section-heading">
        <p className="eyebrow">Steals</p>
        <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
          Daily Steals worth checking before they bounce.
        </h1>
        <p className="text-[var(--ayco-text-secondary)]">
          New deals drop every 24 hours. Grab them before the reset hits.
        </p>
        <CountdownTimer target={target} />
      </div>

      {featured ? (
        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[var(--ayco-gradient-steal)] p-[1px]">
          <div className="grid gap-6 rounded-[31px] bg-[var(--ayco-bg-primary)] p-6 lg:grid-cols-[1.05fr,0.95fr]">
            <ProductCard priority product={featured} />
            <div className="flex flex-col justify-center gap-4">
              <p className="eyebrow !text-[var(--ayco-brand-lime)]">
                Steal Of The Day
              </p>
              <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold">
                {featured.name}
              </h2>
              <p className="max-w-xl text-[var(--ayco-text-secondary)]">
                {featured.description}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {steals.items.slice(1).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
