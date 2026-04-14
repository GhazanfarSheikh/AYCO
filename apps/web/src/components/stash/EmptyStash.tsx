import { EmptyState } from "../ui/EmptyState";

export function EmptyStash() {
  return (
    <EmptyState
      body="Your Stash is empty. Time to Scout something worth grabbing."
      ctaHref="/zones"
      ctaLabel="Browse Zones"
      title="Nothing in your Stash yet"
    />
  );
}
