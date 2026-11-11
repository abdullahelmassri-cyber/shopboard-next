"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { checkoutSchema } from "@/features/checkout/checkout.schema";
import type { CheckoutFormValues } from "@/features/checkout/checkout.schema";
import { useCart } from "@/features/cart/CartProvider";

const fields = [
  {
    name: "fullName",
    label: "Full name",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    autoComplete: "street-address",
  },
] as const;

export function CheckoutForm({ onComplete }: { onComplete: () => void }) {
  const { clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { fullName: "", email: "", address: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  async function submitForm(event: FormEvent<HTMLFormElement>): Promise<void> {
    await handleSubmit(async () => {
      setOrderComplete(true);
      onComplete();
    })(event);
    clearCart();
  }

  if (orderComplete) {
    return (
      <div className="space-y-4" role="status" aria-live="polite">
        <h2 className="font-serif text-2xl text-foreground">Thank you.</h2>
        <p className="text-muted">
          Your demo checkout is complete. No real order or payment was sent.
        </p>
        <Link className="inline-flex rounded-sm text-primary underline underline-offset-4" href="/">
          Return to the shop
        </Link>
      </div>
    );
  }

  return (
    <form className="space-y-5" noValidate onSubmit={submitForm}>
      {fields.map(({ name, label, type, autoComplete }) => {
        const error = errors[name];
        const errorId = `${name}-error`;

        return (
          <div className="grid gap-2" key={name}>
            <label className="text-sm font-semibold text-foreground" htmlFor={name}>
              {label}
            </label>
            <Input
              {...register(name)}
              autoComplete={autoComplete}
              aria-describedby={error ? errorId : undefined}
              aria-invalid={Boolean(error)}
              id={name}
              type={type}
            />
            {error?.message && (
              <p className="text-sm text-accent" id={errorId} role="alert">
                {error.message}
              </p>
            )}
          </div>
        );
      })}

      <Button className="w-full sm:w-auto" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Completing demo checkout…" : "Complete demo checkout"}
      </Button>
      <p className="text-sm text-muted">
        Demo only. No real order or payment will be sent.
      </p>
    </form>
  );
}
