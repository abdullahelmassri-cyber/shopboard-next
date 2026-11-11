"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckoutForm } from "@/features/checkout/CheckoutForm";
import type { DisplayProduct } from "@/features/products/products.types";
import { buildCartLines, cartTotal } from "@/features/cart/cart.logic";
import { useCart } from "@/features/cart/CartProvider";
import { cn } from "@/lib/utils";

export function CheckoutContents({ products }: { products: DisplayProduct[] }) {
  const { items } = useCart();
  const [completed, setCompleted] = useState(false);
  const lines = buildCartLines(items, products);
  const productIds = new Set(products.map((product) => product.id));
  const unavailableItems = items.filter((item) => !productIds.has(item.id));
  const subtotal = cartTotal(lines);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-16 sm:px-8 md:py-24">
      <p className="mb-3 text-xs font-bold uppercase tracking-eyebrow text-accent">
        Almost there
      </p>
      <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        Checkout
      </h1>

      {items.length === 0 && !completed ? (
        <Card className="mt-8 max-w-2xl p-6 sm:p-8" role="status">
          <h2 className="font-serif text-2xl text-foreground">Your cart is empty</h2>
          <p className="mt-3 text-muted">
            Add a product to your cart before continuing to checkout.
          </p>
          <Link className={cn(buttonVariants({ size: "md" }), "mt-6")} href="/products">
            Browse products
          </Link>
        </Card>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:items-start">
          <section className="lg:col-span-2" aria-labelledby="checkout-form-heading">
            {unavailableItems.length > 0 ? (
              <Card className="p-6 sm:p-8" role="status">
                <h2
                  className="font-serif text-2xl text-foreground"
                  id="checkout-form-heading"
                >
                  Review unavailable items
                </h2>
                <p className="mt-3 text-muted">
                  These saved items are no longer in the validated product list, so they cannot
                  be included in this demo checkout. Remove them from your cart to continue.
                </p>
                <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted">
                  {unavailableItems.map((item) => (
                    <li key={item.id}>
                      Product ID {item.id}, quantity {item.qty}
                    </li>
                  ))}
                </ul>
                <Link
                  className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}
                  href="/cart"
                >
                  Review your cart
                </Link>
              </Card>
            ) : (
              <Card className="p-6 sm:p-8">
                <h2
                  className="mb-6 font-serif text-2xl text-foreground"
                  id="checkout-form-heading"
                >
                  Your details
                </h2>
                <CheckoutForm onComplete={() => setCompleted(true)} />
              </Card>
            )}
          </section>

          <aside aria-labelledby="order-summary-heading">
            <Card className="p-6 sm:p-8">
              <h2 className="font-serif text-2xl text-foreground" id="order-summary-heading">
                Order summary
              </h2>
              {lines.length > 0 ? (
                <ul className="mt-5 divide-y divide-border">
                  {lines.map((line) => (
                    <li className="flex justify-between gap-4 py-3 text-sm" key={line.id}>
                      <span className="text-foreground">
                        {line.name} <span className="text-muted">× {line.qty}</span>
                      </span>
                      <span className="shrink-0 font-semibold text-foreground">
                        ${line.lineTotal.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-muted">
                  No saved items are currently available in the product list.
                </p>
              )}
              {unavailableItems.length > 0 && (
                <p className="mt-3 text-sm text-accent">
                  {unavailableItems.length} unavailable {unavailableItems.length === 1 ? "item is" : "items are"} omitted from this subtotal.
                </p>
              )}
              <p className="mt-4 flex justify-between gap-4 border-t border-border pt-4 text-lg font-semibold text-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </p>
            </Card>
          </aside>
        </div>
      )}

      {items.length === 0 && (
        <p className="mt-4">
          <Link className={cn(buttonVariants({ variant: "ghost", size: "sm" }))} href="/cart">
            View your cart
          </Link>
        </p>
      )}
    </main>
  );
}
