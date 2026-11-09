"use client";

import { useCart } from "./CartProvider";

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  inStock: boolean;
}

export function AddToCartButton({
  productId,
  productName,
  inStock,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] bg-[var(--forest)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-button-hover)] disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      disabled={!inStock}
      onClick={() => addItem(productId)}
      aria-label={inStock ? `Add ${productName} to cart` : `${productName} is out of stock`}
    >
      {inStock ? "Add to cart" : "Out of stock"}
    </button>
  );
}
