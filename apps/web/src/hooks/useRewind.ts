"use client";

import { useMemo } from "react";

import { formatRelativeTime } from "@/lib/formatters";
import { getProductById } from "@/lib/mock-data";
import { useRewindStore } from "@/stores/rewind.store";

function getBucket(date: Date) {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  if (date >= startOfToday) {
    return "Today";
  }

  if (date >= startOfYesterday) {
    return "Yesterday";
  }

  if (date >= startOfWeek) {
    return "This Week";
  }

  return "Older";
}

export function useRewind() {
  const items = useRewindStore((state) => state.items);
  const addItem = useRewindStore((state) => state.addItem);
  const clear = useRewindStore((state) => state.clear);
  const removeItem = useRewindStore((state) => state.removeItem);

  const mappedItems = useMemo(
    () =>
      items
        .map((entry) => {
          const product = getProductById(entry.productId);

          if (!product) {
            return null;
          }

          return {
            product,
            viewedAt: entry.viewedAt,
          };
        })
        .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)),
    [items],
  );

  const groupedByTime = useMemo(() => {
    return mappedItems.reduce<Record<string, typeof mappedItems>>(
      (groups, entry) => {
        const bucket = getBucket(new Date(entry.viewedAt));
        groups[bucket] = [...(groups[bucket] ?? []), entry];
        return groups;
      },
      {},
    );
  }, [mappedItems]);

  return {
    addToRewind: addItem,
    clearRewind: clear,
    groupedByTime,
    items: mappedItems.map((entry) => ({
      ...entry,
      relativeTime: formatRelativeTime(entry.viewedAt),
    })),
    removeFromRewind: removeItem,
  };
}
