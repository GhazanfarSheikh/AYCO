"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

import { useUiStore } from "@/stores/ui.store";

export function ToastHost() {
  const pings = useUiStore((state) => state.pings);
  const removePing = useUiStore((state) => state.removePing);

  useEffect(() => {
    const timers = pings.map((ping) =>
      window.setTimeout(() => removePing(ping.id), 4000),
    );

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, [pings, removePing]);

  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-[70] flex w-[min(92vw,320px)] flex-col gap-3 md:bottom-6">
      <AnimatePresence>
        {pings.map((ping) => (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-panel relative overflow-hidden rounded-[var(--radius-lg)] px-4 py-3 text-sm text-[var(--ayco-text-primary)]"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            key={ping.id}
            layout
          >
            {ping.message}
            <motion.span
              animate={{ scaleX: 0 }}
              className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--ayco-brand-cyan)]"
              initial={{ scaleX: 1 }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
