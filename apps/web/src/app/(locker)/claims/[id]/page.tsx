import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/Badge";
import { formatClaimId } from "@/lib/formatters";
import { claims } from "@/lib/mock-data";

type ClaimDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClaimDetailPage({
  params,
}: ClaimDetailPageProps) {
  const { id } = await params;
  const claim = claims.find((entry) => entry.id === id);

  if (!claim) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="section-heading">
        <p className="eyebrow">Claim Detail</p>
        <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
          {formatClaimId(claim.id)}
        </h1>
        <Badge tone={claim.status === "Dispatched" ? "cyan" : "amber"}>
          {claim.status}
        </Badge>
      </div>
      <div className="glass-panel rounded-[var(--radius-xl)] p-6">
        <div className="space-y-5">
          {claim.tracking.map((event, index) => (
            <div className="flex gap-4" key={`${event.label}-${event.at}`}>
              <div className="flex flex-col items-center">
                <span className="size-3 rounded-full bg-[var(--ayco-brand-lime)]" />
                {index !== claim.tracking.length - 1 ? (
                  <span className="mt-2 h-full w-px bg-white/10" />
                ) : null}
              </div>
              <div className="pb-4">
                <p className="font-medium">{event.label}</p>
                <p className="text-sm text-[var(--ayco-text-secondary)]">
                  {event.at}
                </p>
                <p className="mt-1 text-sm text-[var(--ayco-text-secondary)]">
                  {event.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
