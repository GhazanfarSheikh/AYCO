import { ArrowRight, Flame, ShieldCheck, TimerReset, Zap } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { Section } from "@/components/layout/Section";
import { ProductCard } from "@/components/product/ProductCard";
import { ReceiptCard } from "@/components/receipts/ReceiptCard";
import { buttonStyles } from "@/components/ui/Button";
import { ZoneCard } from "@/components/zones/ZoneCard";
import { getHeat, getProducts, getZones } from "@/features/catalog/api";
import { receipts } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [zones, heat, featuredProducts] = await Promise.all([
    getZones(),
    getHeat({ limit: 8 }),
    getProducts({ limit: 4, sort: "heat" }),
  ]);
  const heatProducts = heat.tiers.flatMap((tier) => tier.items).slice(0, 4);
  const heroProduct = featuredProducts.items[0] ?? heatProducts[0];

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="hero-mesh relative overflow-hidden section-space">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,460px)] lg:gap-14">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="eyebrow">All You Can Order</p>
                  <h1 className="hero-title max-w-3xl font-[var(--font-heading)] font-bold text-[var(--text-strong)]">
                    Student shopping that feels sharp, fast, and believable.
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-[var(--text-body)] sm:text-lg">
                    AYCO turns campus essentials into a cleaner flow: browse by
                    zone, catch what&apos;s on Heat, and save the good stuff in
                    your Locker before the semester gets noisy.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link className={buttonStyles()} href="/zones">
                    Start Scouting
                  </Link>
                  <Link
                    className={buttonStyles({ variant: "ghost" })}
                    href="/heat"
                  >
                    See What&apos;s on Heat
                  </Link>
                </div>
                <div className="grid gap-3 text-sm text-[var(--text-body)] sm:grid-cols-3">
                  <div className="surface-panel rounded-[var(--radius-md)] p-4">
                    <div className="flex items-center gap-2 text-[var(--accent-cyan)]">
                      <Zap className="size-4" />
                      Fast Dispatch
                    </div>
                    <p className="mt-2 text-[var(--text-muted)]">
                      Built for dorm timelines, not warehouse vibes.
                    </p>
                  </div>
                  <div className="surface-panel rounded-[var(--radius-md)] p-4">
                    <div className="flex items-center gap-2 text-[var(--accent-amber)]">
                      <Flame className="size-4" />
                      Campus Heat
                    </div>
                    <p className="mt-2 text-[var(--text-muted)]">
                      See what students are actually grabbing right now.
                    </p>
                  </div>
                  <div className="surface-panel rounded-[var(--radius-md)] p-4">
                    <div className="flex items-center gap-2 text-[var(--accent-lime)]">
                      <ShieldCheck className="size-4" />
                      Better Trust
                    </div>
                    <p className="mt-2 text-[var(--text-muted)]">
                      Cleaner cards, honest pricing, and stronger hierarchy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="surface-panel rounded-[var(--radius-xl)] p-4 sm:p-5">
                  {heroProduct ? (
                    <ProductCard priority product={heroProduct} />
                  ) : (
                    <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8">
                      <p className="text-[var(--text-body)]">
                        The featured lineup is warming up right now.
                      </p>
                    </div>
                  )}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      Featured Focus
                    </p>
                    <p className="mt-2 text-sm text-[var(--text-body)]">
                      One strong visual, real product context, and no floating
                      filler cards.
                    </p>
                  </div>
                  <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      Daily Motion
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-[var(--text-body)]">
                      <TimerReset className="size-4 text-[var(--accent-lime)]" />
                      New steals rotate every 24 hours without fake pricing
                      claims.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="scrollbar-none mt-10 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
              {heatProducts.map((product) => (
                <Link
                  className="snap-start whitespace-nowrap rounded-full border border-[var(--border-subtle)] bg-white/5 px-4 py-2 text-sm text-[var(--text-body)] transition hover:bg-white/10"
                  href={`/product/${product.id}`}
                  key={product.id}
                >
                  {product.name} · ${product.price.toFixed(2)} ·{" "}
                  {product.heatScore} Heat
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <Section
          description="AYCO works best when the catalog feels predictable. Start with a zone, then narrow into the products that actually fit the semester."
          eyebrow="Browse Zones"
          title="Six zones with real entry points, not random category noise."
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {zones.map((zone) => (
              <ZoneCard key={zone.slug} zone={zone} />
            ))}
          </div>
        </Section>

        <Section
          description="The most grabbed, most saved, and most talked-about products across AYCO right now."
          eyebrow="Heat"
          title="Featured products with a clearer sense of urgency."
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              Heat shows what&apos;s moving, without turning the whole page into
              one giant glow effect.
            </p>
            <Link
              className="text-sm font-medium text-[var(--accent-cyan)]"
              href="/heat"
            >
              View all Heat
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {heatProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                priority={index === 0}
                product={product}
              />
            ))}
          </div>
        </Section>

        <Section
          description="The commerce layer feels more trustworthy when the social proof feels grounded and specific."
          eyebrow="Receipts"
          title="Real student receipts, not overworked marketing filler."
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {receipts.map((receipt) => (
              <ReceiptCard key={receipt.id} receipt={receipt} />
            ))}
          </div>
        </Section>

        <Section className="pt-0">
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[linear-gradient(135deg,rgba(109,94,252,0.16),rgba(15,21,35,0.92))] p-8 shadow-[var(--shadow-card)] md:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="space-y-4">
                <p className="eyebrow !text-white/70">My Locker</p>
                <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold text-white">
                  Keep Claims, Clout, and saved picks in one calmer place.
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-white/78 sm:text-base">
                  The Locker now reads like a member space instead of a broken
                  dashboard: cleaner stats, better flow, and clearer next steps.
                </p>
              </div>
              <Link
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-[var(--text-inverse)]"
                href="/locker"
              >
                Open My Locker
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
