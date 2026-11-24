import type { Metadata } from "next";
import { ResponsiveImage } from "@/components/responsive-image";
import { Footer, Header, Icon, PageHero, WhatsAppButton } from "@/components/site-shell";
import { breakfastItems, hotel } from "@/lib/hotel-content";

export const metadata: Metadata = { title: "Servicios y comodidades", description: "Desayuno, Wi-Fi, TV HD, aire acondicionado, baño privado y caja de seguridad en Hotel Bermudas, Mar del Plata.", alternates: { canonical: "/servicios" } };

const items = [
  ["wifi", "Wi-Fi", "Conexión disponible en las habitaciones y espacios comunes."],
  ["coffee", "Desayuno incluido", "Desayuno buffet con infusiones, yogures, cereales, tostadas y medialunas."],
  ["tv", "TV HD", "Entretenimiento y comodidad dentro de tu habitación."],
  ["bed", "Sommiers", "Descanso confortable después de disfrutar la ciudad."],
  ["bath", "Baño privado", "Baños cómodos, funcionales y totalmente renovados."],
  ["safe", "Caja de seguridad", "Guardá tus pertenencias con mayor tranquilidad."],
  ["snow", "Aire frío/calor", "La temperatura ideal durante todo el año."],
] as const;

export default function ServicesPage() {
  return <><Header overlay /><main id="contenido">
    <PageHero eyebrow="Una estadía más cómoda" title="Servicios" copy="Cuidamos los detalles esenciales para que solamente tengas que disfrutar." image="/images/recepcion-hotel-bermudas-mar-del-plata.webp" alt="Recepción del Hotel Bermudas en Mar del Plata" />
    <section className="services-page section container">
      <div className="services-page-intro reveal"><p className="eyebrow">Comodidades</p><h2>Todo preparado para recibirte.</h2><p>Nuestro equipo y nuestras instalaciones acompañan cada momento de tu estadía, desde el desayuno hasta el descanso.</p></div>
      <div className="services-full-grid">{items.map(([icon,title,copy],index) => <article className="service-full-card reveal" key={title}><span className="card-number">0{index+1}</span><Icon name={icon}/><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="service-story section"><div className="container story-grid"><div className="story-image story-image-collage reveal"><ResponsiveImage className="story-image-main" src="/images/desayuno-buffet-hotel-bermudas.webp" alt="Buffet de desayuno del Hotel Bermudas" width={1800} height={1350} sizes="(max-width: 720px) 100vw, 55vw" /><ResponsiveImage className="story-image-detail" src="/images/desayuno-medialunas-hotel-bermudas.webp" alt="Medialunas y panificados servidos durante el desayuno" width={1800} height={1350} sizes="(max-width: 720px) 45vw, 20vw" /></div><div className="story-content reveal"><p className="eyebrow">Cada mañana</p><h2>Empezá el día rico y sin apuro.</h2><p>El desayuno acompaña cada estadía con una propuesta completa para cargar energía antes de salir a disfrutar Mar del Plata.</p><a className="button button-dark" href="https://wa.me/542236076020" target="_blank" rel="noreferrer">Consultar disponibilidad</a></div></div></section>
    <section className="commercial-facts section container"><div><p className="section-label">Incluido en tu estadía</p><h2>Tu desayuno buffet.</h2></div><div><ul>{breakfastItems.map(item => <li key={item}>{item}</li>)}</ul><p>{hotel.luggage}</p><p className="small-note">Check-in desde las {hotel.checkIn} · Check-out hasta las {hotel.checkOut}.</p></div></section>
  </main><Footer/><WhatsAppButton/></>;
}
