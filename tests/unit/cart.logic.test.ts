import { describe, expect, it } from "vitest";
import { addItem, buildCartLines, cartCount, changeQuantity, cartTotal } from "@/features/cart/cart.logic";
import type { DisplayProduct } from "@/features/products/products.types";

const products: DisplayProduct[] = [
  { id: 1, name: "Canvas Tote", category: "Bags", price: 24.5, inStock: true, image: "/tote.jpg" },
  { id: 2, name: "Leather Wallet", category: "Accessories", price: 18, inStock: true, image: "/wallet.jpg" },
];

describe("cart logic", () => {
  it("increments an existing product quantity without changing other cart lines", () => {
    const original = [{ id: 1, qty: 1 }, { id: 2, qty: 2 }];

    expect(addItem(original, 1)).toEqual([{ id: 1, qty: 2 }, { id: 2, qty: 2 }]);
    expect(original).toEqual([{ id: 1, qty: 1 }, { id: 2, qty: 2 }]);
    expect(cartCount(addItem(original, 1))).toBe(4);
  });

  it("removes a cart line when its quantity is decreased below one", () => {
    expect(changeQuantity([{ id: 1, qty: 1 }, { id: 2, qty: 3 }], 1, -1)).toEqual([
      { id: 2, qty: 3 },
    ]);
  });

  it("builds subtotal from matching catalog products and omits stale product IDs", () => {
    const lines = buildCartLines([{ id: 1, qty: 2 }, { id: 99, qty: 5 }], products);

    expect(lines).toEqual([
      { id: 1, name: "Canvas Tote", image: "/tote.jpg", price: 24.5, qty: 2, lineTotal: 49 },
    ]);
    expect(cartTotal(lines)).toBe(49);
  });
});
