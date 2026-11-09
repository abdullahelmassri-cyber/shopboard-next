import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToCartButton } from "@/features/cart/AddToCartButton";
import { ProductImage } from "@/features/products/ProductImage";
import { getProductById } from "@/features/products/products.api";
import { withProductImage } from "@/features/products/products.images";

function ProductLoading() {
  return (
    <section className="mx-auto w-full max-w-[1260px] flex-1 px-5 py-16 sm:px-8 md:py-24">
      <p className="text-[var(--muted)]" role="status">Loading product details…</p>
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
    <section className="mx-auto grid w-full max-w-[1260px] flex-1 items-center gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          {displayProduct.category}
        </p>
        <h1 className="font-serif text-4xl leading-tight text-[var(--forest)] sm:text-5xl">
          {displayProduct.name}
        </h1>
        <p className="mt-5 text-xl font-semibold text-[var(--forest)]">
          ${displayProduct.price.toFixed(2)}
        </p>
        <p className="mt-3 text-[var(--muted)]">
          {displayProduct.inStock ? "In stock" : "Currently out of stock"}
        </p>
        <AddToCartButton
          productId={displayProduct.id}
          productName={displayProduct.name}
          inStock={displayProduct.inStock}
        />
        <Link
          className="mt-9 inline-flex min-h-12 items-center justify-center rounded-[var(--radius)] border border-[var(--forest)] px-6 py-3 text-sm font-semibold text-[var(--forest)] transition-colors hover:bg-[var(--color-image-background)]"
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
