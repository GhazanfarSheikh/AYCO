"use client";

import { Heart, Truck } from "lucide-react";
import { useVault } from "@/hooks/useVault";
import { formatRelativeDispatch } from "@/lib/formatters";
import { useStashStore } from "@/stores/stash.store";
import { useUiStore } from "@/stores/ui.store";
import type { Product } from "@/types/product";
import { Button } from "../ui/Button";

export function ProductActionPanel({ product }: { product: Product }) {
  const addItem = useStashStore((state) => state.addItem);
  const openStash = useUiStore((state) => state.openStash);
  const addPing = useUiStore((state) => state.addPing);
  const { isVaulted, toggle } = useVault();

  return (
    <>
      <div className="space-y-3">
        <Button
          className="w-full"
          onClick={() => {
            addItem({
              color: product.colors[0] ?? "One",
              image: product.images[0]?.src ?? "",
              name: product.name,
              price: product.price,
              productId: product.id,
              quantity: 1,
              size: product.sizes[0] ?? "One Size",
            });
            openStash();
            addPing("Grabbed. It’s in your Stash.");
          }}
        >
          Grab It
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            addItem({
              color: product.colors[0] ?? "One",
              image: product.images[0]?.src ?? "",
              name: product.name,
              price: product.price,
              productId: product.id,
              quantity: 1,
              size: product.sizes[0] ?? "One Size",
            });
            window.location.href = "/drop";
          }}
          variant="ghost"
        >
          Cop Now
        </Button>
        <button
          className="inline-flex items-center gap-2 text-sm text-[var(--ayco-text-secondary)] transition hover:text-[var(--ayco-text-primary)]"
          onClick={() => {
            toggle(product.id);
            addPing(
              isVaulted(product.id) ? "Pulled from Vault." : "Saved to Vault.",
            );
          }}
          type="button"
        >
          <Heart
            className="size-4"
            fill={isVaulted(product.id) ? "currentColor" : "none"}
          />
          {isVaulted(product.id) ? "Vaulted" : "Save to Vault"}
        </button>
      </div>

      <div className="glass-panel flex items-center gap-3 rounded-[var(--radius-lg)] px-4 py-3 text-sm text-[var(--ayco-text-secondary)]">
        <Truck className="size-4 text-[var(--ayco-brand-lime)]" />
        <span>{formatRelativeDispatch(product.dispatchDays)}</span>
      </div>
    </>
  );
}
