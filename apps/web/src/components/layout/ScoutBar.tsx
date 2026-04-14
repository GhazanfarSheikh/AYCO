"use client";

import { Search, Sparkles, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useScout } from "@/hooks/useScout";
import { useScoutStore } from "@/stores/scout.store";
import { useUiStore } from "@/stores/ui.store";

export function ScoutBar() {
  const open = useUiStore((state) => state.scoutOpen);
  const openScout = useUiStore((state) => state.openScout);
  const closeScout = useUiStore((state) => state.closeScout);
  const query = useScoutStore((state) => state.query);
  const setQuery = useScoutStore((state) => state.setQuery);
  const recent = useScoutStore((state) => state.recent);
  const addRecent = useScoutStore((state) => state.addRecent);
  const { isLoading, results } = useScout();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openScout();
      }

      if (event.key === "Escape") {
        closeScout();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeScout, openScout]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 px-4 py-6 backdrop-blur-xl">
      <div className="page-shell glass-panel flex h-full flex-col rounded-[28px] border border-white/10 p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="eyebrow">Scout</div>
          <button
            aria-label="Close Scout"
            className="rounded-full border border-white/10 p-2 text-[var(--ayco-text-secondary)]"
            onClick={closeScout}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>

        <label className="flex items-center gap-3 rounded-[var(--radius-xl)] border border-white/10 bg-white/5 px-5 py-4">
          <Search className="size-5 text-[var(--ayco-brand-cyan)]" />
          <input
            className="w-full bg-transparent text-xl text-[var(--ayco-text-primary)] outline-none placeholder:text-[var(--ayco-text-muted)]"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Scout anything..."
            ref={inputRef}
            value={query}
          />
        </label>

        <div className="mt-8 grid gap-8 overflow-auto md:grid-cols-[1fr,1.2fr,0.8fr]">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--ayco-text-primary)]">
              <Sparkles className="size-4 text-[var(--ayco-brand-cyan)]" />
              Suggested Queries
            </div>
            <div className="flex flex-wrap gap-3">
              {(query
                ? results.suggestions.map((item) => item.label)
                : recent
              ).map((item) => (
                <button
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--ayco-text-secondary)]"
                  key={item}
                  onClick={() => {
                    setQuery(item);
                    addRecent(item);
                  }}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--ayco-text-primary)]">
              <TrendingUp className="size-4 text-[var(--ayco-brand-lime)]" />
              Products
            </div>
            <div className="space-y-3">
              {isLoading ? (
                <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--ayco-text-secondary)]">
                  Scouting results...
                </div>
              ) : null}
              {results.products.slice(0, 4).map((product) => (
                <Link
                  className="flex items-center justify-between rounded-[var(--radius-lg)] border border-white/10 bg-white/5 px-4 py-3"
                  href={`/product/${product.id}`}
                  key={product.id}
                  onClick={() => {
                    addRecent(product.name);
                    closeScout();
                  }}
                >
                  <div>
                    <p className="font-medium text-[var(--ayco-text-primary)]">
                      {product.name}
                    </p>
                    <p className="text-sm text-[var(--ayco-text-secondary)]">
                      {product.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-sm text-[var(--ayco-brand-lime)]">
                    ${product.price}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <p className="text-sm font-medium text-[var(--ayco-text-primary)]">
              Zones
            </p>
            <div className="space-y-3">
              {(results.zones.length ? results.zones : []).map((zone) => (
                <Link
                  className="block rounded-[var(--radius-lg)] border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--ayco-text-secondary)] transition hover:border-[var(--ayco-brand-cyan)]"
                  href={`/zones/${zone.slug}`}
                  key={zone.slug}
                  onClick={closeScout}
                >
                  <span className="block font-medium text-[var(--ayco-text-primary)]">
                    {zone.name} Zone
                  </span>
                  <span>{zone.description}</span>
                </Link>
              ))}
              {!results.zones.length && !query ? (
                <p className="rounded-[var(--radius-lg)] border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--ayco-text-secondary)]">
                  Start typing and we’ll pull matching Zones here.
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
