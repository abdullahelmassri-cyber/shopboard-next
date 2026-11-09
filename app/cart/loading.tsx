export default function CartLoading() {
  return (
    <section
      className="mx-auto w-full max-w-7xl flex-1 px-5 py-16 sm:px-8 md:py-24"
      role="status"
      aria-live="polite"
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-eyebrow text-accent">
        Your selection
      </p>
      <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        Your cart
      </h1>
      <p className="mt-5 text-muted">Loading your cart…</p>
    </section>
  );
}
