import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { AddToCartButton } from "@/features/cart/AddToCartButton";
import { ProductImage } from "@/features/products/ProductImage";
import { getProductById } from "@/features/products/products.api";
import { withProductImage } from "@/features/products/products.images";
import { cn } from "@/lib/utils";

function ProductLoading() {
  return (
    <section className="mx-auto w-full max-w-7xl flex-1 px-5 py-16 sm:px-8 md:py-24">
      <p className="text-muted" role="status">Loading product details…</p>
    </section>
  );
}

async function ProductDetails({
  params,
}: Pick<PageProps<"/products/[id]">, "params">) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const productId = Number(id);
  if (!Number.isSafeInteger(productId) || productId < 1) notFound();

  const product = await getProductById(productId);
  if (!product) notFound();

  const displayProduct = withProductImage(product);

  return (
    <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
      <div>
        <Badge variant="category">{displayProduct.category}</Badge>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          {displayProduct.name}
        </h1>
        <p className="mt-5 text-xl font-semibold text-foreground">
          ${displayProduct.price.toFixed(2)}
        </p>
        <p className="mt-3">
          <Badge variant={displayProduct.inStock ? "success" : "unavailable"}>
            {displayProduct.inStock ? "In stock" : "Currently out of stock"}
          </Badge>
        </p>
        <AddToCartButton
          productId={displayProduct.id}
          productName={displayProduct.name}
          inStock={displayProduct.inStock}
        />
        <Link
          className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "mt-5")}
          href="/products"
        >
          Back to products
        </Link>
      </div>
      <ProductImage
        src={displayProduct.image}
        alt={displayProduct.name}
        priority
      />
    </section>
  );
}

export default function ProductPage({
  params,
}: PageProps<"/products/[id]">) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}
