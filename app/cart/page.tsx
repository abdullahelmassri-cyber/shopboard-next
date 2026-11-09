import { CartContents } from "@/features/cart/CartContents";
import { getProducts } from "@/features/products/products.api";
import { withProductImage } from "@/features/products/products.images";

export default async function CartPage() {
  const products = (await getProducts()).map(withProductImage);
  return <CartContents products={products} />;
}
