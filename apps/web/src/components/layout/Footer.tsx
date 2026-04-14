import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/8 pb-24 pt-12 md:pb-12">
      <div className="page-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="eyebrow">ALL YOU CAN ORDER</p>
          <h2 className="font-[var(--font-heading)] text-3xl font-bold">
            Built for students, not boomers.
          </h2>
          <p className="max-w-xl text-sm text-[var(--ayco-text-secondary)]">
            Fast Dispatch, smarter Picks, and a Stash that moves with your
            semester.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-[var(--ayco-text-secondary)]">
          <Link href="/zones">Browse Zones</Link>
          <Link href="/heat">On Heat</Link>
          <Link href="/steals">Today's Steals</Link>
          <Link href="/locker">Your Locker</Link>
        </div>
      </div>
    </footer>
  );
}
