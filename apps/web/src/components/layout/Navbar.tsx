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
        "sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[rgba(7,11,20,0.82)] backdrop-blur-xl transition duration-300 lg:top-3 lg:mx-3 lg:rounded-full lg:border",
        direction === "down"
          ? "-translate-y-full lg:-translate-y-3"
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

        <nav className="hidden items-center gap-5 text-sm text-[var(--text-body)] lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              className={cn(
                "transition hover:text-[var(--text-strong)]",
                pathname === link.href && "text-[var(--text-strong)]",
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
            className="hidden min-w-64 items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-white/5 px-4 py-3 text-left text-sm text-[var(--text-muted)] lg:flex"
            onClick={openScout}
            type="button"
          >
            <Sparkles className="size-4 text-[var(--ayco-brand-cyan)]" />
            Search dorm, tech, study gear...
          </button>
          <Button className="lg:hidden" onClick={openScout} variant="ghost">
            Scout
          </Button>
          <Link
            aria-label="Your Vault"
            className="hidden rounded-full border border-[var(--border-subtle)] p-3 text-[var(--text-body)] lg:inline-flex"
            href="/vault"
          >
            <Heart className="size-4" />
          </Link>
          <button
            aria-label="Pings"
            className="rounded-full border border-[var(--border-subtle)] p-3 text-[var(--text-body)]"
            type="button"
          >
            <Bell className="size-4" />
          </button>
          <button
            aria-label={`Your Stash (${items.length})`}
            className="relative rounded-full border border-[var(--border-subtle)] p-3 text-[var(--text-body)]"
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
