import type { Metadata } from "next";
import Link from "next/link";
import { BookingCta, Breadcrumbs, FaqSection, JsonLd, RelatedLinks } from "@/components/content-sections";
import { Footer, Header, PageHero, WhatsAppButton } from "@/components/site-shell";
import { SvgIcon } from "@/components/icons";
import { generalFaqs, siteUrl } from "@/lib/hotel-content";

export const metadata: Metadata = {
  title: "Hotel en La Perla, Mar del Plata",
  description: "Alojate en Hotel Bermudas, en La Perla, Mar del Plata: a 100 metros del mar, 300 metros de la peatonal y con habitaciones renovadas.",
  alternates: { canonical: "/hotel-en-la-perla" },
  openGraph: { title: "Hotel en La Perla | Hotel Bermudas", description: "Cerca de la playa y el centro de Mar del Plata.", url: "/hotel-en-la-perla", images: ["/images/fachada-hotel-bermudas-la-perla.webp"] },
};

export default function HotelInLaPerlaPage() {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: "Hotel en La Perla, Mar del Plata", url: `${siteUrl}/hotel-en-la-perla`, about: { "@id": `${siteUrl}/#hotel` } };
  return <><Header overlay /><main id="contenido">
    <PageHero eyebrow="La Perla · Mar del Plata" title="Hotel en La Perla" copy="Descansá cerca de la playa, la peatonal y los principales paseos de la ciudad." image="/images/fachada-hotel-bermudas-la-perla.webp" alt="Fachada del Hotel Bermudas en La Perla, Mar del Plata" />
    <Breadcrumbs items={[{ label: "Hotel en La Perla" }]} />
    <section className="seo-lead section container"><div className="reveal"><p className="eyebrow">Una base estratégica</p><h2>Mar, centro y tranquilidad en una misma estadía.</h2></div><div className="reveal"><p>Hotel Bermudas está ubicado en 3 de Febrero 2484, dentro del barrio La Perla. Desde acá podés combinar mañanas de playa, recorridos por el centro y propuestas gastronómicas sin depender del auto para cada salida.</p><p>La ubicación se complementa con habitaciones dobles, triples y cuádruples, baños privados renovados, desayuno y atención directa del equipo del hotel.</p><Link className="text-link" href="/ubicacion">Explorar el mapa <SvgIcon name="arrow-right" /></Link></div></section>
    <section className="value-strip container"><article><strong>100 m</strong><h3>Del mar</h3><p>Una caminata corta para comenzar el día en la costa.</p></article><article><strong>300 m</strong><h3>De la peatonal</h3><p>Acceso cercano al movimiento comercial del centro.</p></article><article><strong>20</strong><h3>Habitaciones</h3><p>Opciones para parejas, familias y grupos.</p></article></section>
    <RelatedLinks title="Elegí cómo vivir La Perla" links={[
      { href: "/habitaciones", eyebrow: "Dobles, triples y cuádruples", title: "Habitaciones renovadas", copy: "Compará capacidades y encontrá la opción indicada.", event: "view_room" },
      { href: "/alojamiento-familiar", eyebrow: "Viajes compartidos", title: "Alojamiento familiar", copy: "Alternativas para familias de hasta cuatro huéspedes." },
      { href: "/guias/la-perla-a-pie", eyebrow: "Guía local", title: "La Perla a pie", copy: "Ideas prácticas para recorrer la zona desde el hotel.", event: "view_local_guide" },
    ]} />
    <FaqSection faqs={generalFaqs.slice(0, 5)} title="Preguntas sobre el hotel y la zona" />
    <BookingCta /><JsonLd data={schema} />
  </main><Footer /><WhatsAppButton /></>;
}
