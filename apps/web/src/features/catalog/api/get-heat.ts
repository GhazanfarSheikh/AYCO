import { heatResponseSchema, listHeatQuerySchema } from "@ayco/contracts";

import { toHeatViewModel } from "../adapters";
import { getFallbackHeat } from "./fallback";
import { fetchCatalogContractOrNull, normalizeCampusSlug } from "./shared";

export async function getHeat(input: Record<string, unknown> = {}) {
  const query = listHeatQuerySchema.parse({
    ...input,
    campus:
      typeof input.campus === "string"
        ? normalizeCampusSlug(input.campus)
        : undefined,
  });

  const result = await fetchCatalogContractOrNull(
    "/catalog/heat",
    heatResponseSchema,
    {
      next: { revalidate: 60 },
      query,
    },
  );

  if (!result) {
    return getFallbackHeat(query);
  }

  return toHeatViewModel(result.data);
}
