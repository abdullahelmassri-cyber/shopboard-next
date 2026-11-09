import type { DisplayProduct } from "@/features/products/products.types";
import type { CartItem, CartLine } from "./cart.types";

const INITIAL_QUANTITY = 1;
const MIN_QUANTITY = 1;

export function addItem(items: CartItem[], id: number): CartItem[] {
  const existing = items.find((item) => item.id === id);
  if (!existing) return [...items, { id, qty: INITIAL_QUANTITY }];

  return items.map((item) =>
    item.id === id ? { ...item, qty: item.qty + INITIAL_QUANTITY } : item,
  );
}

export function changeQuantity(items: CartItem[], id: number, change: number): CartItem[] {
  if (!Number.isInteger(change) || change === 0) return items;

  const existing = items.find((item) => item.id === id);
  if (!existing) return items;

  const nextQuantity = existing.qty + change;
  if (nextQuantity < MIN_QUANTITY) return items.filter((item) => item.id !== id);

  return items.map((item) => (item.id === id ? { ...item, qty: nextQuantity } : item));
}

export function removeItem(items: CartItem[], id: number): CartItem[] {
  return items.filter((item) => item.id !== id);
}

export function clearItems(): CartItem[] {
  return [];
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.qty, 0);
}

export function buildCartLines(
  items: CartItem[],
  products: readonly DisplayProduct[],
): CartLine[] {
  return items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    if (!product) return [];

    return [
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: item.qty,
        lineTotal: product.price * item.qty,
      },
    ];
  });
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.lineTotal, 0);
}

export function isCartItem(value: unknown): value is CartItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    Number.isSafeInteger(value.id) &&
    value.id > 0 &&
    "qty" in value &&
    typeof value.qty === "number" &&
    Number.isSafeInteger(value.qty) &&
    value.qty > 0
  );
}

export function isCartItems(value: unknown): value is CartItem[] {
  return Array.isArray(value) && value.every(isCartItem);
}
