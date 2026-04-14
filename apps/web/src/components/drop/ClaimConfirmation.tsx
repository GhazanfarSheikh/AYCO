import { PartyPopper } from "lucide-react";
import Link from "next/link";

import { buttonStyles } from "../ui/Button";

export function ClaimConfirmation({ claimId }: { claimId: string }) {
  return (
    <div className="glass-panel flex flex-col gap-4 rounded-[var(--radius-xl)] p-6">
      <div className="flex size-14 items-center justify-center rounded-full bg-[var(--ayco-brand-lime)] text-[var(--ayco-text-inverse)]">
        <PartyPopper className="size-6" />
      </div>
      <div className="space-y-2">
        <h2 className="font-[var(--font-heading)] text-3xl font-bold">
          Claimed! On its way.
        </h2>
        <p className="text-sm text-[var(--ayco-text-secondary)]">
          Claim #{claimId} is locked in. Dispatch estimate: 2 days.
        </p>
      </div>
      <Link className={buttonStyles({ className: "w-fit" })} href="/">
        Continue Scouting
      </Link>
    </div>
  );
}
