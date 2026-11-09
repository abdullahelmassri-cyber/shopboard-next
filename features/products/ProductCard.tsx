import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { AddToCartButton } from "@/features/cart/AddToCartButton";
import { ProductImage } from "./ProductImage";
import type { DisplayProduct } from "./products.types";

export function ProductCard({ product }: { product: DisplayProduct }) {
  return (
    <article>
      <Card className="h-full" variant="product">
        <Link
          className="block rounded-sm"
          href={`/products/${product.id}`}
          aria-label={`View ${product.name}`}
        >
          <ProductImage src={product.image} alt={product.name} />
        </Link>
        <div className="pt-4">
          <Badge variant="category">{product.category}</Badge>
          <h2 className="mt-2 font-serif text-xl text-foreground">
            <Link className="rounded-sm no-underline hover:text-accent" href={`/products/${product.id}`}>
              {product.name}
            </Link>
          </h2>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="font-semibold text-foreground">${product.price.toFixed(2)}</p>
            <Badge variant={product.inStock ? "success" : "unavailable"}>
              {product.inStock ? "In stock" : "Out of stock"}
            </Badge>
          </div>
          <AddToCartButton
            productId={product.id}
            productName={product.name}
            inStock={product.inStock}
          />
        </div>
      </Card>
    </article>
  );
}
