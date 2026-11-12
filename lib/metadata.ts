import type { Metadata } from "next";
import { siteUrl } from "@/lib/hotel-content";

export function pageMetadata(title: string, description: string, path: string, image = "/images/fachada-hotel-bermudas-la-perla.webp"): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title: `${title} | Hotel Bermudas`, description, url: `${siteUrl}${path}`, type: "website", locale: "es_AR", siteName: "Hotel Bermudas", images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title: `${title} | Hotel Bermudas`, description, images: [image] },
  };
}
