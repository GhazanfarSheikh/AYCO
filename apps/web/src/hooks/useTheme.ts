"use client";

import { useMemo } from "react";

import { useUserStore } from "@/stores/user.store";

export function useTheme() {
  const theme = useUserStore((state) => state.preferences.theme);
  const setTheme = useUserStore((state) => state.setTheme);

  return useMemo(
    () => ({
      isLight: theme === "light",
      setTheme,
      theme,
    }),
    [setTheme, theme],
  );
}
