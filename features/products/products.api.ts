import { ApiError, fetchJson } from "@/lib/api/client";
import type { Category, Product } from "./products.types";

const PRODUCTS_PATH = "/api/products";
const INVALID_RESPONSE_STATUS = 500;
const CENTS_PER_DOLLAR = 100;

interface ApiProduct {
  id: number;
  title: string;
  category_name: Category;
  price_cents: number;
  in_stock: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCategory(value: unknown): value is Category {
  return value === "Bags" || value === "Shoes" || value === "Accessories";
}

function isApiProduct(value: unknown): value is ApiProduct {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "number" &&
    Number.isSafeInteger(value.id) &&
    value.id > 0 &&
    typeof value.title === "string" &&
    isCategory(value.category_name) &&
    typeof value.price_cents === "number" &&
    Number.isSafeInteger(value.price_cents) &&
    value.price_cents >= 0 &&
    typeof value.in_stock === "boolean"
  );
}

function parseProductsResponse(data: unknown): Product[] {
  if (!isRecord(data) || !Array.isArray(data.items)) {
    throw new ApiError("Products response has an invalid shape", INVALID_RESPONSE_STATUS);
  }

  if (!data.items.every(isApiProduct)) {
    throw new ApiError("Products response contains invalid product data", INVALID_RESPONSE_STATUS);
  }

  return data.items.map((product) => ({
    id: product.id,
    name: product.title,
    category: product.category_name,
    price: product.price_cents / CENTS_PER_DOLLAR,
    inStock: product.in_stock,
  }));
}

export function getProducts(): Promise<Product[]> {
  return fetchJson(PRODUCTS_PATH, parseProductsResponse);
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.id === id);
}
