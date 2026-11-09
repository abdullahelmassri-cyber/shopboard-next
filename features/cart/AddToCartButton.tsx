"use client";

import { useCart } from "./CartProvider";
import { Button } from "@/components/ui/Button";

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
    <Button
      className="mt-5"
      size="md"
      variant="primary"
      type="button"
      disabled={!inStock}
      onClick={() => addItem(productId)}
      aria-label={inStock ? `Add ${productName} to cart` : `${productName} is out of stock`}
    >
      {inStock ? "Add to cart" : "Out of stock"}
    </Button>
  );
}
