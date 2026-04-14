import { z } from "zod";

export const scoutSchema = z.object({
  query: z.string().min(1).max(120),
});

export const stashItemSchema = z.object({
  color: z.string().min(1),
  image: z.string().url(),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
  size: z.string().min(1),
});

export const addressSchema = z.object({
  addressLine1: z.string().min(3, "Drop a real address so we can land it."),
  city: z.string().min(2),
  campusSpot: z.string().optional(),
  fullName: z.string().min(2),
  postalCode: z.string().min(3),
});

export const paymentSchema = z.object({
  cardholder: z.string().min(2),
  hookupCode: z.string().optional(),
  paymentMethod: z.enum(["Apple Pay", "Google Pay", "Card"]),
});

export const receiptSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().min(1).max(5),
  text: z.string().min(12).max(280),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;
