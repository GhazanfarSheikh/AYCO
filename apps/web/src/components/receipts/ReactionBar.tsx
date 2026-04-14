import type { Receipt } from "@/types/receipt";

export function ReactionBar({ reactions }: Pick<Receipt, "reactions">) {
  return (
    <div className="flex flex-wrap gap-2">
      {reactions.map((reaction) => (
        <span
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--ayco-text-secondary)]"
          key={reaction.emoji}
        >
          {reaction.emoji} {reaction.count}
        </span>
      ))}
    </div>
  );
}
