"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { addItem, changeQuantity, clearItems, removeItem } from "./cart.logic";
import { getCartSnapshot, getServerCartSnapshot, subscribe, updateCart } from "./cart.store";
import type { CartItem } from "./cart.types";

interface CartContextValue {
  items: CartItem[];
  addItem: (id: number) => void;
  changeQuantity: (id: number, change: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getCartSnapshot, getServerCartSnapshot);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem: (id) => updateCart((current) => addItem(current, id)),
      changeQuantity: (id, change) =>
        updateCart((current) => changeQuantity(current, id, change)),
      removeItem: (id) => updateCart((current) => removeItem(current, id)),
      clearCart: () => updateCart(clearItems),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (context === null) throw new Error("useCart must be used within a CartProvider.");
  return context;
}
