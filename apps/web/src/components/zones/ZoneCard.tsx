import {
  BedDouble,
  BookOpenText,
  Dumbbell,
  Laptop2,
  PackageOpen,
  Shirt,
} from "lucide-react";
import Link from "next/link";

import type { Zone } from "@/types/product";

const iconMap = {
  BedDouble,
  BookOpenText,
  Dumbbell,
  Laptop2,
  PackageOpen,
  Shirt,
} as const;

export function ZoneCard({ zone }: { zone: Zone }) {
  const Icon = iconMap[zone.icon as keyof typeof iconMap];

  return (
    <Link
      className="group surface-panel relative flex h-full flex-col gap-6 overflow-hidden rounded-[var(--radius-lg)] p-6 transition duration-200 hover:-translate-y-1 hover:border-[var(--border-strong)]"
      href={`/zones/${zone.slug}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/45 to-transparent opacity-70" />
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="eyebrow">{zone.name} Zone</p>
          <h3 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--text-strong)]">
            {zone.name}
          </h3>
          <p className="max-w-xs text-sm leading-6 text-[var(--text-body)]">
            {zone.description}
          </p>
        </div>
        <div className="rounded-[20px] border border-[var(--border-subtle)] bg-white/5 p-3 text-[var(--accent-cyan)]">
          <Icon className="size-6" />
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between gap-4 text-sm">
        <span className="text-[var(--text-muted)]">
          {zone.productCount ?? 0} products ready
        </span>
        <span className="font-medium text-[var(--text-strong)] transition group-hover:text-[var(--accent-cyan)]">
          Explore zone
        </span>
      </div>
    </Link>
  );
}
