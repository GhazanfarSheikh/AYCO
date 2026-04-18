"use client";

import Link from "next/link";

import { Section } from "@/components/layout/Section";
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
    <div className="space-y-10">
      <Section
        className="py-0"
        description="Your Locker is the member layer of AYCO: recent Claims, current Clout, and the saved products you may want to grab next."
        eyebrow="My Locker"
        title={`Hey, ${profile.firstName}. Your Claims, Clout, and picks are lined up.`}
        useContainer={false}
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            ...stats,
            { label: "Vault Items", value: vaultItems.length },
            { label: "Clout", value: formatCompactNumber(clout) },
          ].map((stat) => (
            <article
              className="surface-panel rounded-[var(--radius-md)] p-5"
              key={stat.label}
            >
              <p className="text-sm text-[var(--text-body)]">{stat.label}</p>
              <p className="mt-3 font-[var(--font-mono)] text-3xl font-bold text-[var(--text-strong)]">
                {stat.value}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <section className="surface-panel rounded-[var(--radius-lg)] p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Claims</p>
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--text-strong)]">
                Recent Claims
              </h2>
              <p className="mt-2 text-sm text-[var(--text-body)]">
                Track what&apos;s prepping, dispatched, and already on the way.
              </p>
            </div>
            <Link className="text-sm text-[var(--accent-cyan)]" href="/claims">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {claims.map((claim) => (
              <Link
                className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/4 px-4 py-3 transition hover:bg-white/7"
                href={`/claims/${claim.id}`}
                key={claim.id}
              >
                <div className="space-y-1">
                  <p className="font-medium text-[var(--text-strong)]">
                    #{claim.id}
                  </p>
                  <p className="text-sm text-[var(--text-body)]">
                    {claim.items} items · ETA {claim.eta}
                  </p>
                </div>
                <Badge tone={claim.status === "Dispatched" ? "cyan" : "amber"}>
                  {claim.status}
                </Badge>
              </Link>
            ))}
          </div>
        </section>

        <section className="surface-panel rounded-[var(--radius-lg)] p-6">
          <div className="space-y-3">
            <p className="eyebrow">Clout</p>
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--text-strong)]">
              {tier} tier is active
            </h2>
            <p className="text-sm text-[var(--text-body)]">
              {remainingToNext > 0
                ? `${formatCompactNumber(remainingToNext)} more to the next tier.`
                : "You hit the top tier. Keep stacking Clout."}
            </p>
            <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/5 p-4">
              <p className="font-[var(--font-mono)] text-4xl font-bold text-[var(--text-strong)]">
                {formatCompactNumber(clout)}
              </p>
              <p className="mt-2 text-sm text-[var(--text-body)]">
                1 Clout per $1 spent, plus bonus Clout for Receipts and
                referrals.
              </p>
            </div>
          </div>
        </section>
      </div>

      <PicksCarousel
        products={listHeatProducts().slice(0, 4)}
        title="Picks for your next Drop"
      />

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">From Your Vault</p>
            <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold text-[var(--text-strong)]">
              Saved now, still worth the Grab.
            </h2>
            <p className="mt-2 text-sm text-[var(--text-body)]">
              Your saved items stay actionable instead of getting buried behind
              noisy account chrome.
            </p>
          </div>
          <Link className="text-sm text-[var(--accent-cyan)]" href="/vault">
            View Vault
          </Link>
        </div>
        {vaultItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {vaultItems.slice(0, 3).map((entry) => (
              <ProductCard key={entry.product.id} product={entry.product} />
            ))}
          </div>
        ) : (
          <div className="surface-panel rounded-[var(--radius-lg)] p-6 text-sm text-[var(--text-body)]">
            Your Vault is quiet right now. Save a few finds and they&apos;ll
            show up here with quick Grab actions.
          </div>
        )}
      </section>
    </div>
  );
}
