import type { Metadata } from "next";
import { Footer, Header, PageHero, WhatsAppButton } from "@/components/site-shell";

export const metadata: Metadata = { title: "Ubicación en La Perla, Mar del Plata", description: "Hotel Bermudas está en 3 de Febrero 2484, La Perla, a 100 metros del mar y 300 metros de la peatonal de Mar del Plata.", alternates: { canonical: "/ubicacion" } };

export default function LocationPage() {
  return <><Header overlay/><main id="contenido">
    <PageHero eyebrow="La Perla · Mar del Plata" title="Una ubicación estratégica" copy="A pasos del mar y muy cerca de los principales atractivos de la ciudad." image="/images/mar-del-plata.webp" alt="Costa de Mar del Plata" />
    <section className="location-details section container reveal"><div><p className="eyebrow">Cómo llegar</p><h2>Todo queda cerca cuando elegís bien dónde alojarte.</h2></div><div><p>Nos encontramos en un sector tranquilo y familiar de La Perla, a 100 metros de la playa y a 300 metros de la peatonal. Desde el hotel podés llegar caminando al centro, el Casino, restaurantes y espectáculos.</p><address><strong>Hotel Bermudas</strong><br/>3 de Febrero 2484<br/>Mar del Plata, Buenos Aires</address><a className="button button-dark" href="https://maps.google.com/?q=3+de+Febrero+2484+Mar+del+Plata" target="_blank" rel="noreferrer">Abrir en Google Maps ↗</a></div></section>
    <section className="distance-grid container"><article><strong>01</strong><span>100 metros</span><h3>Playa La Perla</h3><p>Disfrutá el mar a pocos pasos del hotel.</p></article><article><strong>02</strong><span>300 metros</span><h3>Peatonal San Martín</h3><p>Compras, gastronomía y movimiento de la ciudad.</p></article><article><strong>03</strong><span>A minutos</span><h3>Casino y centro</h3><p>Los clásicos de Mar del Plata muy cerca.</p></article></section>
    <section className="map-section section"><div className="container"><div className="map-placeholder"><div><span className="map-pin">⌖</span><p>3 de Febrero 2484</p><small>La Perla · Mar del Plata</small><a href="https://maps.google.com/?q=3+de+Febrero+2484+Mar+del+Plata" target="_blank" rel="noreferrer">Ver recorrido ↗</a></div></div></div></section>
  </main><Footer/><WhatsAppButton/></>;
}
