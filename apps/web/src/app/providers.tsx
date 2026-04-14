"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";

import { useUserStore } from "@/stores/user.store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 3,
            staleTime: 60_000,
          },
        },
      }),
  );
  const theme = useUserStore((state) => state.preferences.theme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const applyTheme = () => {
      document.documentElement.dataset.theme =
        theme === "system" ? (media.matches ? "light" : "dark") : theme;
    };

    applyTheme();
    media.addEventListener("change", applyTheme);

    return () => media.removeEventListener("change", applyTheme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Analytics />
    </QueryClientProvider>
  );
}
