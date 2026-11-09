"use client";

import Link from "next/link";
import { cartCount } from "./cart.logic";
import { useCart } from "./CartProvider";

export function CartCount() {
  const { items } = useCart();

  return (
    <Link
      className="rounded-sm text-[var(--forest)] hover:text-[var(--accent)]"
      href="/cart"
      aria-live="polite"
    >
      Cart ({cartCount(items)})
    </Link>
  );
}
