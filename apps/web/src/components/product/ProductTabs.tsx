"use client";

import * as Tabs from "@radix-ui/react-tabs";

import { formatRelativeDispatch } from "@/lib/formatters";
import { listReceiptsForProduct } from "@/lib/mock-data";
import type { Product } from "@/types/product";

import { ReceiptCard } from "../receipts/ReceiptCard";
import { ReceiptForm } from "../receipts/ReceiptForm";
import { ProductCard } from "./ProductCard";

export function ProductTabs({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const receipts = listReceiptsForProduct(product.id);

  return (
    <Tabs.Root className="space-y-6" defaultValue="details">
      <Tabs.List className="sticky top-20 z-10 flex gap-3 overflow-auto rounded-full border border-white/8 bg-[rgba(8,8,13,0.74)] p-2 backdrop-blur-xl">
        {[
          { label: "Details", value: "details" },
          { label: "Receipts", value: "receipts" },
          { label: "Also Grabbed", value: "related" },
          { label: "Dispatch Info", value: "dispatch" },
        ].map((tab) => (
          <Tabs.Trigger
            className="rounded-full px-4 py-2 text-sm text-[var(--ayco-text-secondary)] data-[state=active]:bg-[var(--ayco-brand-indigo)] data-[state=active]:text-white"
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content className="space-y-6" value="details">
        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <article className="glass-panel space-y-4 rounded-[var(--radius-xl)] p-6">
            <h3 className="font-[var(--font-heading)] text-2xl font-bold">
              What it’s giving
            </h3>
            <p className="text-sm leading-7 text-[var(--ayco-text-secondary)]">
              {product.description}
            </p>
            <ul className="grid gap-3 md:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  className="rounded-[var(--radius-md)] border border-white/8 bg-white/4 px-4 py-3 text-sm text-[var(--ayco-text-primary)]"
                  key={feature}
                >
                  {feature}
                </li>
              ))}
            </ul>
          </article>

          <article className="glass-panel rounded-[var(--radius-xl)] p-6">
            <h3 className="mb-4 font-[var(--font-heading)] text-2xl font-bold">
              Specs
            </h3>
            <div className="space-y-3">
              {product.specs.map((spec) => (
                <div
                  className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 text-sm"
                  key={spec.label}
                >
                  <span className="text-[var(--ayco-text-secondary)]">
                    {spec.label}
                  </span>
                  <span className="text-[var(--ayco-text-primary)]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </Tabs.Content>

      <Tabs.Content className="space-y-6" value="receipts">
        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="grid gap-5">
            {receipts.map((receipt) => (
              <ReceiptCard key={receipt.id} receipt={receipt} />
            ))}
          </div>
          <ReceiptForm productId={product.id} />
        </div>
      </Tabs.Content>

      <Tabs.Content className="space-y-6" value="related">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </Tabs.Content>

      <Tabs.Content className="grid gap-4 md:grid-cols-2" value="dispatch">
        <article className="glass-panel rounded-[var(--radius-xl)] p-6">
          <h3 className="mb-4 font-[var(--font-heading)] text-2xl font-bold">
            Dispatch Speed
          </h3>
          <p className="text-sm text-[var(--ayco-text-secondary)]">
            {formatRelativeDispatch(product.dispatchDays)} with tracking the
            second it moves.
          </p>
        </article>
        <article className="glass-panel rounded-[var(--radius-xl)] p-6">
          <h3 className="mb-4 font-[var(--font-heading)] text-2xl font-bold">
            Bounce Policy
          </h3>
          <p className="text-sm text-[var(--ayco-text-secondary)]">
            Bounce it within 14 days if it lands wrong, unopened, or not as
            promised.
          </p>
        </article>
      </Tabs.Content>
    </Tabs.Root>
  );
}
