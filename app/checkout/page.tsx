import { CheckoutContents } from "@/features/checkout/CheckoutContents";
import { getProducts } from "@/features/products/products.api";
import { withProductImage } from "@/features/products/products.images";

export default async function CheckoutPage() {
  const products = (await getProducts()).map(withProductImage);

  return <CheckoutContents products={products} />;
}
