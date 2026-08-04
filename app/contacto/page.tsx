import type { Metadata } from "next";
import Image from "next/image";
import { Footer, Header, PageHero, WhatsAppButton } from "@/components/site-shell";
import { SvgIcon, type IconName } from "@/components/icons";

export const metadata: Metadata = { title: "Contacto y reservas", description: "Contactá a Hotel Bermudas para consultar disponibilidad y reservar alojamiento en La Perla, Mar del Plata.", alternates: { canonical: "/contacto" } };

export default function ContactPage() {
  const contacts: Array<{ icon: IconName; label: string; value: string; href: string; external?: boolean }> = [
    { icon: "whatsapp", label: "WhatsApp", value: "+54 223 607-6020", href: "https://wa.me/542236076020?text=Hola%20Hotel%20Bermudas%2C%20quisiera%20consultar%20disponibilidad", external: true },
    { icon: "phone", label: "Teléfono", value: "+54 223 607-6020", href: "tel:+542236076020" },
    { icon: "mail", label: "E-mail", value: "bermudashotel@hotmail.com", href: "mailto:bermudashotel@hotmail.com" },
    { icon: "map", label: "Ubicación", value: "3 de Febrero 2484", href: "https://maps.google.com/?q=3+de+Febrero+2484+Mar+del+Plata", external: true },
  ];

  return <><Header overlay/><main id="contenido">
    <PageHero eyebrow="Hablemos" title="Tu estadía empieza acá" copy="Consultá fechas, habitaciones y disponibilidad directamente con nuestro equipo." image="/images/fachada-hotel-bermudas-la-perla.webp" alt="Entrada del Hotel Bermudas en La Perla, Mar del Plata" />
    <section className="contact-section section container">
      <div className="contact-heading reveal"><p className="eyebrow">Contacto directo</p><h2>Estamos para ayudarte a planificar tu viaje.</h2><p>Para obtener atención personalizada y consultar la mejor opción disponible, comunicate por cualquiera de nuestros canales.</p></div>
      <div className="contact-list">
        {contacts.map((contact) => <a className="contact-row reveal" href={contact.href} key={contact.label} target={contact.external ? "_blank" : undefined} rel={contact.external ? "noreferrer" : undefined}><span className="contact-icon"><SvgIcon name={contact.icon} /></span><div><small>{contact.label}</small><strong>{contact.value}</strong></div><b><SvgIcon name={contact.external ? "arrow-up-right" : "arrow-right"} /></b></a>)}
      </div>
    </section>
    <section className="contact-image"><Image src="/images/IMG_0971.webp" alt="Recepción y sala de espera del Hotel Bermudas" width={1800} height={1350} sizes="100vw" unoptimized/><div><p className="eyebrow light">Atención personalizada</p><h2>Te esperamos en Mar del Plata.</h2></div></section>
  </main><Footer/><WhatsAppButton/></>;
}
