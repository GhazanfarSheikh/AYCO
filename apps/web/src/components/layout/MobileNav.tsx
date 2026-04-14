"use client";

import { Home, Layers3, Search, ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStash } from "@/hooks/useStash";
import { cn } from "@/lib/cn";
import { useUiStore } from "@/stores/ui.store";

import { CountBadge } from "../ui/CountBadge";

const tabs = [
  { href: "/", icon: Home, label: "Base" },
  { href: "/zones", icon: Layers3, label: "Zones" },
  { action: "scout", icon: Search, label: "Scout" },
  { href: "/stash", icon: ShoppingBag, label: "Stash" },
  { href: "/locker", icon: UserRound, label: "Locker" },
];

export function MobileNav() {
  const pathname = usePathname();
  const openScout = useUiStore((state) => state.openScout);
  const { items } = useStash();

  return (
    <nav className="glass-panel fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-full px-2 py-2 md:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.href
          ? tab.href === "/"
            ? pathname === "/"
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`)
          : false;

        if (tab.action === "scout") {
          return (
            <button
              className="flex min-h-11 min-w-11 flex-col items-center justify-center rounded-full px-3 py-2 text-[0.68rem] text-[var(--ayco-text-secondary)] transition active:scale-[0.97]"
              key={tab.label}
              onClick={openScout}
              type="button"
            >
              <Icon className="size-4" />
              <span>{tab.label}</span>
            </button>
          );
        }

        return (
          <Link
            className={cn(
              "flex min-h-11 min-w-11 flex-col items-center justify-center rounded-full px-3 py-2 text-[0.68rem] transition",
              active
                ? "bg-[var(--ayco-brand-indigo)] text-white"
                : "text-[var(--ayco-text-secondary)]",
            )}
            href={tab.href ?? "/"}
            key={tab.href ?? tab.label}
          >
            <span className="relative">
              <Icon className="size-4" />
              {tab.href === "/stash" && items.length > 0 ? (
                <CountBadge className="absolute -right-3 -top-2 min-h-4 min-w-4 px-1 text-[9px]">
                  {items.length}
                </CountBadge>
              ) : null}
            </span>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
