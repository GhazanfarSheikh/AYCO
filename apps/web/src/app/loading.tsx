import { LOADING_LINES } from "@/lib/constants";

export default function Loading() {
  return (
    <main className="page-shell flex min-h-[100svh] items-center justify-center">
      <div className="glass-panel space-y-4 rounded-[var(--radius-xl)] p-8 text-center">
        <p className="eyebrow">Vibes</p>
        <h1 className="font-[var(--font-heading)] text-3xl font-bold">
          {LOADING_LINES[0]}
        </h1>
        <p className="text-sm text-[var(--ayco-text-secondary)]">
          {LOADING_LINES[4]}
        </p>
      </div>
    </main>
  );
}
