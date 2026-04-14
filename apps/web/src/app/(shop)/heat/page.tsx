import type { Metadata } from "next";

import { HeatTier } from "@/components/heat/HeatTier";
import { getHeat } from "@/features/catalog/api";

export const metadata: Metadata = {
  description: "See what’s on Heat right now across AYCO and campus life.",
  title: "Heat | AYCO",
};

export const dynamic = "force-dynamic";

export default async function HeatPage() {
  const heat = await getHeat({ limit: 24 });
  const blazing =
    heat.tiers.find((tier) => tier.tier === "blazing")?.items ?? [];
  const heatingUp =
    heat.tiers.find((tier) => tier.tier === "heating")?.items ?? [];
  const warming =
    heat.tiers.find((tier) => tier.tier === "warming")?.items ?? [];

  return (
    <section className="space-y-8">
      <div className="section-heading">
        <p className="eyebrow">Heat</p>
        <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
          What's On Heat right now.
        </h1>
        <p className="text-[var(--ayco-text-secondary)]">
          The most grabbed, most vaulted, and most talked-about products across
          AYCO.
        </p>
        <div className="topline-gradient h-0.5 w-full rounded-full" />
      </div>
      <HeatTier
        color="var(--ayco-brand-coral)"
        products={blazing}
        title="Blazing"
        tone="amber"
      />
      <HeatTier
        color="var(--ayco-brand-amber)"
        products={heatingUp}
        title="Heating Up"
        tone="cyan"
      />
      <HeatTier
        color="var(--ayco-brand-indigo)"
        products={warming}
        title="Warming"
        tone="indigo"
      />
    </section>
  );
}
