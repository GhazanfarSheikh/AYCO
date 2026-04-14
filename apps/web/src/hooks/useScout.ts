"use client";

import { useQuery } from "@tanstack/react-query";

import { searchScout } from "@/features/catalog/api";
import { useScoutStore } from "@/stores/scout.store";
import { useUserStore } from "@/stores/user.store";

import { useDebounce } from "./useDebounce";

export function useScout() {
  const query = useScoutStore((state) => state.query);
  const campus = useUserStore((state) => state.profile.campus);
  const debounced = useDebounce(query, 300);
  const trimmed = debounced.trim();
  const result = useQuery({
    enabled: trimmed.length > 0,
    queryFn: () => searchScout({ campus, q: trimmed }),
    queryKey: ["scout", campus, trimmed],
  });

  return {
    debounced: trimmed,
    isLoading: result.isLoading,
    results: result.data ?? {
      products: [],
      query: trimmed,
      suggestions: [],
      zones: [],
    },
  };
}
