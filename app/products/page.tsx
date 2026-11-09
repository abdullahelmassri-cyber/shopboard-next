import { ProductCard } from "@/features/products/ProductCard";
import { getProducts } from "@/features/products/products.api";
import { withProductImage } from "@/features/products/products.images";

export default async function ProductsPage() {
  const products = (await getProducts()).map(withProductImage);

  return (
    <section className="mx-auto w-full max-w-7xl flex-1 px-5 py-16 sm:px-8 md:py-24">
      <p className="mb-3 text-xs font-bold uppercase tracking-eyebrow text-accent">
        The collection
      </p>
      <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        Products
      </h1>
      {products.length === 0 ? (
        <p className="mt-5 max-w-xl text-muted">
          There are no products in the collection yet. Please check back soon.
        </p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
