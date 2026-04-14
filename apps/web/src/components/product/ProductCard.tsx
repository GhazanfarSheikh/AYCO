"use client";

import { Heart, Star } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { useVault } from "@/hooks/useVault";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { useStashStore } from "@/stores/stash.store";
import { useUiStore } from "@/stores/ui.store";
import type { Product } from "@/types/product";

import { Button } from "../ui/Button";
import { HeatBadge } from "./HeatBadge";
import { PriceTag } from "./PriceTag";

export function ProductCard({
  product,
  priority = false,
}: {
  priority?: boolean;
  product: Product;
}) {
  const addItem = useStashStore((state) => state.addItem);
  const openStash = useUiStore((state) => state.openStash);
  const addPing = useUiStore((state) => state.addPing);
  const { isVaulted, toggle } = useVault();

  return (
    <motion.article
      className="group overflow-hidden rounded-[var(--radius-xl)] border border-white/8 bg-[linear-gradient(180deg,rgba(108,63,255,0.08)_0%,rgba(17,17,24,0.9)_100%)] shadow-[0_8px_30px_rgba(108,63,255,0.05)]"
      transition={{ duration: 0.22 }}
      whileHover={{ y: -6 }}
    >
      <div className="relative overflow-hidden">
        <Link className="block" href={`/product/${product.id}`}>
          <Image
            alt={product.images[0]?.alt ?? product.name}
            className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            height={960}
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            src={product.images[0]?.src ?? ""}
            width={1440}
          />
          {product.heatScore > 80 ? (
            <div className="absolute left-3 top-3">
              <HeatBadge score={product.heatScore} />
            </div>
          ) : null}
        </Link>
        <button
          aria-label={
            isVaulted(product.id) ? "Remove from Vault" : "Save to Vault"
          }
          className="absolute right-3 top-3 rounded-full border border-white/10 bg-[rgba(8,8,13,0.65)] p-2 text-[var(--ayco-text-primary)] backdrop-blur-md transition hover:border-[var(--ayco-brand-cyan)]"
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
        </button>
      </div>
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link
                className="block font-[var(--font-heading)] text-lg font-bold leading-tight"
                href={`/product/${product.id}`}
              >
                {product.name}
              </Link>
              <p className="text-sm text-[var(--ayco-text-secondary)]">
                {product.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-[var(--ayco-text-secondary)]">
              <Star className="size-4 fill-current text-[var(--ayco-brand-amber)]" />
              {product.rating}
            </div>
          </div>
          <PriceTag
            originalPrice={product.originalPrice}
            price={product.price}
          />
        </div>
        <Button
          className={cn("w-full")}
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
            addPing(`${product.name} grabbed. It’s in your Stash.`);
            trackEvent("product_grabbed", { productId: product.id });
          }}
        >
          Grab It
        </Button>
      </div>
    </motion.article>
  );
}
