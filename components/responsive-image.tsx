type ResponsiveImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function ResponsiveImage({ src, alt, width, height, sizes, className, priority = false }: ResponsiveImageProps) {
  const extension = src.lastIndexOf(".");
  const base = src.slice(0, extension);
  const ext = src.slice(extension);
  const srcSet = [480, 768, 1200]
    .filter((candidate) => candidate < width)
    .map((candidate) => `${base}-${candidate}${ext} ${candidate}w`)
    .concat(`${src} ${width}w`)
    .join(", ");

  return (
    // Deliberately bypass next/image: Vinext's runtime optimizer has no ASSETS
    // binding on every hosting path. These srcsets point to real pre-generated files.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
