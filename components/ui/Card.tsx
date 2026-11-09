import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-md", {
  variants: {
    variant: {
      content: "border border-border bg-surface",
      product: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "content",
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ className, variant }))} {...props} />;
}
