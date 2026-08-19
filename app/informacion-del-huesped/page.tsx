import type { Metadata } from "next";
import { BookingCta, Breadcrumbs, JsonLd, RelatedLinks } from "@/components/content-sections";
import { Footer, Header, PageHero, WhatsAppButton } from "@/components/site-shell";
import { siteUrl } from "@/lib/hotel-content";

export const metadata: Metadata = {
  title: "Políticas, pagos e información del huésped",
  description: "Información para reservar en Hotel Bermudas: contacto, horarios, medios de pago, cancelación y datos necesarios para consultar disponibilidad.",
  alternates: { canonical: "/informacion-del-huesped" },
};

const information = [
  { number: "01", title: "Consultar disponibilidad", copy: "Enviá fecha de entrada, fecha de salida, cantidad de adultos, edades de los menores y número de habitaciones. Con esos datos podemos responderte con mayor precisión." },
  { number: "02", title: "Tarifa y medios de pago", copy: "La cotización informa la tarifa disponible, qué incluye y los medios de pago vigentes. Revisá esos datos antes de confirmar; no publicamos condiciones que puedan quedar desactualizadas." },
  { number: "03", title: "Confirmación de la reserva", copy: "La reserva queda confirmada cuando el equipo del hotel lo comunica expresamente y envía las condiciones correspondientes. Conservá ese intercambio para tener todos los datos a mano." },
  { number: "04", title: "Ingreso y salida", copy: "Los horarios de check-in y check-out se informan con la confirmación. Si necesitás una llegada temprana o una salida posterior, solicitala con anticipación y quedará sujeta a disponibilidad." },
  { number: "05", title: "Cambios y cancelaciones", copy: "La política aplicable puede variar según fecha y modalidad de reserva. Antes de confirmar recibirás las condiciones de cambio, cancelación y devolución correspondientes a tu cotización." },
  { number: "06", title: "Datos operativos", copy: "Dirección: 3 de Febrero 2484, Mar del Plata. Teléfono y WhatsApp: +54 223 607-6020. Correo: bermudashotel@hotmail.com." },
];

export default function GuestInformationPage() {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: "Información del huésped", url: `${siteUrl}/informacion-del-huesped`, about: { "@id": `${siteUrl}/#hotel` } };
  return <><Header overlay /><main id="contenido">
    <PageHero eyebrow="Antes de viajar" title="Información del huésped" copy="Reservas, pagos, horarios y condiciones explicados de forma simple y transparente." image="/images/recepcion-hotel-bermudas-mar-del-plata.webp" alt="Recepción del Hotel Bermudas en Mar del Plata" />
    <Breadcrumbs items={[{ label: "Información del huésped" }]} />
    <section className="guest-info section container">
      <div className="guest-info-heading reveal"><p className="eyebrow">Reserva informada</p><h2>Todo claro antes de confirmar.</h2><p>Las tarifas y condiciones pueden cambiar según la fecha. Por eso el hotel te entrega la información aplicable a tu reserva antes de pedirte una confirmación.</p></div>
      <div className="policy-grid">{information.map((item) => <article className="policy-card reveal" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
    </section>
    <aside className="accuracy-note"><div className="container"><strong>Importante</strong><p>La información definitiva es la que recibís por los canales oficiales del Hotel Bermudas para tus fechas. Si una condición es esencial para tu viaje, consultala antes de confirmar.</p></div></aside>
    <RelatedLinks links={[
      { href: "/preguntas-frecuentes", eyebrow: "Respuestas rápidas", title: "Preguntas frecuentes", copy: "Resolvé las consultas más habituales antes de reservar." },
      { href: "/habitaciones", eyebrow: "Hasta cinco huéspedes", title: "Ver habitaciones", copy: "Elegí entre habitaciones dobles, triples, cuádruples y quíntuples.", event: "view_room" },
      { href: "/contacto", eyebrow: "Atención directa", title: "Canales de contacto", copy: "WhatsApp, teléfono, correo y ubicación del hotel." },
    ]} />
    <BookingCta /><JsonLd data={schema} />
  </main><Footer /><WhatsAppButton /></>;
}
