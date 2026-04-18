import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
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
    <Section
      className="pt-0"
      description="Each zone is meant to be a real entry point into the catalog, with cleaner context and product counts that help you scan faster."
      eyebrow="Browse Zones"
      title="Start where your semester actually lives."
      useContainer={false}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {zones.map((zone) => (
          <ZoneCard key={zone.slug} zone={zone} />
        ))}
      </div>
    </Section>
  );
}
