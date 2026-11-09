import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto grid w-full max-w-[1260px] flex-1 items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
      <div className="max-w-2xl">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          Everyday, thoughtfully chosen
        </p>
        <h1 className="font-serif text-5xl leading-[1.04] text-[var(--forest)] sm:text-6xl lg:text-7xl">
          The pieces you reach for, made to last.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--muted)]">
          A considered collection of bags, shoes, and accessories for the rhythm
          of everyday life.
        </p>
        <Link
          className="mt-9 inline-flex min-h-12 items-center justify-center rounded-[var(--radius)] bg-[var(--forest)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-button-hover)]"
          href="/products"
        >
          Explore the collection
        </Link>
      </div>
      <div
        aria-hidden="true"
        className="flex min-h-64 items-end bg-[var(--color-image-background)] p-7 sm:min-h-80 lg:min-h-[440px]"
      >
        <p className="max-w-xs font-serif text-2xl leading-snug text-[var(--forest)] sm:text-3xl">
          Quiet essentials. Considered details.
        </p>
      </div>
    </section>
  );
}
