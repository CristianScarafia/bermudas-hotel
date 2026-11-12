import manifest from "@/lib/image-manifest.json";

export type ImageInfo = { width: number; height: number; version?: string; variants: Array<{ src: string; width: number }> };

export function imageInfo(src: string) {
  return (manifest as Record<string, ImageInfo>)[src];
}

export function imageSource(src: string, original = src) {
  const version = imageInfo(original)?.version;
  return version ? `${src}${src.includes("?") ? "&" : "?"}v=${version}` : src;
}
