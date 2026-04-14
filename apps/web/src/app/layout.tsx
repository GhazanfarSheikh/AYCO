import type { Metadata } from "next";

import { ScoutBar } from "@/components/layout/ScoutBar";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ToastHost } from "@/components/ui/Toast";

import { Providers } from "./providers";

import "@/styles/globals.css";

export const metadata: Metadata = {
  description:
    "AYCO is the student-first shop for campus life, fast dispatch, and picks that actually match your semester.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    description:
      "Everything a student needs. In one place. Scout faster, Grab smarter, and keep your semester moving.",
    title: "AYCO | All You Can Order",
  },
  title: "AYCO | All You Can Order",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={
        {
          "--font-jetbrains-mono":
            '"JetBrains Mono", "SFMono-Regular", "Menlo", monospace',
          "--font-manrope":
            '"Manrope", "Inter", "Avenir Next", "Segoe UI", sans-serif',
          "--font-space-grotesk":
            '"Space Grotesk", "Inter", "Avenir Next", "Segoe UI", sans-serif',
        } as React.CSSProperties
      }
      suppressHydrationWarning
    >
      <body>
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-[var(--ayco-brand-indigo)] focus:px-4 focus:py-3"
          href="#main-content"
        >
          Skip to content
        </a>
        <Providers>
          <GrainOverlay />
          <ScoutBar />
          <ToastHost />
          {children}
        </Providers>
      </body>
    </html>
  );
}
