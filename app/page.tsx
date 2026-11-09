import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
      <div className="max-w-2xl">
        <p className="mb-5 text-xs font-bold uppercase tracking-eyebrow text-accent">
          Everyday, thoughtfully chosen
        </p>
        <h1 className="font-serif text-5xl leading-display text-foreground sm:text-6xl lg:text-7xl">
          The pieces you reach for, made to last.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          A considered collection of bags, shoes, and accessories for the rhythm
          of everyday life.
        </p>
        <Link className={cn(buttonVariants({ size: "lg" }), "mt-9")} href="/products">
          Explore the collection
        </Link>
      </div>
      <div
        aria-hidden="true"
        className="flex min-h-64 items-end bg-image-background p-7 sm:min-h-80 lg:min-h-108"
      >
        <p className="max-w-xs font-serif text-2xl leading-snug text-foreground sm:text-3xl">
          Quiet essentials. Considered details.
        </p>
      </div>
    </section>
  );
}
