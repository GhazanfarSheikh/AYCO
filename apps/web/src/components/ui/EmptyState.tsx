import Link from "next/link";

import { buttonStyles } from "./Button";

export function EmptyState({
  body,
  ctaHref,
  ctaLabel,
  title,
}: {
  body: string;
  ctaHref: string;
  ctaLabel: string;
  title: string;
}) {
  return (
    <div className="glass-panel flex flex-col items-start gap-4 rounded-[var(--radius-xl)] p-6">
      <div className="size-14 rounded-[20px] bg-[var(--ayco-gradient-hero)]" />
      <div className="space-y-2">
        <h3 className="font-[var(--font-heading)] text-2xl font-bold">
          {title}
        </h3>
        <p className="max-w-xl text-sm text-[var(--ayco-text-secondary)]">
          {body}
        </p>
      </div>
      <Link className={buttonStyles()} href={ctaHref}>
        {ctaLabel}
      </Link>
    </div>
  );
}
