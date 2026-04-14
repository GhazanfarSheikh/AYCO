import { Check } from "lucide-react";

const steps = ["Stash", "Address", "Pay", "Claimed"];

export function DropStepper({ step }: { step: number }) {
  return (
    <div className="sticky top-0 z-20 border-b border-white/8 bg-[rgba(8,8,13,0.8)] py-4 backdrop-blur-xl">
      <div className="page-shell grid grid-cols-4 gap-3">
        {steps.map((label, index) => {
          const done = index < step;
          const active = index === step;

          return (
            <div className="space-y-2" key={label}>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em]">
                <span
                  className={`flex size-7 items-center justify-center rounded-full ${
                    done
                      ? "bg-[var(--ayco-brand-lime)] text-[var(--ayco-text-inverse)]"
                      : active
                        ? "bg-[var(--ayco-brand-indigo)] text-white"
                        : "bg-white/8 text-[var(--ayco-text-secondary)]"
                  }`}
                >
                  {done ? <Check className="size-4" /> : index + 1}
                </span>
                <span
                  className={
                    active ? "text-white" : "text-[var(--ayco-text-secondary)]"
                  }
                >
                  {label}
                </span>
              </div>
              <div className="h-1 rounded-full bg-white/8">
                <div
                  className={`h-full rounded-full ${
                    done || active
                      ? "bg-[var(--ayco-brand-indigo)]"
                      : "bg-transparent"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
