import { listStealsQuerySchema, stealsResponseSchema } from "@ayco/contracts";

import { toStealsViewModel } from "../adapters";
import { getFallbackSteals } from "./fallback";
import { fetchCatalogContractOrNull, normalizeCampusSlug } from "./shared";

export async function getSteals(input: Record<string, unknown> = {}) {
  const query = listStealsQuerySchema.parse({
    ...input,
    campus:
      typeof input.campus === "string"
        ? normalizeCampusSlug(input.campus)
        : undefined,
  });

  const result = await fetchCatalogContractOrNull(
    "/catalog/steals",
    stealsResponseSchema,
    {
      next: { revalidate: 300 },
      query,
    },
  );

  if (!result) {
    return getFallbackSteals();
  }

  return toStealsViewModel(result.data);
}
