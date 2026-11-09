export default function ProductsLoading() {
  return (
    <section
      className="mx-auto w-full max-w-[1260px] flex-1 px-5 py-16 sm:px-8 md:py-24"
      role="status"
      aria-live="polite"
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
        The collection
      </p>
      <h1 className="font-serif text-4xl leading-tight text-[var(--forest)] sm:text-5xl">
        Products
      </h1>
      <p className="mt-5 text-[var(--muted)]">Loading the collection…</p>
      <span className="sr-only">The shared ShopBoard navigation and footer remain available.</span>
    </section>
  );
}
