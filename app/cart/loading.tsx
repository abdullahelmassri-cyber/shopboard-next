export default function CartLoading() {
  return (
    <section
      className="mx-auto w-full max-w-[1260px] flex-1 px-5 py-16 sm:px-8 md:py-24"
      role="status"
      aria-live="polite"
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
        Your selection
      </p>
      <h1 className="font-serif text-4xl leading-tight text-[var(--forest)] sm:text-5xl">
        Your cart
      </h1>
      <p className="mt-5 text-[var(--muted)]">Loading your cart…</p>
    </section>
  );
}
