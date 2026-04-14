import {
  scoutSearchQuerySchema,
  scoutSearchResponseSchema,
} from "@ayco/contracts";

import { toScoutViewModel } from "../adapters";
import { getFallbackScout } from "./fallback";
import { fetchCatalogContractOrNull, normalizeCampusSlug } from "./shared";

export async function searchScout(input: { campus?: string; q: string }) {
  const query = scoutSearchQuerySchema.parse({
    ...input,
    campus: normalizeCampusSlug(input.campus),
  });
  const result = await fetchCatalogContractOrNull(
    "/scout/search",
    scoutSearchResponseSchema,
    {
      query,
    },
  );

  if (!result) {
    return getFallbackScout(query);
  }

  return toScoutViewModel(result.data);
}
