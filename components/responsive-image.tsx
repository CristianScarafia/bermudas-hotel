import type { ReactEventHandler } from "react";
import { imageInfo, imageSource } from "@/lib/image-info";
type ResponsiveImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
  onError?: ReactEventHandler<HTMLImageElement>;
};

export function ResponsiveImage({ src, alt, width, height, sizes, className, priority = false, onError }: ResponsiveImageProps) {
  const info = imageInfo(src);
  const actualWidth = info?.width || width;
  const actualHeight = info?.height || height;
  const srcSet = (info?.variants || [])
    .map((variant) => `${imageSource(variant.src, src)} ${variant.width}w`)
    .concat(`${imageSource(src)} ${actualWidth}w`)
    .join(", ");

  return (
    // Deliberately bypass next/image: Vinext's runtime optimizer has no ASSETS
    // binding on every hosting path. These srcsets point to real pre-generated files.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSource(src)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={actualWidth}
      height={actualHeight}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={onError}
    />
  );
}
