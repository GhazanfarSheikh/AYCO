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
      className={`relative overflow-hidden rounded-[var(--radius-xl)] border border-white/8 bg-gradient-to-br ${zone.accent} p-5`}
      href={`/zones/${zone.slug}`}
    >
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="eyebrow">{zone.name} Zone</p>
          <h3 className="font-[var(--font-heading)] text-2xl font-bold">
            {zone.name}
          </h3>
          <p className="max-w-xs text-sm text-[var(--ayco-text-secondary)]">
            {zone.description}
          </p>
        </div>
        <div className="rounded-[20px] border border-white/12 bg-white/6 p-3">
          <Icon className="size-6 text-[var(--ayco-text-primary)]" />
        </div>
      </div>
    </Link>
  );
}
