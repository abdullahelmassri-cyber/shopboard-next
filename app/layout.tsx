import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { CartProvider } from "@/features/cart/CartProvider";
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
        <CartProvider>
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <footer className="border-t border-border bg-surface">
            <p className="mx-auto w-full max-w-6xl px-5 py-6 text-sm text-muted sm:px-8">
              Thoughtful everyday essentials, selected for ShopBoard.
            </p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
