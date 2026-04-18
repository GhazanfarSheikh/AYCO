import type { Metadata } from "next";

import { HeatTier } from "@/components/heat/HeatTier";
import { Section } from "@/components/layout/Section";
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
    <Section
      className="pt-0"
      description="Heat ranks what is actually moving across grabs, saves, and student attention. Each tier stays full-width and readable instead of reserving space for unfinished decoration."
      eyebrow="Heat"
      title="What&apos;s on Heat right now"
      useContainer={false}
    >
      <div className="space-y-10">
        <HeatTier products={blazing} title="Blazing" tone="amber" />
        <HeatTier products={heatingUp} title="Heating Up" tone="cyan" />
        <HeatTier products={warming} title="Warming" tone="indigo" />
      </div>
    </Section>
  );
}
