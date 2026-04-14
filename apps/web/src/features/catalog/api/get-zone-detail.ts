import { getZoneResponseSchema } from "@ayco/contracts";

import { toZoneDetailViewModel } from "../adapters";
import { getFallbackZoneDetail } from "./fallback";
import { fetchCatalogContractOrNull } from "./shared";

export async function getZoneDetail(slug: string) {
  const result = await fetchCatalogContractOrNull(
    `/catalog/zones/${slug}`,
    getZoneResponseSchema,
    {
      next: { revalidate: 60 },
    },
  );

  if (!result) {
    return getFallbackZoneDetail(slug);
  }

  return toZoneDetailViewModel(result.data);
}
