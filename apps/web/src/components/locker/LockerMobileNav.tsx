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
    <nav className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {lockerLinks.map((link) => (
        <Link
          className={cn(
            "whitespace-nowrap rounded-full border border-white/10 px-4 py-2 text-sm transition",
            pathname === link.href
              ? "bg-[var(--ayco-brand-indigo)] text-white"
              : "bg-white/5 text-[var(--ayco-text-secondary)]",
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
