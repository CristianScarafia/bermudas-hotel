import type { Metadata } from "next";
import { BookingCta, Breadcrumbs, JsonLd, RelatedLinks } from "@/components/content-sections";
import { Footer, Header, PageHero, WhatsAppButton } from "@/components/site-shell";
import { siteUrl } from "@/lib/hotel-content";

export const metadata: Metadata = {
  title: "Hotel para grupos y contingentes",
  description: "Alojamiento para grupos y contingentes en Mar del Plata. Consultá una propuesta personalizada en Hotel Bermudas, cerca de la playa y el centro.",
  alternates: { canonical: "/grupos-y-contingentes" },
};

const steps = [
  ["01", "Contanos el viaje", "Fechas tentativas, motivo del viaje y cantidad estimada de personas."],
  ["02", "Detallá el grupo", "Cantidad de adultos y menores, distribución deseada y necesidades particulares."],
  ["03", "Recibí una propuesta", "El hotel evalúa capacidad y disponibilidad para responder con una alternativa concreta."],
  ["04", "Confirmá las condiciones", "Revisá tarifa, servicios, pagos, horarios y cancelación antes de reservar."],
];

export default function GroupsPage() {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: "Hotel para grupos y contingentes", url: `${siteUrl}/grupos-y-contingentes`, about: { "@id": `${siteUrl}/#hotel` } };
  return <><Header overlay /><main id="contenido">
    <PageHero eyebrow="Viajes compartidos" title="Grupos y contingentes" copy="Una consulta centralizada para organizar alojamiento en Mar del Plata." image="/images/recepcion-hotel-bermudas-mar-del-plata.webp" alt="Recepción del Hotel Bermudas para atención de grupos y contingentes" />
    <Breadcrumbs items={[{ label: "Grupos y contingentes" }]} />
    <section className="seo-lead section container"><div className="reveal"><p className="eyebrow">Propuesta personalizada</p><h2>Un solo contacto para organizar el alojamiento.</h2></div><div className="reveal"><p>Recibimos consultas de grupos familiares, deportivos, educativos y contingentes. La disponibilidad se evalúa según las fechas, el tamaño del grupo y la distribución necesaria.</p><p>Hotel Bermudas cuenta con 20 habitaciones dobles, triples, cuádruples y quíntuples. Su ubicación en La Perla permite estar cerca del mar y del centro de Mar del Plata.</p></div></section>
    <section className="group-process section"><div className="container"><div className="section-heading reveal"><div><p className="eyebrow">Cómo solicitar una propuesta</p><h2>Cuatro datos que agilizan la respuesta.</h2></div></div><div className="policy-grid">{steps.map(([number,title,copy]) => <article className="policy-card reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <RelatedLinks links={[
      { href: "/habitaciones", eyebrow: "Capacidades", title: "Tipos de habitación", copy: "Conocé las opciones dobles, triples, cuádruples y quíntuples.", event: "view_room" },
      { href: "/informacion-del-huesped", eyebrow: "Antes de confirmar", title: "Información de reserva", copy: "Pagos, horarios y condiciones explicados claramente." },
      { href: "/ubicacion", eyebrow: "La Perla", title: "Ubicación y mapa", copy: "Evaluá accesos y puntos cercanos para tu grupo." },
    ]} />
    <BookingCta title="Solicitá una propuesta para tu grupo" copy="Enviá fechas, cantidad de personas y tipo de grupo. El equipo evaluará disponibilidad y distribución." message="Hola Hotel Bermudas, quisiera consultar alojamiento para un grupo. Fechas, cantidad de personas y tipo de grupo:" /><JsonLd data={schema} />
  </main><Footer /><WhatsAppButton /></>;
}
