import type { Metadata } from "next";
import { BookingCta, Breadcrumbs, FaqSection, JsonLd, RelatedLinks } from "@/components/content-sections";
import { Footer, Header, PageHero, WhatsAppButton } from "@/components/site-shell";
import { generalFaqs, siteUrl } from "@/lib/hotel-content";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Respuestas sobre habitaciones, reservas, ubicación, desayuno, horarios, pagos y cancelación en Hotel Bermudas, Mar del Plata.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

export default function FrequentlyAskedQuestionsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Preguntas frecuentes", item: `${siteUrl}/preguntas-frecuentes` },
    ],
  };
  return <><Header overlay /><main id="contenido">
    <PageHero eyebrow="Información útil" title="Preguntas frecuentes" copy="Todo lo esencial para organizar tu estadía y reservar con información clara." image="/images/recepcion-hotel-bermudas-mar-del-plata.webp" alt="Recepción del Hotel Bermudas donde se atienden consultas de huéspedes" />
    <Breadcrumbs items={[{ label: "Preguntas frecuentes" }]} />
    <FaqSection faqs={generalFaqs} title="Lo que necesitás saber" eyebrow="Hotel Bermudas" />
    <RelatedLinks links={[
      { href: "/habitaciones", eyebrow: "Elegí tu espacio", title: "Habitaciones", copy: "Compará opciones dobles, triples y cuádruples.", event: "view_room" },
      { href: "/informacion-del-huesped", eyebrow: "Condiciones claras", title: "Información del huésped", copy: "Conocé cómo consultar pagos, horarios y políticas." },
      { href: "/ubicacion", eyebrow: "La Perla", title: "Cómo llegar", copy: "Encontrá el hotel y explorá la zona en el mapa." },
    ]} />
    <BookingCta />
    <JsonLd data={schema} /><JsonLd data={breadcrumbs} />
  </main><Footer /><WhatsAppButton /></>;
}
