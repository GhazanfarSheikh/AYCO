"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useStash } from "@/hooks/useStash";
import { useUiStore } from "@/stores/ui.store";

import { Drawer } from "../ui/Drawer";
import { EmptyStash } from "./EmptyStash";
import { StashItem } from "./StashItem";
import { StashSummary } from "./StashSummary";

export function StashDrawer() {
  const desktop = useMediaQuery("(min-width: 768px)");
  const open = useUiStore((state) => state.stashOpen);
  const closeStash = useUiStore((state) => state.closeStash);
  const { items, removeItem, subtotal, updateQuantity } = useStash();

  return (
    <Drawer
      onOpenChange={(isOpen) => (isOpen ? null : closeStash())}
      open={open}
      side={desktop ? "right" : "bottom"}
      title={`Your Stash (${items.length})`}
    >
      <div className="space-y-4">
        {items.length ? (
          <>
            <div className="max-h-[50vh] space-y-3 overflow-auto pr-1">
              {items.map((item) => (
                <StashItem
                  item={item}
                  key={item.id}
                  onQuantityChange={(quantity) =>
                    updateQuantity(item.id, quantity)
                  }
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>
            <StashSummary subtotal={subtotal()} />
          </>
        ) : (
          <EmptyStash />
        )}
      </div>
    </Drawer>
  );
}
