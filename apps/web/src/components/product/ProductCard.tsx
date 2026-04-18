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

const fallbackImage =
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80";

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
  const primaryImage = product.images[0];
  const rating =
    typeof product.rating === "number" && product.rating > 0
      ? product.rating.toFixed(1)
      : null;
  const showSale =
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price;

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-card)]"
      data-testid="product-card"
      transition={{ duration: 0.22 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative overflow-hidden bg-[var(--bg-muted)]">
        <Link className="block" href={`/product/${product.id}`}>
          <Image
            alt={primaryImage?.alt ?? product.name}
            className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            height={1200}
            priority={priority}
            sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
            src={primaryImage?.src ?? fallbackImage}
            width={960}
          />
        </Link>
        {product.heatScore > 0 ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--accent-amber)]/14 px-3 py-1 text-xs font-semibold text-[var(--accent-amber)]">
            {product.heatScore} Heat
          </span>
        ) : null}
        <button
          aria-label={
            isVaulted(product.id) ? "Remove from Vault" : "Save to Vault"
          }
          className="absolute right-3 top-3 rounded-full border border-[var(--border-subtle)] bg-[rgba(7,11,20,0.72)] p-2 text-[var(--text-strong)] backdrop-blur-md transition hover:border-[var(--accent-cyan)]"
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
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Link
              className="line-clamp-2 block font-[var(--font-heading)] text-lg font-semibold leading-tight text-[var(--text-strong)]"
              href={`/product/${product.id}`}
            >
              {product.name}
            </Link>
            {rating ? (
              <span className="shrink-0 text-sm text-[var(--accent-amber)]">
                <span className="inline-flex items-center gap-1">
                  <Star className="size-4 fill-current" />
                  {rating}
                </span>
              </span>
            ) : null}
          </div>
          <p className="line-clamp-2 min-h-10 text-sm text-[var(--text-body)]">
            {product.description || product.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className="rounded-full bg-white/5 px-3 py-1">
              {product.zone}
            </span>
            {product.dispatchDays > 0 ? (
              <span className="rounded-full bg-white/5 px-3 py-1">
                Ships in {product.dispatchDays} days
              </span>
            ) : null}
          </div>
        </div>
        <div className="mt-auto space-y-4">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-[var(--text-strong)]">
              ${product.price.toFixed(2)}
            </span>
            {showSale ? (
              <span className="text-sm text-[var(--text-muted)] line-through">
                ${product.originalPrice?.toFixed(2)}
              </span>
            ) : null}
          </div>
          <Button
            className={cn("w-full")}
            onClick={() => {
              addItem({
                color: product.colors[0] ?? "One",
                image: primaryImage?.src ?? fallbackImage,
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
      </div>
    </motion.article>
  );
}
