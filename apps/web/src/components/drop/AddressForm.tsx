import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { AddressFormValues } from "@/lib/validators";

import { Input } from "../ui/Input";

export function AddressForm({
  errors,
  register,
}: {
  errors: FieldErrors<AddressFormValues>;
  register: UseFormRegister<AddressFormValues>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input label="Full name" {...register("fullName")} />
      <Input label="City" {...register("city")} />
      <div className="md:col-span-2">
        <Input label="Address" {...register("addressLine1")} />
      </div>
      <Input label="Postal code" {...register("postalCode")} />
      <Input label="Campus drop spot" {...register("campusSpot")} />
      <div className="md:col-span-2 text-sm text-[var(--ayco-brand-coral)]">
        {Object.keys(errors).length
          ? "Check the fields above so we can land it right."
          : ""}
      </div>
    </div>
  );
}
