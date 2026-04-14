"use client";

import { Bell, Heart, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useStash } from "@/hooks/useStash";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/constants";
import { useUiStore } from "@/stores/ui.store";
import { useUserStore } from "@/stores/user.store";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { CountBadge } from "../ui/CountBadge";

export function Navbar() {
  const pathname = usePathname();
  const direction = useScrollDirection();
  const { items } = useStash();
  const openScout = useUiStore((state) => state.openScout);
  const openStash = useUiStore((state) => state.openStash);
  const examMode = useUserStore((state) => state.preferences.examMode);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-white/6 bg-[rgba(8,8,13,0.72)] backdrop-blur-xl transition duration-300 md:top-3 md:mx-3 md:rounded-full md:border",
        direction === "down"
          ? "-translate-y-full md:-translate-y-3"
          : "translate-y-0",
      )}
    >
      <div className="page-shell flex min-h-18 items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-4">
          <Link
            className="font-[var(--font-heading)] text-xl font-bold"
            href="/"
          >
            AYCO
          </Link>
          {examMode ? <Badge tone="indigo">Exam Mode</Badge> : null}
        </div>

        <nav className="hidden items-center gap-4 text-sm text-[var(--ayco-text-secondary)] md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              className={cn(
                "transition hover:text-[var(--ayco-text-primary)]",
                pathname === link.href && "text-[var(--ayco-text-primary)]",
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="hidden min-w-56 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-[var(--ayco-text-muted)] md:flex"
            onClick={openScout}
            type="button"
          >
            <Sparkles className="size-4 text-[var(--ayco-brand-cyan)]" />
            Scout anything...
          </button>
          <Button className="md:hidden" onClick={openScout} variant="ghost">
            Scout
          </Button>
          <Link
            aria-label="Your Vault"
            className="hidden rounded-full border border-white/10 p-3 text-[var(--ayco-text-secondary)] md:inline-flex"
            href="/vault"
          >
            <Heart className="size-4" />
          </Link>
          <button
            aria-label="Pings"
            className="rounded-full border border-white/10 p-3 text-[var(--ayco-text-secondary)]"
            type="button"
          >
            <Bell className="size-4" />
          </button>
          <button
            aria-label={`Your Stash (${items.length})`}
            className="relative rounded-full border border-white/10 p-3 text-[var(--ayco-text-secondary)]"
            onClick={openStash}
            type="button"
          >
            <ShoppingBag className="size-4" />
            <CountBadge className="absolute -right-1 -top-1">
              {items.length}
            </CountBadge>
          </button>
        </div>
      </div>
    </header>
  );
}
