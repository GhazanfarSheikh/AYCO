"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { StashItem } from "@/types/stash";

type StashStore = {
  addItem: (item: Omit<StashItem, "id">) => void;
  clear: () => void;
  hydrated: boolean;
  items: StashItem[];
  rehydrate: () => void;
  removeItem: (id: string) => void;
  subtotal: () => number;
  updateQuantity: (id: string, quantity: number) => void;
};

export const useStashStore = create<StashStore>()(
  persist(
    (set, get) => ({
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (entry) =>
              entry.productId === item.productId &&
              entry.color === item.color &&
              entry.size === item.size,
          );

          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.id === existing.id
                  ? { ...entry, quantity: entry.quantity + item.quantity }
                  : entry,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                id: `${item.productId}-${item.color}-${item.size}`,
              },
            ],
          };
        }),
      clear: () => set({ items: [] }),
      hydrated: false,
      items: [],
      rehydrate: () => {
        void useStashStore.persist.rehydrate();
        set({ hydrated: true });
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      subtotal: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),
    }),
    {
      name: "ayco-stash",
      skipHydration: true,
    },
  ),
);
