"use client";

import Image from "next/image";
import { useState } from "react";

import type { Product } from "@/types/product";

import { ProductVideo } from "./ProductVideo";

export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const galleryItems: Array<
    | { kind: "video"; poster: string; src: string }
    | { alt: string; kind: "image"; src: string }
  > = [
    ...(product.video
      ? [
          {
            kind: "video" as const,
            poster: product.video.poster,
            src: product.video.src,
          },
        ]
      : []),
    ...product.images.map((image) => ({
      alt: image.alt,
      kind: "image" as const,
      src: image.src,
    })),
  ];
  const current = galleryItems[index] ?? galleryItems[0];

  if (!current) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-white/4">
        {current.kind === "video" ? (
          <ProductVideo poster={current.poster} src={current.src} />
        ) : (
          <Image
            alt={current.alt}
            className="aspect-square w-full object-cover"
            height={1200}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            src={current.src}
            width={1200}
          />
        )}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {galleryItems.map((item, itemIndex) => (
          <button
            className="overflow-hidden rounded-[var(--radius-md)] border border-white/10"
            key={item.kind === "video" ? "video" : item.src}
            onClick={() => setIndex(itemIndex)}
            type="button"
          >
            {item.kind === "video" ? (
              <div className="flex aspect-square items-center justify-center bg-[var(--ayco-brand-indigo)]/18 text-xs text-[var(--ayco-text-primary)]">
                Video
              </div>
            ) : (
              <Image
                alt={item.alt}
                className="aspect-square w-full object-cover"
                height={240}
                sizes="25vw"
                src={item.src}
                width={240}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
