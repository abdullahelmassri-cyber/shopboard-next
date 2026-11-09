import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CartCount } from "@/features/cart/CartCount";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4 sm:px-8">
        <Link
          className="font-serif text-2xl font-bold text-foreground no-underline"
          href="/"
        >
          ShopBoard
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
            <li>
              <Link className="rounded-sm text-foreground hover:text-accent" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="rounded-sm text-foreground hover:text-accent" href="/products">
                Products
              </Link>
            </li>
            <li>
              <CartCount />
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
