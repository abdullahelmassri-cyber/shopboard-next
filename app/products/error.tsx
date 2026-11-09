"use client";

import { Button } from "@/components/ui/Button";

interface ProductsErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ProductsError({ retry }: ProductsErrorProps) {
  return (
    <section
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-start px-5 py-16 sm:px-8 md:py-24"
      role="alert"
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-eyebrow text-accent">
        The collection
      </p>
      <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        Products are temporarily unavailable.
      </h1>
      <p className="mt-5 max-w-xl text-muted">
        We couldn’t load the collection. Please try again.
      </p>
      <Button className="mt-8" size="lg" onClick={() => retry()}>
        Try again
      </Button>
    </section>
  );
}
