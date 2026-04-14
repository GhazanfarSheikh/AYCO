import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { PaymentFormValues } from "@/lib/validators";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function PaymentForm({
  errors,
  register,
  setMethod,
}: {
  errors: FieldErrors<PaymentFormValues>;
  register: UseFormRegister<PaymentFormValues>;
  setMethod: (method: PaymentFormValues["paymentMethod"]) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        {(["Apple Pay", "Google Pay", "Card"] as const).map((method) => (
          <Button
            key={method}
            onClick={() => setMethod(method)}
            variant="ghost"
          >
            {method}
          </Button>
        ))}
      </div>
      <Badge tone="cyan">Payment intent spun up. You’re good to go.</Badge>
      <Input label="Cardholder" {...register("cardholder")} />
      <Input
        label="Hookup"
        {...register("hookupCode")}
        placeholder="Optional"
      />
      <div className="text-sm text-[var(--ayco-brand-coral)]">
        {Object.keys(errors).length
          ? "Payment didn’t go through yet. Give the fields a quick check."
          : ""}
      </div>
    </div>
  );
}
