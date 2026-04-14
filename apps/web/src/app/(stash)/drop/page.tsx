"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { AddressForm } from "@/components/drop/AddressForm";
import { ClaimConfirmation } from "@/components/drop/ClaimConfirmation";
import { DropStepper } from "@/components/drop/DropStepper";
import { PaymentForm } from "@/components/drop/PaymentForm";
import { Button } from "@/components/ui/Button";
import { useStash } from "@/hooks/useStash";
import {
  type AddressFormValues,
  addressSchema,
  type PaymentFormValues,
  paymentSchema,
} from "@/lib/validators";

export default function DropPage() {
  const [step, setStep] = useState(0);
  const { items } = useStash();
  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });
  const paymentForm = useForm<PaymentFormValues>({
    defaultValues: { paymentMethod: "Apple Pay" },
    resolver: zodResolver(paymentSchema),
  });

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  return (
    <>
      <DropStepper step={step} />
      <div className="page-shell space-y-8 py-8">
        {step === 0 ? (
          <section className="space-y-5">
            <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
              Review your Stash
            </h1>
            <div className="glass-panel rounded-[var(--radius-xl)] p-6">
              <p className="mb-4 text-sm text-[var(--ayco-text-secondary)]">
                {items.length} items ready to Drop. Current subtotal: $
                {subtotal}
              </p>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-white/8 bg-white/4 px-4 py-3"
                    key={item.id}
                  >
                    <span>{item.name}</span>
                    <span className="font-mono">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {step === 1 ? (
          <section className="space-y-5">
            <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
              Where should this land?
            </h1>
            <div className="glass-panel rounded-[var(--radius-xl)] p-6">
              <AddressForm
                errors={addressForm.formState.errors}
                register={addressForm.register}
              />
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="space-y-5">
            <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
              Finish the Drop
            </h1>
            <div className="glass-panel rounded-[var(--radius-xl)] p-6">
              <PaymentForm
                errors={paymentForm.formState.errors}
                register={paymentForm.register}
                setMethod={(method) =>
                  paymentForm.setValue("paymentMethod", method)
                }
              />
            </div>
          </section>
        ) : null}

        {step === 3 ? <ClaimConfirmation claimId="AY-20948" /> : null}

        <div className="flex flex-wrap gap-3">
          {step > 0 && step < 3 ? (
            <Button
              onClick={() => setStep((current) => current - 1)}
              variant="ghost"
            >
              Back
            </Button>
          ) : null}
          {step < 3 ? (
            <Button
              onClick={async () => {
                if (step === 1) {
                  const valid = await addressForm.trigger();
                  if (!valid) {
                    return;
                  }
                }

                if (step === 2) {
                  const valid = await paymentForm.trigger();
                  if (!valid) {
                    return;
                  }
                }

                setStep((current) => current + 1);
              }}
            >
              Continue
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}
