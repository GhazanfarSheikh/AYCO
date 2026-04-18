import Link from "next/link";
import { cn } from "@/lib/cn";
import { ZONES } from "@/lib/constants";
import type { ZoneSlug } from "@/types/product";

export function ZonePills({ active }: { active?: ZoneSlug }) {
  return (
    <div className="scrollbar-none flex gap-3 overflow-x-auto pb-2">
      {ZONES.map((zone) => (
        <Link
          className={cn(
            "min-h-11 rounded-full border px-4 py-2 text-sm transition",
            active === zone.slug
              ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/12 text-white"
              : "border-[var(--border-subtle)] bg-white/5 text-[var(--text-body)]",
          )}
          href={`/zones/${zone.slug}`}
          key={zone.slug}
        >
          {zone.name}
        </Link>
      ))}
    </div>
  );
}
