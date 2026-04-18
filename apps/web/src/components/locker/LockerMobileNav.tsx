"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

const lockerLinks = [
  { href: "/locker", label: "Overview" },
  { href: "/claims", label: "Claims" },
  { href: "/vault", label: "Vault" },
  { href: "/rewind", label: "Rewind" },
  { href: "/settings", label: "Settings" },
];

export function LockerMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="scrollbar-none flex gap-2 overflow-x-auto pb-1 xl:hidden">
      {lockerLinks.map((link) => (
        <Link
          className={cn(
            "min-h-11 whitespace-nowrap rounded-full border border-[var(--border-subtle)] px-4 py-2 text-sm transition",
            (
              link.href === "/locker"
                ? pathname === link.href
                : pathname === link.href || pathname.startsWith(`${link.href}/`)
            )
              ? "bg-[var(--brand-500)] text-white"
              : "bg-white/5 text-[var(--text-body)]",
          )}
          href={link.href}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
