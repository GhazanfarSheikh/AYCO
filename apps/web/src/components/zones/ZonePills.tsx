import Link from "next/link";
import { cn } from "@/lib/cn";
import { ZONES } from "@/lib/constants";
import type { ZoneSlug } from "@/types/product";

export function ZonePills({ active }: { active?: ZoneSlug }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {ZONES.map((zone) => (
        <Link
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition",
            active === zone.slug
              ? "border-[var(--ayco-brand-cyan)] bg-[var(--ayco-brand-cyan)]/12 text-white"
              : "border-white/10 bg-white/5 text-[var(--ayco-text-secondary)]",
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
