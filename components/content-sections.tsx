import Link from "next/link";
import type { FaqItem } from "@/lib/hotel-content";
import { whatsappFor } from "@/lib/hotel-content";
import { SvgIcon } from "@/components/icons";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="breadcrumbs container" aria-label="Migas de pan">
      <Link href="/">Inicio</Link>
      {items.map((item) => (
        <span key={item.label}>
          <b aria-hidden="true">/</b>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function FaqSection({
  faqs,
  title = "Preguntas frecuentes",
  eyebrow = "Antes de reservar",
}: {
  faqs: FaqItem[];
  title?: string;
  eyebrow?: string;
}) {
  return (
    <section className="faq-section section" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div className="faq-heading reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="faq-title">{title}</h2>
          <p>Información clara para que puedas consultar y reservar con tranquilidad.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details className="faq-item reveal" key={faq.question} open={index === 0}>
              <summary><span>{faq.question}</span><b aria-hidden="true">+</b></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BookingCta({
  title = "Consultá tu próxima estadía",
  copy = "Indicá las fechas y la cantidad de huéspedes. Nuestro equipo te responde con la mejor opción disponible.",
  message = "Hola Hotel Bermudas, quisiera consultar disponibilidad. Mis fechas y cantidad de huéspedes son:",
}: {
  title?: string;
  copy?: string;
  message?: string;
}) {
  return (
    <section className="compact-cta">
      <div className="container reveal">
        <p className="eyebrow light">Reserva directa</p>
        <h2>{title}</h2>
        <p>{copy}</p>
        <a className="button button-primary" href={whatsappFor(message)} target="_blank" rel="noreferrer">
          Consultar por WhatsApp <SvgIcon name="arrow-up-right" />
        </a>
      </div>
    </section>
  );
}

export function RelatedLinks({
  title = "Seguí explorando",
  links,
}: {
  title?: string;
  links: Array<{ href: string; eyebrow: string; title: string; copy: string; event?: string }>;
}) {
  return (
    <section className="related-section section container" aria-labelledby="related-title">
      <div className="section-heading reveal">
        <div><p className="eyebrow">También puede interesarte</p><h2 id="related-title">{title}</h2></div>
      </div>
      <div className="related-grid">
        {links.map((link) => (
          <Link className="related-card reveal" href={link.href} key={link.href} data-analytics-event={link.event}>
            <span>{link.eyebrow}</span>
            <h3>{link.title}</h3>
            <p>{link.copy}</p>
            <b>Ver más <SvgIcon name="arrow-right" /></b>
          </Link>
        ))}
      </div>
    </section>
  );
}
