import type { Metadata } from "next";
import { BookingCta, Breadcrumbs, FaqSection, JsonLd, RelatedLinks } from "@/components/content-sections";
import { Footer, Header, PageHero, WhatsAppButton } from "@/components/site-shell";
import { generalFaqs, siteUrl } from "@/lib/hotel-content";

export const metadata: Metadata = {
  title: "Alojamiento familiar en Mar del Plata",
  description: "Hotel familiar en La Perla, Mar del Plata, con habitaciones triples, cuádruples y quíntuples, desayuno, baño privado y ubicación cerca de la playa.",
  alternates: { canonical: "/alojamiento-familiar" },
};

export default function FamilyAccommodationPage() {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: "Alojamiento familiar en Mar del Plata", url: `${siteUrl}/alojamiento-familiar`, about: { "@id": `${siteUrl}/#hotel` } };
  return <><Header overlay /><main id="contenido">
    <PageHero eyebrow="Viajar en familia" title="Alojamiento familiar" copy="Habitaciones para compartir, ubicación práctica y atención cercana en La Perla." image="/images/habitacion-cuadruple-moderna-hotel-bermudas.webp" alt="Habitación cuádruple moderna para alojamiento familiar en Mar del Plata" />
    <Breadcrumbs items={[{ label: "Alojamiento familiar" }]} />
    <section className="seo-lead section container"><div className="reveal"><p className="eyebrow">Comodidad compartida</p><h2>Más simple para grandes y chicos.</h2></div><div className="reveal"><p>Viajar en familia requiere una habitación adecuada y una ubicación que reduzca traslados. En Hotel Bermudas podés consultar opciones triples, cuádruples y quíntuples para alojarse juntos, con baño privado y comodidades esenciales.</p><p>Al escribirnos, indicá cuántos adultos viajan y las edades de los menores. Así podemos recomendarte la capacidad correcta y confirmar la disponibilidad real para tus fechas.</p></div></section>
    <section className="family-needs section"><div className="container"><div className="section-heading reveal"><div><p className="eyebrow">Pensado para organizarse mejor</p><h2>Lo importante, cerca.</h2></div></div><div className="policy-grid"><article className="policy-card reveal"><span>01</span><h3>Habitaciones compartidas</h3><p>Opciones para tres, cuatro o cinco huéspedes, sujetas a disponibilidad.</p></article><article className="policy-card reveal"><span>02</span><h3>Baño privado</h3><p>Baños renovados dentro de cada habitación.</p></article><article className="policy-card reveal"><span>03</span><h3>Desayuno</h3><p>Una propuesta para comenzar el día antes de salir a recorrer.</p></article><article className="policy-card reveal"><span>04</span><h3>Cerca del mar</h3><p>A 100 metros de la costa y cerca del centro de la ciudad.</p></article></div></div></section>
    <RelatedLinks title="Opciones para tu familia" links={[
      { href: "/habitaciones/triple", eyebrow: "Hasta tres huéspedes", title: "Habitación triple", copy: "Una opción práctica para familias pequeñas.", event: "view_room" },
      { href: "/habitaciones/cuadruple", eyebrow: "Hasta cuatro huéspedes", title: "Habitación cuádruple", copy: "Más lugar para compartir la estadía.", event: "view_room" },
      { href: "/habitaciones/quintuple", eyebrow: "Hasta cinco huéspedes", title: "Habitación quíntuple", copy: "Dos ambientes para compartir con mayor comodidad.", event: "view_room" },
      { href: "/guias/playas-cerca-del-hotel", eyebrow: "Plan familiar", title: "Playas cercanas", copy: "Consejos para organizar un día de playa desde el hotel.", event: "view_local_guide" },
    ]} />
    <FaqSection faqs={[generalFaqs[1], generalFaqs[2], generalFaqs[3], generalFaqs[6], generalFaqs[7]]} title="Preguntas de familias" />
    <BookingCta title="Encontrá la habitación para tu familia" message="Hola Hotel Bermudas, quisiera consultar alojamiento familiar. Somos (adultos y edades de menores):" /><JsonLd data={schema} />
  </main><Footer /><WhatsAppButton /></>;
}
