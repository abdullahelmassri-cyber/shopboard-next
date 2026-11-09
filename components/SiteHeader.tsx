import Link from "next/link";
import { CartCount } from "@/features/cart/CartCount";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--white)]">
      <div className="mx-auto flex w-full max-w-[1220px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4 sm:px-8">
        <Link
          className="font-serif text-2xl font-bold text-[var(--forest)] no-underline"
          href="/"
        >
          ShopBoard
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
            <li>
              <Link className="rounded-sm text-[var(--forest)] hover:text-[var(--accent)]" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="rounded-sm text-[var(--forest)] hover:text-[var(--accent)]" href="/products">
                Products
              </Link>
            </li>
            <li>
              <CartCount />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
