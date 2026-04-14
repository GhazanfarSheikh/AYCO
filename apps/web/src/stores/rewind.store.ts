"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type RewindEntry = {
  productId: string;
  viewedAt: string;
};

type RewindStore = {
  addItem: (productId: string) => void;
  clear: () => void;
  items: RewindEntry[];
  removeItem: (productId: string) => void;
};

export const useRewindStore = create<RewindStore>()(
  persist(
    (set) => ({
      addItem: (productId) =>
        set((state) => ({
          items: [
            { productId, viewedAt: new Date().toISOString() },
            ...state.items.filter((item) => item.productId !== productId),
          ].slice(0, 50),
        })),
      clear: () => set({ items: [] }),
      items: [],
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
    }),
    {
      name: "ayco-rewind",
    },
  ),
);
