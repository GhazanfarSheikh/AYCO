"use client";

import { create } from "zustand";

type Ping = {
  id: string;
  message: string;
};

type UiStore = {
  addPing: (message: string) => void;
  closeScout: () => void;
  closeStash: () => void;
  openScout: () => void;
  openStash: () => void;
  pings: Ping[];
  removePing: (id: string) => void;
  scoutOpen: boolean;
  stashOpen: boolean;
};

export const useUiStore = create<UiStore>()((set) => ({
  addPing: (message) =>
    set((state) => ({
      pings: [...state.pings, { id: crypto.randomUUID(), message }],
    })),
  closeScout: () => set({ scoutOpen: false }),
  closeStash: () => set({ stashOpen: false }),
  openScout: () => set({ scoutOpen: true }),
  openStash: () => set({ stashOpen: true }),
  pings: [],
  removePing: (id) =>
    set((state) => ({
      pings: state.pings.filter((ping) => ping.id !== id),
    })),
  scoutOpen: false,
  stashOpen: false,
}));
