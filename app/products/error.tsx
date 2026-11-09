"use client";

interface ProductsErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ProductsError({ retry }: ProductsErrorProps) {
  return (
    <section
      className="mx-auto flex w-full max-w-[1260px] flex-1 flex-col items-start px-5 py-16 sm:px-8 md:py-24"
      role="alert"
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
        The collection
      </p>
      <h1 className="font-serif text-4xl leading-tight text-[var(--forest)] sm:text-5xl">
        Products are temporarily unavailable.
      </h1>
      <p className="mt-5 max-w-xl text-[var(--muted)]">
        We couldn’t load the collection. Please try again.
      </p>
      <button
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[var(--radius)] bg-[var(--forest)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-button-hover)]"
        type="button"
        onClick={() => retry()}
      >
        Try again
      </button>
    </section>
  );
}
