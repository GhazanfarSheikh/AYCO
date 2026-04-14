"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

const links = [
  { href: "/locker", label: "Overview" },
  { href: "/claims", label: "Claims" },
  { href: "/vault", label: "Vault" },
  { href: "/rewind", label: "Rewind" },
  { href: "/settings", label: "Settings" },
];

export function LockerNav() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-2">
      {links.map((link) => (
        <Link
          className={cn(
            "rounded-[var(--radius-md)] px-4 py-3 text-sm transition",
            pathname === link.href
              ? "bg-[var(--ayco-brand-indigo)] text-white"
              : "text-[var(--ayco-text-secondary)] hover:bg-white/5 hover:text-[var(--ayco-text-primary)]",
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
