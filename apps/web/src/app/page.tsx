import { ArrowRight, Flame, TimerReset, Zap } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { CampusHeat } from "@/components/picks/CampusHeat";
import { SemesterPicks } from "@/components/picks/SemesterPicks";
import { ProductCard } from "@/components/product/ProductCard";
import { ReceiptCard } from "@/components/receipts/ReceiptCard";
import { buttonStyles } from "@/components/ui/Button";
import { ZoneCard } from "@/components/zones/ZoneCard";
import {
  getHeat,
  getProducts,
  getSteals,
  getZones,
} from "@/features/catalog/api";
import { withIndex } from "@/lib/keys";
import { receipts } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [zones, heat, steals, semesterPicks] = await Promise.all([
    getZones(),
    getHeat({ limit: 6 }),
    getSteals({ limit: 4 }),
    getProducts({ limit: 4, sort: "heat" }),
  ]);
  const heatProducts = heat.tiers.flatMap((tier) => tier.items).slice(0, 6);
  const stealProducts = steals.items.slice(0, 4);
  const campusHeatProducts = heat.tiers
    .flatMap((tier) => tier.items)
    .slice(0, 4);
  const semesterPickProducts = semesterPicks.items.slice(0, 4);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="hero-mesh relative overflow-hidden">
          <div className="page-shell grid min-h-[100svh] items-center gap-12 py-20 lg:grid-cols-[1.05fr,0.95fr]">
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <p className="eyebrow">All You Can Order</p>
                <h1
                  className="max-w-3xl font-[var(--font-heading)] font-bold leading-[0.95]"
                  style={{ fontSize: "var(--text-hero)" }}
                >
                  Everything a student needs. In one place.
                </h1>
                <p className="max-w-2xl text-lg text-[var(--ayco-text-secondary)]">
                  We built AYCO around campus life, budget limits, semester
                  chaos, and the need to get the right thing fast.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link className={buttonStyles()} href="/zones">
                  Start Scouting
                </Link>
                <Link
                  className={buttonStyles({ variant: "ghost" })}
                  href="/zones"
                >
                  Browse Zones
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-[var(--ayco-text-secondary)]">
                <span className="flex items-center gap-2">
                  <Zap className="size-4 text-[var(--ayco-brand-cyan)]" />
                  Fast Dispatch
                </span>
                <span className="flex items-center gap-2">
                  <TimerReset className="size-4 text-[var(--ayco-brand-lime)]" />
                  Daily Steals
                </span>
                <span className="flex items-center gap-2">
                  <Flame className="size-4 text-[var(--ayco-brand-amber)]" />
                  Campus Heat
                </span>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {heatProducts.slice(0, 4).map((product, index) => (
                <div
                  className={index % 2 === 1 ? "translate-y-8" : ""}
                  key={product.id}
                  style={{
                    animation: `ayco-float ${4 + index}s ease-in-out infinite`,
                  }}
                >
                  <ProductCard priority={index < 2} product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-white/6 py-6">
          <div className="marquee-track flex gap-5">
            {[...heatProducts, ...heatProducts].map((product, index) => (
              <div
                className="flex min-w-64 items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3"
                key={withIndex(product.id, index, "heat")}
              >
                <span className="font-medium">{product.name}</span>
                <span className="font-mono text-sm text-[var(--ayco-brand-lime)]">
                  ${product.price}
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-[var(--ayco-brand-amber)]">
                  {product.heatScore} Heat
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="page-shell space-y-16 py-16 md:py-24">
          <section className="space-y-6" id="zones">
            <div className="section-heading">
              <p className="eyebrow">Browse Zones</p>
              <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold">
                Six zones. Zero generic shopping energy.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {zones.map((zone) => (
                <ZoneCard key={zone.slug} zone={zone} />
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-[32px] border border-[var(--ayco-brand-lime)]/25 bg-[linear-gradient(135deg,rgba(180,255,58,0.16),rgba(17,17,24,0.92))] p-6 md:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <p className="eyebrow !text-[var(--ayco-brand-lime)]">Steals</p>
                <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold">
                  Under $20 and moving fast.
                </h2>
                <p className="max-w-xl text-sm text-[var(--ayco-text-secondary)]">
                  Today's Steals rotate daily, so if it feels like a hookup,
                  that’s because it is.
                </p>
              </div>
              <Link
                className={buttonStyles({ variant: "lime" })}
                href="/steals"
              >
                See all Steals
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {stealProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="section-heading">
              <p className="eyebrow">Receipts</p>
              <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold">
                Real student receipts, not recycled marketing copy.
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {receipts.map((receipt) => (
                <ReceiptCard key={receipt.id} receipt={receipt} />
              ))}
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                body: "Same-week motion on the stuff you actually need this semester.",
                title: "Fast Dispatch",
              },
              {
                body: "Flip the switch and we rerank the feed around study survival.",
                title: "Exam Mode",
              },
              {
                body: "Campus Heat makes your picks feel local instead of random.",
                title: "Campus Picks",
              },
              {
                body: "Earn Clout every time you Claim, then turn it into Hookups.",
                title: "Clout Rewards",
              },
            ].map((feature) => (
              <article
                className="glass-panel rounded-[var(--radius-xl)] p-6"
                key={feature.title}
              >
                <h3 className="mb-3 font-[var(--font-heading)] text-2xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--ayco-text-secondary)]">
                  {feature.body}
                </p>
              </article>
            ))}
          </section>

          <CampusHeat initialProducts={campusHeatProducts} />
          <SemesterPicks initialProducts={semesterPickProducts} />

          <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[var(--ayco-gradient-hero)] p-8 text-[var(--ayco-text-inverse)] md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <p className="eyebrow !text-[var(--ayco-text-inverse)]/70">
                  Ready to Grab?
                </p>
                <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold">
                  Build your Stash before the semester builds your stress.
                </h2>
              </div>
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-[var(--ayco-text-inverse)] px-5 py-3 font-medium text-[var(--ayco-bg-primary)]"
                href="/zones"
              >
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </section>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
