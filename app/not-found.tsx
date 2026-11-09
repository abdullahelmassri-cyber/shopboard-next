import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-[1260px] flex-1 flex-col items-start justify-center px-5 py-16 sm:px-8 md:py-24">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
        404 · Page not found
      </p>
      <h1 className="font-serif text-4xl leading-tight text-[var(--forest)] sm:text-5xl">
        This page isn’t in the collection.
      </h1>
      <Link
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[var(--radius)] bg-[var(--forest)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-button-hover)]"
        href="/products"
      >
        Back to the shop
      </Link>
    </section>
  );
}
