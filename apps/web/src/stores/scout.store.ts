"use client";

import { create } from "zustand";

type ScoutStore = {
  addRecent: (query: string) => void;
  query: string;
  recent: string[];
  setQuery: (query: string) => void;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
};

export const useScoutStore = create<ScoutStore>()((set) => ({
  addRecent: (query) =>
    set((state) => ({
      recent: [query, ...state.recent.filter((entry) => entry !== query)].slice(
        0,
        6,
      ),
    })),
  query: "",
  recent: [
    "Desk essentials",
    "On Heat under $20",
    "Campus tote",
    "Exam mode picks",
  ],
  setQuery: (query) => set({ query }),
  setSuggestions: (suggestions) => set({ suggestions }),
  suggestions: [],
}));
