import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeatBadge } from "@/components/product/HeatBadge";
import { PriceTag } from "@/components/product/PriceTag";
import { ProductActionPanel } from "@/components/product/ProductActionPanel";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPageTracker } from "@/components/product/ProductPageTracker";
import { ProductTabs } from "@/components/product/ProductTabs";
import { QuickGrab } from "@/components/product/QuickGrab";
import { Chip } from "@/components/ui/Chip";
import { getProductDetail, getRelatedProducts } from "@/features/catalog/api";
import { CatalogApiError } from "@/features/catalog/api/shared";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProductDetail(id);

    return {
      description: product.description,
      title: `${product.name} | AYCO`,
    };
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  let product: Awaited<ReturnType<typeof getProductDetail>>;
  try {
    product = await getProductDetail(id);
  } catch (error) {
    if (
      error instanceof CatalogApiError &&
      error.code === "PRODUCT_NOT_FOUND"
    ) {
      notFound();
    }
    throw error;
  }
  const relatedProducts = await getRelatedProducts(id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.receiptCount,
    },
    availability: "https://schema.org/InStock",
    image: product.images.map((image) => image.src),
    name: product.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: product.price,
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <section className="grid gap-10 lg:grid-cols-[1fr,0.92fr]">
        <ProductGallery product={product} />

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <HeatBadge score={product.heatScore} />
              <Link
                className="text-sm text-[var(--ayco-brand-cyan)]"
                href="#receipts"
              >
                {product.receiptCount} Receipts
              </Link>
            </div>
            <div className="space-y-3">
              <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
                {product.name}
              </h1>
              <p className="text-[var(--ayco-text-secondary)]">
                {product.subtitle}
              </p>
            </div>
            <PriceTag
              className="text-3xl"
              originalPrice={product.originalPrice}
              price={product.price}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-[var(--ayco-text-secondary)]">Color</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Chip active key={color}>
                    {color}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-[var(--ayco-text-secondary)]">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Chip key={size}>{size}</Chip>
                ))}
              </div>
            </div>
          </div>

          <ProductActionPanel product={product} />
        </div>
      </section>

      <section className="mt-14 space-y-6">
        <ProductTabs product={product} relatedProducts={relatedProducts} />
      </section>

      <ProductPageTracker productId={product.id} />
      <QuickGrab product={product} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}
