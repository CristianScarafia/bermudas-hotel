import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/analytics";
import { hotel } from "@/lib/hotel-content";
import "./globals.css";
import "./modern.css";

const siteUrl = "https://bermudashotel.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: process.env.HOTEL_LOCAL_PREVIEW === "true" ? { index: false, follow: false } : undefined,
  title: {
    default: "Hotel Bermudas | Hotel en La Perla, Mar del Plata",
    template: "%s | Hotel Bermudas",
  },
  description:
    "Hotel en La Perla, Mar del Plata, a una cuadra del mar. Habitaciones renovadas, desayuno buffet incluido y consultas directas para familias y grupos.",
  keywords: [
    "hotel en Mar del Plata",
    "hotel La Perla",
    "alojamiento Mar del Plata",
    "hotel cerca de la playa",
    "Hotel Bermudas",
  ],
  authors: [{ name: "Hotel Bermudas" }],
  creator: "Hotel Bermudas",
  publisher: "Hotel Bermudas",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Hotel Bermudas",
    title: "Hotel Bermudas | Viví Mar del Plata desde La Perla",
    description:
      "Descansá a pasos del mar, con habitaciones renovadas y la calidez de una atención personalizada.",
    images: [
      {
        url: "/images/fachada-hotel-bermudas-la-perla.webp",
        width: 1448,
        height: 1086,
        alt: "Fachada del Hotel Bermudas en el barrio La Perla de Mar del Plata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Bermudas | Mar del Plata",
    description: "Tu lugar a pasos del mar, en el corazón de La Perla.",
    images: ["/images/fachada-hotel-bermudas-la-perla.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-bermudas.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12333a",
};

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "@id": `${siteUrl}/#hotel`,
  name: "Hotel Bermudas",
  url: siteUrl,
  telephone: "+54 223 607-6020",
  email: "bermudashotel@hotmail.com",
  image: [
    `${siteUrl}/images/fachada-hotel-bermudas-la-perla.webp`,
    `${siteUrl}/images/habitacion-doble-hotel-bermudas-mar-del-plata.webp`,
    `${siteUrl}/images/habitacion-triple-hotel-bermudas-la-perla.webp`,
    `${siteUrl}/images/habitacion-quintuple-hotel-bermudas.webp`,
  ],
  description:
    "Hotel familiar en La Perla, Mar del Plata, a 100 metros del mar y a 300 metros de la peatonal.",
  numberOfRooms: hotel.roomCount,
  checkinTime: "12:00",
  checkoutTime: "10:00",
  priceRange: "$$",
  currenciesAccepted: "ARS",
  availableLanguage: ["es"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "3 de Febrero 2484",
    addressLocality: "Mar del Plata",
    addressRegion: "Buenos Aires",
    postalCode: "B7600",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -37.9968725,
    longitude: -57.5430431,
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Desayuno", value: true },
    { "@type": "LocationFeatureSpecification", name: "Aire acondicionado", value: true },
    { "@type": "LocationFeatureSpecification", name: "Baño privado", value: true },
  ],
  containsPlace: [
    { "@type": "HotelRoom", "@id": `${siteUrl}/habitaciones/doble#habitacion`, name: "Habitación doble", url: `${siteUrl}/habitaciones/doble`, occupancy: { "@type": "QuantitativeValue", maxValue: 2 } },
    { "@type": "HotelRoom", "@id": `${siteUrl}/habitaciones/triple#habitacion`, name: "Habitación triple", url: `${siteUrl}/habitaciones/triple`, occupancy: { "@type": "QuantitativeValue", maxValue: 3 } },
    { "@type": "HotelRoom", "@id": `${siteUrl}/habitaciones/cuadruple#habitacion`, name: "Habitación cuádruple", url: `${siteUrl}/habitaciones/cuadruple`, occupancy: { "@type": "QuantitativeValue", maxValue: 4 } },
    { "@type": "HotelRoom", "@id": `${siteUrl}/habitaciones/quintuple#habitacion`, name: "Habitación quíntuple", url: `${siteUrl}/habitaciones/quintuple`, occupancy: { "@type": "QuantitativeValue", maxValue: 5 } },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Hotel Bermudas",
  inLanguage: "es-AR",
  publisher: { "@id": `${siteUrl}/#hotel` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Analytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
