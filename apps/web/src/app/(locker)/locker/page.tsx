"use client";

import Link from "next/link";

import { PicksCarousel } from "@/components/picks/PicksCarousel";
import { ProductCard } from "@/components/product/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { useClout } from "@/hooks/useClout";
import { useVault } from "@/hooks/useVault";
import { formatCompactNumber } from "@/lib/formatters";
import { claims, listHeatProducts } from "@/lib/mock-data";
import { useUserStore } from "@/stores/user.store";

const stats = [
  { label: "Claims", value: claims.length },
  {
    label: "Active Claims",
    value: claims.filter((claim) =>
      ["Prepping", "Dispatched", "En Route"].includes(claim.status),
    ).length,
  },
];

export default function LockerPage() {
  const profile = useUserStore((state) => state.profile);
  const { clout, remainingToNext, tier } = useClout();
  const { vaultItems } = useVault();

  return (
    <div className="space-y-8">
      <div className="section-heading hidden lg:flex">
        <p className="eyebrow">Your Locker</p>
        <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
          Hey, {profile.firstName}. Your Claims, Clout, and Picks are lined up.
        </h1>
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          ...stats,
          { label: "Vault Items", value: vaultItems.length },
          { label: "Clout", value: formatCompactNumber(clout) },
        ].map((stat) => (
          <article
            className="glass-panel rounded-[var(--radius-xl)] p-5"
            key={stat.label}
          >
            <p className="text-sm text-[var(--ayco-text-secondary)]">
              {stat.label}
            </p>
            <p className="mt-3 font-[var(--font-mono)] text-3xl font-bold">
              {stat.value}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.3fr,0.7fr]">
        <div className="glass-panel rounded-[var(--radius-xl)] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold">
              Recent Claims
            </h2>
            <Link
              className="text-sm text-[var(--ayco-brand-cyan)]"
              href="/claims"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {claims.map((claim) => (
              <Link
                className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-white/8 bg-white/4 px-4 py-3 transition hover:bg-white/7"
                href={`/claims/${claim.id}`}
                key={claim.id}
              >
                <div className="space-y-1">
                  <p className="font-medium">#{claim.id}</p>
                  <p className="text-sm text-[var(--ayco-text-secondary)]">
                    {claim.items} items · ETA {claim.eta}
                  </p>
                </div>
                <Badge tone={claim.status === "Dispatched" ? "cyan" : "amber"}>
                  {claim.status}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[var(--radius-xl)] p-6">
          <div className="space-y-3">
            <p className="eyebrow">Clout Progress</p>
            <h2 className="font-[var(--font-heading)] text-2xl font-bold">
              {tier} tier is active
            </h2>
            <p className="text-sm text-[var(--ayco-text-secondary)]">
              {remainingToNext > 0
                ? `${formatCompactNumber(remainingToNext)} more to the next tier.`
                : "You hit the top tier. Keep stacking Clout."}
            </p>
            <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/5 p-4">
              <p className="font-[var(--font-mono)] text-4xl font-bold">
                {formatCompactNumber(clout)}
              </p>
              <p className="mt-2 text-sm text-[var(--ayco-text-secondary)]">
                1 Clout per $1 spent, plus bonus Clout for Receipts and
                referrals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PicksCarousel
        products={listHeatProducts().slice(0, 4)}
        title="Picks for your next Drop"
      />

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">From Your Vault</p>
            <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold">
              Saved now, still worth the Grab.
            </h2>
          </div>
          <Link className="text-sm text-[var(--ayco-brand-cyan)]" href="/vault">
            View Vault
          </Link>
        </div>
        {vaultItems.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {vaultItems.slice(0, 3).map((entry) => (
              <ProductCard key={entry.product.id} product={entry.product} />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-[var(--radius-xl)] p-6 text-sm text-[var(--ayco-text-secondary)]">
            Your Vault is quiet right now. Save a few finds and they’ll show up
            here with quick Grab actions.
          </div>
        )}
      </section>
    </div>
  );
}
