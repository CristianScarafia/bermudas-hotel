import type { Metadata } from "next";
import { BookingCta, Breadcrumbs, JsonLd, RelatedLinks } from "@/components/content-sections";
import { Footer, Header, PageHero, WhatsAppButton } from "@/components/site-shell";
import { siteUrl } from "@/lib/hotel-content";

export const metadata: Metadata = {
  title: "Guías de La Perla y Mar del Plata",
  description: "Guías originales del Hotel Bermudas para recorrer La Perla, disfrutar las playas cercanas y conocer el centro de Mar del Plata.",
  alternates: { canonical: "/guias" },
};

export default function GuidesPage() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Guías de La Perla y Mar del Plata", url: `${siteUrl}/guias`, about: { "@type": "Place", name: "Mar del Plata" } };
  return <><Header overlay /><main id="contenido">
    <PageHero eyebrow="Prepará tu viaje" title="Guías de Mar del Plata" copy="Ideas simples y originales para aprovechar La Perla, la playa y el centro desde el Hotel Bermudas." image="/images/costa-la-perla-mar-del-plata.webp" alt="Costa de La Perla en Mar del Plata cerca del Hotel Bermudas" />
    <Breadcrumbs items={[{ label: "Guías" }]} />
    <section className="seo-lead section container"><div className="reveal"><p className="eyebrow">Mirada local</p><h2>Menos tiempo organizando. Más tiempo disfrutando.</h2></div><div className="reveal"><p>Preparamos estas guías para responder preguntas reales de quienes se alojan en La Perla: qué se puede hacer caminando, cómo organizar la playa y cómo combinar la costa con el centro.</p><p>Son recorridos flexibles, sin horarios rígidos. Antes de visitar un espacio específico, verificá sus días y horarios oficiales porque pueden cambiar según la temporada.</p></div></section>
    <RelatedLinks title="Elegí tu próxima guía" links={[
      { href: "/guias/la-perla-a-pie", eyebrow: "Recorrido", title: "La Perla a pie", copy: "Costa, barrio y centro en un paseo adaptable.", event: "view_local_guide" },
      { href: "/guias/playas-cerca-del-hotel", eyebrow: "A 100 metros", title: "Playas cercanas", copy: "Consejos para un día de playa práctico y relajado.", event: "view_local_guide" },
      { href: "/guias/centro-de-mar-del-plata", eyebrow: "Paseo urbano", title: "Centro de Mar del Plata", copy: "Peatonal, gastronomía y clásicos cerca del hotel.", event: "view_local_guide" },
    ]} />
    <BookingCta /><JsonLd data={schema} />
  </main><Footer /><WhatsAppButton /></>;
}
