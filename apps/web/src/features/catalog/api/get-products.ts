import {
  catalogProductQuerySchema,
  listProductsResponseSchema,
} from "@ayco/contracts";

import { toProductCardViewModel } from "../adapters";
import { getFallbackProducts } from "./fallback";
import { fetchCatalogContractOrNull, normalizeCampusSlug } from "./shared";

export async function getProducts(input: Record<string, unknown> = {}) {
  const query = catalogProductQuerySchema.parse({
    ...input,
    campus:
      typeof input.campus === "string"
        ? normalizeCampusSlug(input.campus)
        : undefined,
  });

  const result = await fetchCatalogContractOrNull(
    "/catalog/products",
    listProductsResponseSchema,
    {
      query,
    },
  );

  if (!result) {
    return getFallbackProducts(query);
  }

  return {
    items: result.data.items.map((item) => toProductCardViewModel(item)),
    pagination: result.meta?.pagination,
  };
}
