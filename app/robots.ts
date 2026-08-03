import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://bermudashotel.com/sitemap.xml", host: "https://bermudashotel.com" };
}
