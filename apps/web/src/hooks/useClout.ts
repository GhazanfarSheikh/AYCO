"use client";

import { useMemo } from "react";

import { getCloutTier } from "@/lib/clout";
import { useUserStore } from "@/stores/user.store";

export function useClout() {
  const clout = useUserStore((state) => state.profile.clout);

  return useMemo(() => {
    const tier = getCloutTier(clout);

    return {
      ...tier,
      clout,
      remainingToNext:
        tier.nextThreshold === null
          ? 0
          : Math.max(0, tier.nextThreshold - clout),
    };
  }, [clout]);
}
