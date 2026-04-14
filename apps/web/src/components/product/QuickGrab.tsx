"use client";

import { useStashStore } from "@/stores/stash.store";
import { useUiStore } from "@/stores/ui.store";
import type { Product } from "@/types/product";

import { Button } from "../ui/Button";
import { PriceTag } from "./PriceTag";

export function QuickGrab({ product }: { product: Product }) {
  const addItem = useStashStore((state) => state.addItem);
  const openStash = useUiStore((state) => state.openStash);

  return (
    <div className="glass-panel fixed inset-x-3 bottom-3 z-20 flex items-center justify-between gap-4 rounded-full p-3 md:hidden">
      <PriceTag originalPrice={product.originalPrice} price={product.price} />
      <Button
        className="min-w-32"
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
        }}
      >
        Grab It
      </Button>
    </div>
  );
}
