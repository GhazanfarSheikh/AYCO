import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
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
    <Section
      className="pt-0"
      description={`${zoneDetail.zone.productCount ?? 0} products ready to dial in, with filters that stay in flow instead of fighting the layout.`}
      eyebrow={`${zoneDetail.zone.name} Zone`}
      title={zoneDetail.zone.description}
      useContainer={false}
    >
      <ZonePills active={slug} />
      <ZoneExplorer zone={slug} />
    </Section>
  );
}
