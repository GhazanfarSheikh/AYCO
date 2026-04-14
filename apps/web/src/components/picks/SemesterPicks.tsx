"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/features/catalog/api";
import { useUserStore } from "@/stores/user.store";
import type { Product } from "@/types/product";

import { PicksCarousel } from "./PicksCarousel";

export function SemesterPicks({
  initialProducts = [],
}: {
  initialProducts?: Product[];
}) {
  const semester = useUserStore((state) => state.profile.semester);
  const examMode = useUserStore((state) => state.preferences.examMode);
  const { data } = useQuery({
    initialData: {
      items: initialProducts,
      pagination: undefined,
    },
    queryFn: () =>
      getProducts({
        examMode,
        limit: 4,
        sort: "heat",
      }),
    queryKey: ["semester-picks", semester, examMode],
    staleTime: 60_000,
  });
  const selected = data?.items ?? [];

  return (
    <PicksCarousel
      products={selected.slice(0, 4)}
      title={`Picks for ${semester}`}
    />
  );
}
