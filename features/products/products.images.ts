import type { DisplayProduct, Product } from "./products.types";

export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 480'%3E%3Crect width='640' height='480' fill='%23e8ece6'/%3E%3Cpath d='M240 290h160l-20-90h-120z' fill='%23cbd4cc'/%3E%3C/svg%3E";

const productImages: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
  2: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  3: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
  4: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
  5: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80",
  6: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80",
  7: "https://images.pexels.com/photos/19814912/pexels-photo-19814912.jpeg?auto=compress&cs=tinysrgb&w=900",
  8: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  9: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
  10: "https://images.pexels.com/photos/9582656/pexels-photo-9582656.jpeg?auto=compress&cs=tinysrgb&w=900",
  11: "https://images.pexels.com/photos/712883/pexels-photo-712883.jpeg?auto=compress&cs=tinysrgb&w=900",
  12: "https://images.unsplash.com/photo-1664286074240-d7059e004dff?auto=format&fit=crop&w=900&q=80",
};

export function withProductImage(product: Product): DisplayProduct {
  return {
    ...product,
    image: productImages[product.id] ?? PLACEHOLDER_IMAGE,
  };
}
