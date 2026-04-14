import { listZonesResponseSchema } from "@ayco/contracts";

import { toZoneViewModel } from "../adapters";
import { getFallbackZones } from "./fallback";
import { fetchCatalogContractOrNull } from "./shared";

export async function getZones() {
  const result = await fetchCatalogContractOrNull(
    "/catalog/zones",
    listZonesResponseSchema,
    {
      next: { revalidate: 300 },
    },
  );

  if (!result) {
    return getFallbackZones();
  }

  return result.data.items.map((zone) => toZoneViewModel(zone));
}
