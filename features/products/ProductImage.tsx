"use client";

import Image from "next/image";
import { useState } from "react";
import { PLACEHOLDER_IMAGE } from "./products.images";

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function ProductImage({ src, alt, priority = false }: ProductImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      className="aspect-[4/3] h-auto w-full bg-[var(--color-image-background)] object-cover"
      src={imageSrc}
      alt={alt}
      width={900}
      height={675}
      unoptimized
      priority={priority}
      onError={() => setImageSrc(PLACEHOLDER_IMAGE)}
    />
  );
}
