import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name using at least 2 characters.")
    .max(100, "Full name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .max(254, "Email address must be 254 characters or fewer.")
    .email("Enter a valid email address."),
  address: z
    .string()
    .trim()
    .min(5, "Enter an address using at least 5 characters.")
    .max(200, "Address must be 200 characters or fewer."),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
