import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const siteUrl = "https://bermudashotel.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hotel Bermudas | Hotel en La Perla, Mar del Plata",
    template: "%s | Hotel Bermudas",
  },
  description:
    "Hotel en La Perla, Mar del Plata, a 100 metros del mar y 300 metros de la peatonal. Habitaciones renovadas, desayuno y atención personalizada.",
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
        url: "/images/IMG_0947.webp",
        width: 1800,
        height: 1350,
        alt: "Fachada del Hotel Bermudas en el barrio La Perla de Mar del Plata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Bermudas | Mar del Plata",
    description: "Tu lugar a pasos del mar, en el corazón de La Perla.",
    images: ["/images/IMG_0947.webp"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/images/logo-bermudas.webp",
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
    `${siteUrl}/images/IMG_0947.webp`,
    `${siteUrl}/images/IMG_0930.webp`,
    `${siteUrl}/images/IMG_0936.webp`,
  ],
  description:
    "Hotel familiar en La Perla, Mar del Plata, a 100 metros del mar y a 300 metros de la peatonal.",
  numberOfRooms: 20,
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
    latitude: -37.993,
    longitude: -57.547,
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Desayuno", value: true },
    { "@type": "LocationFeatureSpecification", name: "Aire acondicionado", value: true },
    { "@type": "LocationFeatureSpecification", name: "Baño privado", value: true },
  ],
  containsPlace: [
    { "@type": "HotelRoom", name: "Habitación doble", occupancy: { "@type": "QuantitativeValue", maxValue: 2 } },
    { "@type": "HotelRoom", name: "Habitación triple", occupancy: { "@type": "QuantitativeValue", maxValue: 3 } },
    { "@type": "HotelRoom", name: "Habitación cuádruple", occupancy: { "@type": "QuantitativeValue", maxValue: 4 } },
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
