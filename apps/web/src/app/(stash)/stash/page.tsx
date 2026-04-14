import { StashView } from "@/components/stash/StashView";

export default function StashPage() {
  return (
    <section className="space-y-8">
      <div className="section-heading">
        <p className="eyebrow">Your Stash</p>
        <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
          Everything you’re lining up to Claim.
        </h1>
      </div>
      <StashView />
    </section>
  );
}
