import Link from "next/link";
import { ProductImage } from "@/features/products/ProductImage";
import { getProducts } from "@/features/products/products.api";
import { withProductImage } from "@/features/products/products.images";

export default async function ProductsPage() {
  const products = (await getProducts()).map(withProductImage);

  return (
    <section className="mx-auto w-full max-w-[1260px] flex-1 px-5 py-16 sm:px-8 md:py-24">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
        The collection
      </p>
      <h1 className="font-serif text-4xl leading-tight text-[var(--forest)] sm:text-5xl">
        Products
      </h1>
      {products.length === 0 ? (
        <p className="mt-5 max-w-xl text-[var(--muted)]">
          There are no products in the collection yet. Please check back soon.
        </p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <article>
                <Link
                  className="block rounded-sm"
                  href={`/products/${product.id}`}
                  aria-label={`View ${product.name}`}
                >
                  <ProductImage src={product.image} alt={product.name} />
                </Link>
                <div className="pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {product.category}
                  </p>
                  <h2 className="mt-1 font-serif text-xl text-[var(--ink)]">
                    <Link
                      className="rounded-sm no-underline hover:text-[var(--accent)]"
                      href={`/products/${product.id}`}
                    >
                      {product.name}
                    </Link>
                  </h2>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="font-semibold text-[var(--forest)]">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {product.inStock ? "In stock" : "Out of stock"}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
