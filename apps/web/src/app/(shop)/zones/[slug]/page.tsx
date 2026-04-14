import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ZoneExplorer } from "@/components/zones/ZoneExplorer";
import { ZonePills } from "@/components/zones/ZonePills";
import { getZoneDetail } from "@/features/catalog/api";
import { CatalogApiError } from "@/features/catalog/api/shared";
import type { ZoneSlug } from "@/types/product";

type ZonePageProps = {
  params: Promise<{ slug: ZoneSlug }>;
};

export async function generateMetadata({
  params,
}: ZonePageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const zone = await getZoneDetail(slug);

    return {
      description: zone.zone.description,
      title: `${zone.zone.name} Zone | AYCO`,
    };
  } catch {
    return {};
  }
}

export const dynamic = "force-dynamic";

export default async function ZonePage({ params }: ZonePageProps) {
  const { slug } = await params;
  let zoneDetail: Awaited<ReturnType<typeof getZoneDetail>>;
  try {
    zoneDetail = await getZoneDetail(slug);
  } catch (error) {
    if (error instanceof CatalogApiError && error.code === "ZONE_NOT_FOUND") {
      notFound();
    }
    throw error;
  }

  return (
    <section className="space-y-8">
      <div className="section-heading">
        <p className="eyebrow">{zoneDetail.zone.name} Zone</p>
        <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
          {zoneDetail.zone.description}
        </h1>
        <p className="text-sm text-[var(--ayco-text-secondary)]">
          {zoneDetail.zone.productCount ?? 0} products ready to dial in.
        </p>
      </div>
      <ZonePills active={slug} />
      <ZoneExplorer zone={slug} />
    </section>
  );
}
