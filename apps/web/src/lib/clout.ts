import type { CloutTier } from "@/types/user";

type CloutTierMeta = {
  color: string;
  nextThreshold: number | null;
  progress: number;
  tier: CloutTier;
};

const CLOUT_TIER_THRESHOLDS: Array<{ threshold: number; tier: CloutTier }> = [
  { threshold: 0, tier: "Bronze" },
  { threshold: 501, tier: "Silver" },
  { threshold: 2001, tier: "Gold" },
];

export function getCloutTier(points: number): CloutTierMeta {
  if (points >= 2001) {
    return {
      color: "var(--ayco-brand-amber)",
      nextThreshold: null,
      progress: 1,
      tier: "Gold",
    };
  }

  if (points >= 501) {
    return {
      color: "var(--ayco-brand-cyan)",
      nextThreshold: 2001,
      progress: (points - 501) / (2001 - 501),
      tier: "Silver",
    };
  }

  return {
    color: "var(--ayco-brand-amber)",
    nextThreshold: 501,
    progress: points / 501,
    tier: "Bronze",
  };
}

export const cloutTierThresholds = CLOUT_TIER_THRESHOLDS;
