"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/cn";

type ModalProps = {
  children: React.ReactNode;
  contentClassName?: string;
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  title: string;
};

export function Modal({
  children,
  contentClassName,
  onOpenChange,
  open,
  title,
}: ModalProps) {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md" />
        <Dialog.Content asChild>
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={cn(
              "fixed left-1/2 top-1/2 z-50 w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-xl)] border border-white/10 bg-[var(--ayco-bg-elevated)] p-6 shadow-2xl",
              contentClassName,
            )}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <Dialog.Title className="font-[var(--font-heading)] text-2xl font-bold">
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
