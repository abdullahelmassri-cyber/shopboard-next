import { isCartItems } from "./cart.logic";
import type { CartItem } from "./cart.types";

const CART_STORAGE_KEY = "shopboard-cart";
const EMPTY_CART: CartItem[] = [];
const listeners = new Set<() => void>();

let snapshot: CartItem[] | null = null;

function parseCart(value: string | null): CartItem[] {
  if (value === null) return EMPTY_CART;

  try {
    const parsed: unknown = JSON.parse(value);
    return isCartItems(parsed) ? parsed : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

function emitChange(): void {
  for (const listener of listeners) listener();
}

function handleStorage(event: StorageEvent): void {
  if (event.key !== CART_STORAGE_KEY && event.key !== null) return;
  snapshot = parseCart(event.key === null ? null : event.newValue);
  emitChange();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (typeof window !== "undefined") window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", handleStorage);
  };
}

export function getCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  if (snapshot !== null) return snapshot;

  try {
    snapshot = parseCart(window.localStorage.getItem(CART_STORAGE_KEY));
  } catch {
    snapshot = EMPTY_CART;
  }

  return snapshot;
}

export function getServerCartSnapshot(): CartItem[] {
  return EMPTY_CART;
}

export function updateCart(updater: (items: CartItem[]) => CartItem[]): void {
  snapshot = updater(getCartSnapshot());

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // The in-memory cart remains usable for this session if storage is unavailable.
  }

  emitChange();
}
