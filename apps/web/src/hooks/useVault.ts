"use client";

import { useMemo } from "react";

import { getProductById } from "@/lib/mock-data";
import { useStashStore } from "@/stores/stash.store";
import { useUiStore } from "@/stores/ui.store";
import { useVaultStore } from "@/stores/vault.store";
import type { Product } from "@/types/product";

type VaultProductEntry = {
  product: Product;
  savedAt: string;
};

export function useVault() {
  const items = useVaultStore((state) => state.items);
  const saveItem = useVaultStore((state) => state.saveItem);
  const removeItem = useVaultStore((state) => state.removeItem);
  const addItem = useStashStore((state) => state.addItem);
  const addPing = useUiStore((state) => state.addPing);

  const vaultProducts = useMemo(
    () =>
      items
        .map((item) => ({
          product: getProductById(item.productId),
          savedAt: item.savedAt,
        }))
        .filter(
          (entry): entry is VaultProductEntry => entry.product !== undefined,
        ),
    [items],
  );

  return {
    clear: useVaultStore((state) => state.clear),
    isVaulted: (productId: string) =>
      items.some((item) => item.productId === productId),
    moveToStash: (productId: string) => {
      const product = getProductById(productId);

      if (!product) {
        return;
      }

      addItem({
        color: product.colors[0] ?? "One",
        image: product.images[0]?.src ?? "",
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 1,
        size: product.sizes[0] ?? "One Size",
      });
      removeItem(productId);
      addPing("Moved to Stash.");
    },
    remove: removeItem,
    save: saveItem,
    toggle: (productId: string) => {
      if (items.some((item) => item.productId === productId)) {
        removeItem(productId);
        return;
      }

      saveItem(productId);
    },
    vaultItems: vaultProducts,
  };
}
