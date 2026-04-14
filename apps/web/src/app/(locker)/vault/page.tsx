"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { useVault } from "@/hooks/useVault";

export default function VaultPage() {
  const { clear, moveToStash, vaultItems } = useVault();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="section-heading">
          <p className="eyebrow">Vault</p>
          <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
            Saved for later, still worth a Grab.
          </h1>
          <p className="text-sm text-[var(--ayco-text-secondary)]">
            {vaultItems.length} item{vaultItems.length === 1 ? "" : "s"} saved.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              for (const item of vaultItems) {
                moveToStash(item.product.id);
              }
            }}
            variant="primary"
          >
            Grab All
          </Button>
          <Button onClick={clear} variant="ghost">
            Clear Vault
          </Button>
        </div>
      </div>

      {vaultItems.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {vaultItems.map((entry) => (
            <ProductCard key={entry.product.id} product={entry.product} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-[var(--radius-xl)] p-8 text-center">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold">
            Your Vault is empty.
          </h2>
          <p className="mt-3 text-sm text-[var(--ayco-text-secondary)]">
            Scout something worth saving, then come back here when you're ready
            to move.
          </p>
        </div>
      )}
    </div>
  );
}
