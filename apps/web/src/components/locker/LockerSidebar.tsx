"use client";

import {
  Heart,
  History,
  LayoutDashboard,
  Package,
  Settings,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useClout } from "@/hooks/useClout";
import { cn } from "@/lib/cn";
import { formatCompactNumber } from "@/lib/formatters";
import { useUserStore } from "@/stores/user.store";

import { Badge } from "../ui/Badge";

const lockerLinks = [
  { href: "/locker", icon: LayoutDashboard, label: "Overview" },
  { href: "/claims", icon: Package, label: "Claims" },
  { href: "/vault", icon: Heart, label: "Vault" },
  { href: "/rewind", icon: History, label: "Rewind" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function LockerSidebar() {
  const pathname = usePathname();
  const profile = useUserStore((state) => state.profile);
  const { clout, tier } = useClout();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex size-16 items-center justify-center rounded-full border border-white/10 bg-[var(--ayco-brand-indigo-muted)] font-[var(--font-heading)] text-2xl font-bold">
          {profile.firstName.charAt(0)}
        </div>
        <div className="space-y-2">
          <p className="font-[var(--font-heading)] text-2xl font-bold">
            {profile.firstName}
          </p>
          <p className="text-sm text-[var(--ayco-text-secondary)]">
            {profile.campus}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="amber">
              <Trophy className="size-3.5" />
              {formatCompactNumber(clout)} Clout
            </Badge>
            <Badge tone="cyan">{tier}</Badge>
          </div>
        </div>
      </div>

      <nav className="grid gap-2">
        {lockerLinks.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-md)] px-4 py-3 text-sm transition",
                active
                  ? "bg-[var(--ayco-brand-indigo)] text-white"
                  : "text-[var(--ayco-text-secondary)] hover:bg-white/5 hover:text-[var(--ayco-text-primary)]",
              )}
              href={link.href}
              key={link.href}
            >
              <Icon className="size-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
