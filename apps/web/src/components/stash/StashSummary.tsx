"use client";

import Link from "next/link";

import { formatCurrency } from "@/lib/formatters";

import { buttonStyles } from "../ui/Button";
import { Input } from "../ui/Input";

export function StashSummary({ subtotal }: { subtotal: number }) {
  return (
    <div className="space-y-4 rounded-[var(--radius-xl)] border border-white/10 bg-white/4 p-5">
      <div className="flex items-center justify-between text-sm text-[var(--ayco-text-secondary)]">
        <span>Subtotal</span>
        <span className="font-mono text-[var(--ayco-text-primary)]">
          {formatCurrency(subtotal)}
        </span>
      </div>
      <Input label="Got a Hookup code?" placeholder="SPRINGHEAT" />
      <Link className={buttonStyles({ className: "w-full" })} href="/drop">
        Proceed to Drop
      </Link>
    </div>
  );
}
