"use client";

import Link from "next/link";
import { ProductImage } from "@/features/products/ProductImage";
import type { DisplayProduct } from "@/features/products/products.types";
import { buildCartLines, cartCount, cartTotal } from "./cart.logic";
import { useCart } from "./CartProvider";

export function CartContents({ products }: { products: DisplayProduct[] }) {
  const { items, changeQuantity, clearCart, removeItem } = useCart();
  const lines = buildCartLines(items, products);
  const productIds = new Set(products.map((product) => product.id));
  const unavailableItems = items.filter((item) => !productIds.has(item.id));
  const total = cartTotal(lines);

  return (
    <section className="mx-auto w-full max-w-[1260px] flex-1 px-5 py-16 sm:px-8 md:py-24">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
        Your selection
      </p>
      <h1 className="font-serif text-4xl leading-tight text-[var(--forest)] sm:text-5xl">
        Your cart
      </h1>

      {lines.length === 0 ? (
        <div className="mt-6">
          <p className="text-[var(--muted)]">Your cart is empty.</p>
          <Link
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] bg-[var(--forest)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--color-button-hover)]"
            href="/products"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {lines.map((line) => (
            <li
              className="grid gap-4 py-5 sm:grid-cols-[140px_minmax(0,1fr)_auto] sm:items-center"
              key={line.id}
            >
              <Link className="block max-w-48 rounded-sm sm:max-w-none" href={`/products/${line.id}`}>
                <ProductImage src={line.image} alt={line.name} />
              </Link>
              <div>
                <h2 className="font-serif text-xl text-[var(--ink)]">
                  <Link className="rounded-sm no-underline hover:text-[var(--accent)]" href={`/products/${line.id}`}>
                    {line.name}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  ${line.price.toFixed(2)} each
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm text-[var(--muted)]">Quantity</span>
                  <button
                    className="h-9 w-9 rounded-sm border border-[var(--line)] text-lg text-[var(--forest)] hover:bg-[var(--color-image-background)]"
                    type="button"
                    onClick={() => changeQuantity(line.id, -1)}
                    aria-label={`Decrease ${line.name} quantity`}
                  >
                    &minus;
                  </button>
                  <span aria-live="polite" className="min-w-5 text-center">
                    {line.qty}
                  </span>
                  <button
                    className="h-9 w-9 rounded-sm border border-[var(--line)] text-lg text-[var(--forest)] hover:bg-[var(--color-image-background)]"
                    type="button"
                    onClick={() => changeQuantity(line.id, 1)}
                    aria-label={`Increase ${line.name} quantity`}
                  >
                    +
                  </button>
                  <button
                    className="ml-2 rounded-sm text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                    type="button"
                    onClick={() => removeItem(line.id)}
                    aria-label={`Remove ${line.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="font-semibold text-[var(--forest)] sm:text-right">
                ${line.lineTotal.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {unavailableItems.length > 0 && (
        <aside className="mt-8 rounded-[var(--radius)] bg-[var(--color-image-background)] p-5">
          <h2 className="font-semibold text-[var(--forest)]">Some saved items are unavailable</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            These product IDs are no longer in the catalog, so they are omitted from the subtotal.
            Remove them here or clear the cart.
          </p>
          <ul className="mt-3 space-y-2">
            {unavailableItems.map((item) => (
              <li className="flex items-center justify-between gap-4 text-sm" key={item.id}>
                <span>Unavailable product (ID {item.id}) · quantity {item.qty}</span>
                <button
                  className="rounded-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                  type="button"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--line)] pt-6">
        <p className="text-sm text-[var(--muted)]" aria-live="polite">
          {cartCount(items)} {cartCount(items) === 1 ? "item" : "items"} in cart
        </p>
        <p className="text-lg font-semibold text-[var(--forest)]">
          Subtotal: ${total.toFixed(2)}
        </p>
        <button
          className="min-h-10 rounded-[var(--radius)] border border-[var(--forest)] px-4 py-2 text-sm font-semibold text-[var(--forest)] hover:bg-[var(--color-image-background)] disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          disabled={items.length === 0}
          onClick={clearCart}
        >
          Clear cart
        </button>
      </div>
    </section>
  );
}
