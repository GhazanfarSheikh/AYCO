"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";

import { formatCurrency } from "@/lib/formatters";
import type { StashItem as StashItemType } from "@/types/stash";

type StashItemProps = {
  item: StashItemType;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
};

export function StashItem({
  item,
  onQuantityChange,
  onRemove,
}: StashItemProps) {
  return (
    <div className="flex gap-4 rounded-[var(--radius-lg)] border border-white/8 bg-white/4 p-3">
      <Image
        alt={item.name}
        className="size-20 rounded-[var(--radius-md)] object-cover"
        height={160}
        src={item.image}
        width={160}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-[var(--ayco-text-primary)]">
              {item.name}
            </p>
            <p className="text-xs text-[var(--ayco-text-secondary)]">
              {item.color} / {item.size}
            </p>
          </div>
          <button
            aria-label={`Remove ${item.name}`}
            className="rounded-full border border-white/10 p-2 text-[var(--ayco-text-secondary)]"
            onClick={onRemove}
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
            <button
              className="p-1"
              onClick={() => onQuantityChange(item.quantity - 1)}
              type="button"
            >
              <Minus className="size-4" />
            </button>
            <span className="min-w-6 text-center text-sm">{item.quantity}</span>
            <button
              className="p-1"
              onClick={() => onQuantityChange(item.quantity + 1)}
              type="button"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <span className="font-mono text-sm">
            {formatCurrency(item.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
