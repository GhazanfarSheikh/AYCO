"use client";

import { useEffect } from "react";

import { useStashStore } from "@/stores/stash.store";

export function useStash() {
  const rehydrate = useStashStore((state) => state.rehydrate);
  const store = useStashStore();

  useEffect(() => {
    void rehydrate();
  }, [rehydrate]);

  return store;
}
