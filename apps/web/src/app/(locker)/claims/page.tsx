import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { formatClaimId, formatPrice } from "@/lib/formatters";
import { claims } from "@/lib/mock-data";

function getClaimTone(status: string) {
  switch (status) {
    case "Dispatched":
      return "cyan";
    case "En Route":
      return "indigo";
    case "Landed":
      return "lime";
    case "Bounced":
    case "Pulled":
      return "neutral";
    default:
      return "amber";
  }
}

export default function ClaimsPage() {
  return (
    <div className="space-y-8">
      <div className="section-heading">
        <p className="eyebrow">Claims</p>
        <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
          Every Claim, every status update.
        </h1>
      </div>
      <div className="space-y-4">
        {claims.map((claim) => (
          <Link
            className="glass-panel flex items-center justify-between rounded-[var(--radius-xl)] p-5 transition hover:bg-white/7"
            href={`/claims/${claim.id}`}
            key={claim.id}
          >
            <div>
              <p className="font-medium">{formatClaimId(claim.id)}</p>
              <p className="text-sm text-[var(--ayco-text-secondary)]">
                {claim.items} items · {formatPrice(claim.total)}
              </p>
            </div>
            <Badge tone={getClaimTone(claim.status)}>{claim.status}</Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
