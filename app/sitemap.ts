import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/habitaciones", "/servicios", "/ubicacion", "/contacto"];
  return routes.map((route) => ({
    url: `https://bermudashotel.com${route}`,
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.8 : 1,
  }));
}
