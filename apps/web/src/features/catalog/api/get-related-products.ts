import { relatedProductsResponseSchema } from "@ayco/contracts";

import { toProductCardViewModel } from "../adapters";
import { getFallbackRelatedProducts } from "./fallback";
import { fetchCatalogContractOrNull } from "./shared";

export async function getRelatedProducts(idOrSlug: string) {
  const result = await fetchCatalogContractOrNull(
    `/catalog/products/${idOrSlug}/related`,
    relatedProductsResponseSchema,
    {
      next: { revalidate: 60 },
    },
  );

  if (!result) {
    return getFallbackRelatedProducts(idOrSlug);
  }

  return result.data.items.map((item) => toProductCardViewModel(item));
}
