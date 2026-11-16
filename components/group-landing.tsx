import Link from "next/link";
import { Header, Footer, WhatsAppButton } from "@/components/site-shell";
import { SvgIcon } from "@/components/icons";
import { ResponsiveImage } from "@/components/responsive-image";
import { InquiryForm } from "@/components/inquiry-form";
import { Breadcrumbs, FaqSection, JsonLd } from "@/components/content-sections";
import { rooms, siteUrl, type FaqItem } from "@/lib/hotel-content";

export type GroupPageContent = {
  path: string; label: string; title: string; intro: string;
  heading: string; body: string;
  details: Array<[string, string]>;
  faqs: FaqItem[];
};

export const groupLinks = [
  { href: "/agencias-de-viajes", title: "Agencias y operadores", copy: "Información del hotel, categorías y una consulta para cada salida o contingente." },
  { href: "/alojamiento-para-eventos", title: "Congresos y delegaciones", copy: "Organizá el alojamiento de participantes, equipos y acompañantes según las fechas del encuentro." },
  { href: "/viajes-de-egresados", title: "Educativos y egresados", copy: "Consultá la viabilidad y las condiciones de alojamiento según el grupo y su coordinación." },
];

export function GroupLanding({ content }: { content: GroupPageContent }) {
  return <><Header inquiryHref="#consulta-grupal" /><main id="contenido">
    <section className="segment-hero container"><div><p className="section-label">{content.label}</p><h1>{content.title}</h1><p>{content.intro}</p><a className="button button-dark" href="#consulta-grupal">Preparar consulta de grupo <SvgIcon name="arrow-up-right" /></a></div><div className="segment-hero-image"><ResponsiveImage src="/images/recepcion-hotel-bermudas-mar-del-plata.webp" alt="Recepción del Hotel Bermudas en La Perla para coordinar consultas de alojamiento" width={1800} height={1350} sizes="(max-width: 800px) 100vw, 44vw" priority /><span className="segment-image-note">La Perla, Mar del Plata · Desayuno continental incluido</span></div></section>
    <Breadcrumbs items={content.path === "/grupos-y-contingentes" ? [{ label: "Grupos y contingentes" }] : [{ label: "Grupos", href: "/grupos-y-contingentes" }, { label: content.label }]} />
    <section className="commercial-facts section container"><div><p className="section-label">Una consulta, una propuesta</p><h2>{content.heading}</h2><p>{content.body}</p><Link className="text-link" href="/ficha-comercial">Ficha del hotel para compartir <SvgIcon name="arrow-right" /></Link></div><dl className="compare-list">{content.details.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl></section>
    <section className="container" aria-label="Habitaciones para organizar el grupo"><div className="section-heading"><div><p className="section-label">Distribución a medida de la consulta</p><h2>Empecemos por las habitaciones.</h2></div></div><div className="table-scroll"><table className="capacity-table"><caption className="sr-only">Categorías y capacidad por habitación</caption><thead><tr><th scope="col">Categoría</th><th scope="col">Capacidad por habitación</th><th scope="col">Para conocerla</th></tr></thead><tbody>{rooms.map(room => <tr key={room.slug}><th scope="row">{room.shortName}</th><td>Hasta {room.capacity} personas{room.slug === "quintuple" ? " · dos ambientes" : ""}</td><td><Link href={`/habitaciones/${room.slug}`}>Ver fotos y detalles</Link></td></tr>)}</tbody></table></div><p className="small-note">El hotel cuenta con 20 habitaciones. La cantidad disponible por categoría, las camas y la distribución del grupo se confirman para cada fecha.</p></section>
    <section className="section container"><div className="section-heading"><h2>De la idea a la propuesta.</h2></div><div className="group-steps">{[
      ["1", "Contanos el viaje", "Fechas tentativas, cantidad estimada y motivo. Si todavía no está todo definido, podemos empezar por lo que ya sabés."],
      ["2", "Evaluamos las opciones", "El equipo revisa disponibilidad, distribución y necesidades para preparar la propuesta de alojamiento."],
      ["3", "Confirmás con información", "Antes de reservar, revisá el total, incluidos, pagos, vigencia de la cotización y condiciones de cambios o cancelación."],
    ].map(([step, title, copy]) => <article className="group-step" key={step}><span>Paso {step}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section id="consulta-grupal" className="inquiry-section section container"><div className="inquiry-intro"><p className="section-label">Directo con el hotel</p><h2>Contanos cuántas personas viajan.</h2><p>Indicá las fechas tentativas y el tamaño estimado del grupo para iniciar la consulta por WhatsApp.</p><p className="small-note">La consulta no bloquea habitaciones. Disponibilidad, servicios adicionales y condiciones se confirman con el equipo.</p><a className="text-link" href="tel:+542236076020">También podés llamarnos</a></div><InquiryForm mode="group" /></section>
    <FaqSection faqs={content.faqs} title="Lo que conviene saber al organizar" />
    <section className="section container"><div className="segment-links">{groupLinks.filter(link => link.href !== content.path).map(link => <Link className="segment-link" href={link.href} key={link.href}><h3>{link.title}<SvgIcon name="arrow-up-right" /></h3><p>{link.copy}</p></Link>)}</div></section>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: content.title, url: `${siteUrl}${content.path}`, about: { "@id": `${siteUrl}/#hotel` } }} />
  </main><Footer /><WhatsAppButton /></>;
}
