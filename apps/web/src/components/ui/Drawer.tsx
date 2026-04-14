"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/cn";

type DrawerProps = {
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  side?: "bottom" | "right";
  title: string;
};

export function Drawer({
  children,
  onOpenChange,
  open,
  side = "right",
  title,
}: DrawerProps) {
  const isBottom = side === "bottom";

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content asChild>
          <motion.div
            animate={{ opacity: 1, x: 0, y: 0 }}
            className={cn(
              "fixed z-50 border border-white/10 bg-[var(--ayco-bg-elevated)] p-5 shadow-2xl",
              isBottom
                ? "bottom-0 left-0 right-0 rounded-t-[var(--radius-xl)]"
                : "bottom-0 right-0 top-0 w-[min(92vw,420px)] border-l",
            )}
            initial={isBottom ? { opacity: 0, y: 60 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.28 }}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <Dialog.Title className="font-[var(--font-heading)] text-xl font-bold">
                {title}
              </Dialog.Title>
              <Dialog.Close className="rounded-full border border-white/10 p-2 text-[var(--ayco-text-secondary)]">
                <X className="size-4" />
              </Dialog.Close>
            </div>
            {children}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
