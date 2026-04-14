import { Star } from "lucide-react";

import type { Receipt } from "@/types/receipt";

import { Avatar } from "../ui/Avatar";
import { ReactionBar } from "./ReactionBar";

export function ReceiptCard({ receipt }: { receipt: Receipt }) {
  return (
    <article className="glass-panel space-y-4 rounded-[var(--radius-xl)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar fallback={receipt.avatar} />
          <div>
            <p className="font-medium">{receipt.author}</p>
            <p className="text-xs text-[var(--ayco-text-secondary)]">
              {receipt.verified ? "Verified Claim" : "Receipt"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-[var(--ayco-brand-amber)]">
          <Star className="size-4 fill-current" />
          {receipt.rating}
        </div>
      </div>
      <p className="text-sm leading-6 text-[var(--ayco-text-secondary)]">
        {receipt.text}
      </p>
      <ReactionBar reactions={receipt.reactions} />
    </article>
  );
}
