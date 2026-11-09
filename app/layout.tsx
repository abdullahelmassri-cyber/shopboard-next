import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ShopBoard | Thoughtful everyday essentials",
    template: "%s | ShopBoard",
  },
  description: "A considered collection of everyday essentials.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <header className="border-b border-[var(--line)] bg-[var(--white)]">
          <div className="mx-auto flex w-full max-w-[1220px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4 sm:px-8">
            <Link
              className="font-serif text-2xl font-bold text-[var(--forest)] no-underline"
              href="/"
            >
              ShopBoard
            </Link>
            <nav aria-label="Main navigation">
              <ul className="flex items-center gap-6 text-sm font-semibold text-[var(--forest)]">
                <li>
                  <Link className="rounded-sm hover:text-[var(--accent)]" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="rounded-sm hover:text-[var(--accent)]" href="/products">
                    Products
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="border-t border-[var(--line)] bg-[var(--white)]">
          <p className="mx-auto w-full max-w-[1220px] px-5 py-6 text-sm text-[var(--muted)] sm:px-8">
            Thoughtful everyday essentials, selected for ShopBoard.
          </p>
        </footer>
      </body>
    </html>
  );
}
