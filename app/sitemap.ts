import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/habitaciones",
    "/habitaciones/doble",
    "/habitaciones/triple",
    "/habitaciones/cuadruple",
    "/servicios",
    "/ubicacion",
    "/contacto",
    "/preguntas-frecuentes",
    "/informacion-del-huesped",
    "/hotel-en-la-perla",
    "/alojamiento-familiar",
    "/grupos-y-contingentes",
    "/guias",
    "/guias/la-perla-a-pie",
    "/guias/playas-cerca-del-hotel",
    "/guias/centro-de-mar-del-plata",
  ];
  return routes.map((route) => ({
    url: `https://bermudashotel.com${route}`,
    changeFrequency: route ? "monthly" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/guias/") ? 0.65 : 0.8,
  }));
}
