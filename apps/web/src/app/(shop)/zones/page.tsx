import type { Metadata } from "next";

import { ZoneCard } from "@/components/zones/ZoneCard";
import { getZones } from "@/features/catalog/api";

export const metadata: Metadata = {
  description:
    "Browse every AYCO Zone, from tech setups to study staples and dorm fixes.",
  title: "Browse Zones | AYCO",
};

export const dynamic = "force-dynamic";

export default async function ZonesPage() {
  const zones = await getZones();

  return (
    <section className="space-y-8">
      <div className="section-heading">
        <p className="eyebrow">Browse Zones</p>
        <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
          Start where your semester actually lives.
        </h1>
        <p className="max-w-2xl text-sm text-[var(--ayco-text-secondary)]">
          Tech for your desk, dorm fixes for your room, and study gear that
          earns its spot.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {zones.map((zone) => (
          <ZoneCard key={zone.slug} zone={zone} />
        ))}
      </div>
    </section>
  );
}
