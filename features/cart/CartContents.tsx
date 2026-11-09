"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProductImage } from "@/features/products/ProductImage";
import type { DisplayProduct } from "@/features/products/products.types";
import { buildCartLines, cartCount, cartTotal } from "./cart.logic";
import { useCart } from "./CartProvider";
import { cn } from "@/lib/utils";

export function CartContents({ products }: { products: DisplayProduct[] }) {
  const { items, changeQuantity, clearCart, removeItem } = useCart();
  const lines = buildCartLines(items, products);
  const productIds = new Set(products.map((product) => product.id));
  const unavailableItems = items.filter((item) => !productIds.has(item.id));
  const total = cartTotal(lines);

  return (
    <section className="mx-auto w-full max-w-7xl flex-1 px-5 py-16 sm:px-8 md:py-24">
      <p className="mb-3 text-xs font-bold uppercase tracking-eyebrow text-accent">
        Your selection
      </p>
      <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        Your cart
      </h1>

      {lines.length === 0 ? (
        <div className="mt-6">
          <p className="text-muted">Your cart is empty.</p>
          <Link
            className={cn(buttonVariants({ size: "md" }), "mt-5")}
            href="/products"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4">
          {lines.map((line) => (
            <li key={line.id}>
              <Card className="grid gap-4 p-4 sm:grid-cols-3 sm:items-center sm:p-5">
              <Link className="block max-w-48 rounded-sm sm:max-w-none" href={`/products/${line.id}`}>
                <ProductImage src={line.image} alt={line.name} />
              </Link>
              <div>
                <h2 className="font-serif text-xl text-foreground">
                  <Link className="rounded-sm no-underline hover:text-accent" href={`/products/${line.id}`}>
                    {line.name}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-muted">
                  ${line.price.toFixed(2)} each
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm text-muted">Quantity</span>
                  <Button
                    className="h-9 w-9 px-0 text-lg"
                    size="sm"
                    variant="secondary"
                    type="button"
                    onClick={() => changeQuantity(line.id, -1)}
                    aria-label={`Decrease ${line.name} quantity`}
                  >
                    &minus;
                  </Button>
                  <span aria-live="polite" className="min-w-5 text-center">
                    {line.qty}
                  </span>
                  <Button
                    className="h-9 w-9 px-0 text-lg"
                    size="sm"
                    variant="secondary"
                    type="button"
                    onClick={() => changeQuantity(line.id, 1)}
                    aria-label={`Increase ${line.name} quantity`}
                  >
                    +
                  </Button>
                  <Button
                    className="ml-2 text-accent underline-offset-4 hover:underline"
                    size="sm"
                    variant="ghost"
                    type="button"
                    onClick={() => removeItem(line.id)}
                    aria-label={`Remove ${line.name} from cart`}
                  >
                    Remove
                  </Button>
                </div>
              </div>
              <p className="font-semibold text-foreground sm:text-right">
                ${line.lineTotal.toFixed(2)}
              </p>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {unavailableItems.length > 0 && (
        <Card className="mt-8 p-5" variant="content">
          <h2 className="font-semibold text-foreground">Some saved items are unavailable</h2>
          <p className="mt-1 text-sm text-muted">
            These product IDs are no longer in the catalog, so they are omitted from the subtotal.
            Remove them here or clear the cart.
          </p>
          <ul className="mt-3 space-y-2">
            {unavailableItems.map((item) => (
              <li className="flex items-center justify-between gap-4 text-sm" key={item.id}>
                  <span className="flex items-center gap-2">
                    <Badge variant="unavailable">Unavailable</Badge>
                    ID {item.id} · quantity {item.qty}
                  </span>
                <Button
                  className="text-accent underline-offset-4 hover:underline"
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-6">
        <p className="text-sm text-muted" aria-live="polite">
          {cartCount(items)} {cartCount(items) === 1 ? "item" : "items"} in cart
        </p>
        <p className="text-lg font-semibold text-foreground">
          Subtotal: ${total.toFixed(2)}
        </p>
        <Button
          className="min-h-10 px-4"
          size="sm"
          variant="secondary"
          type="button"
          disabled={items.length === 0}
          onClick={clearCart}
        >
          Clear cart
        </Button>
      </div>
    </section>
  );
}
