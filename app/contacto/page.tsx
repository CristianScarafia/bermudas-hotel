import type { Metadata } from "next";
import Image from "next/image";
import { Footer, Header, PageHero, WhatsAppButton } from "@/components/site-shell";

export const metadata: Metadata = { title: "Contacto y reservas", description: "Contactá a Hotel Bermudas para consultar disponibilidad y reservar alojamiento en La Perla, Mar del Plata.", alternates: { canonical: "/contacto" } };

export default function ContactPage() {
  return <><Header overlay/><main id="contenido">
    <PageHero eyebrow="Hablemos" title="Tu estadía empieza acá" copy="Consultá fechas, habitaciones y disponibilidad directamente con nuestro equipo." image="/images/IMG_0947.webp" alt="Entrada del Hotel Bermudas en Mar del Plata" />
    <section className="contact-section section container">
      <div className="contact-heading reveal"><p className="eyebrow">Contacto directo</p><h2>Estamos para ayudarte a planificar tu viaje.</h2><p>Para obtener atención personalizada y consultar la mejor opción disponible, comunicate por cualquiera de nuestros canales.</p></div>
      <div className="contact-list">
        <a className="contact-row reveal" href="https://wa.me/542236076020?text=Hola%20Hotel%20Bermudas%2C%20quisiera%20consultar%20disponibilidad" target="_blank" rel="noreferrer"><span>01</span><div><small>WhatsApp</small><strong>+54 223 607-6020</strong></div><b>↗</b></a>
        <a className="contact-row reveal" href="tel:+542236076020"><span>02</span><div><small>Teléfono</small><strong>+54 223 607-6020</strong></div><b>→</b></a>
        <a className="contact-row reveal" href="mailto:bermudashotel@hotmail.com"><span>03</span><div><small>E-mail</small><strong>bermudashotel@hotmail.com</strong></div><b>→</b></a>
        <a className="contact-row reveal" href="https://maps.google.com/?q=3+de+Febrero+2484+Mar+del+Plata" target="_blank" rel="noreferrer"><span>04</span><div><small>Ubicación</small><strong>3 de Febrero 2484</strong></div><b>↗</b></a>
      </div>
    </section>
    <section className="contact-image"><Image src="/images/IMG_0971.webp" alt="Recepción y sala de espera del Hotel Bermudas" width={1800} height={1350} sizes="100vw" unoptimized/><div><p className="eyebrow light">Atención personalizada</p><h2>Te esperamos en Mar del Plata.</h2></div></section>
  </main><Footer/><WhatsAppButton/></>;
}
