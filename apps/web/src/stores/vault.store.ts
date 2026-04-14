"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { VaultItem } from "@/types/vault";

type VaultStore = {
  clear: () => void;
  hasItem: (productId: string) => boolean;
  items: VaultItem[];
  removeItem: (productId: string) => void;
  saveItem: (productId: string) => void;
};

export const useVaultStore = create<VaultStore>()(
  persist(
    (set, get) => ({
      clear: () => set({ items: [] }),
      hasItem: (productId) =>
        get().items.some((item) => item.productId === productId),
      items: [],
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      saveItem: (productId) =>
        set((state) => {
          if (state.items.some((item) => item.productId === productId)) {
            return state;
          }

          return {
            items: [
              { productId, savedAt: new Date().toISOString() },
              ...state.items,
            ],
          };
        }),
    }),
    {
      name: "ayco-vault",
    },
  ),
);
