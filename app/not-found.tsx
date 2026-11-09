import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-start justify-center px-5 py-16 sm:px-8 md:py-24">
      <p className="mb-3 text-xs font-bold uppercase tracking-eyebrow text-accent">
        404 · Page not found
      </p>
      <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        This page isn’t in the collection.
      </h1>
      <Link
        className={cn(buttonVariants({ size: "lg" }), "mt-8")}
        href="/products"
      >
        Back to the shop
      </Link>
    </section>
  );
}
