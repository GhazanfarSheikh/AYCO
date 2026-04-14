import { productDetailResponseSchema } from "@ayco/contracts";

import { toProductDetailViewModel } from "../adapters";
import { getFallbackProductDetail } from "./fallback";
import { fetchCatalogContractOrNull } from "./shared";

export async function getProductDetail(idOrSlug: string) {
  const result = await fetchCatalogContractOrNull(
    `/catalog/products/${idOrSlug}`,
    productDetailResponseSchema,
    {
      next: { revalidate: 60 },
    },
  );

  if (!result) {
    return getFallbackProductDetail(idOrSlug);
  }

  return toProductDetailViewModel(result.data);
}
