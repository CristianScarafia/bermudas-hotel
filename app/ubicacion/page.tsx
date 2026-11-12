import type { Metadata } from "next";
import { Footer, Header, PageHero, WhatsAppButton } from "@/components/site-shell";
import { ResponsiveImage } from "@/components/responsive-image";
import { SvgIcon } from "@/components/icons";
import { NeighborhoodMap } from "@/components/neighborhood-map";
import { hotel } from "@/lib/hotel-content";
import { formatWalkingMeters, walkingDistances } from "@/lib/walking-distances";

export const metadata: Metadata = { title: "Ubicación en La Perla, Mar del Plata", description: "Ubicá Hotel Bermudas en 3 de Febrero 2484, La Perla. Explorá distancias y recorridos a pie hacia la costa, la peatonal, la Rambla y la terminal.", alternates: { canonical: "/ubicacion" } };

const nearbyPlaces = [
  {
    distance: `${formatWalkingMeters(walkingDistances.beach.meters)} aprox.`,
    walk: "2 min a pie",
    title: "Playa La Perla",
    copy: "El recorrido llega a la costa por Santa Fe. Desde allí, elegí una bajada habilitada para disfrutar la playa.",
    image: "/images/playa-la-perla-mar-del-plata.webp",
    alt: "Playa La Perla en Mar del Plata, con sombrillas de colores junto al mar",
    width: 1800,
    height: 1200,
    sizes: "100vw",
    mapQuery: "Playa La Perla Mar del Plata",
    featured: true,
    photoClass: "nearby-photo-beach",
  },
  {
    distance: `${formatWalkingMeters(walkingDistances.center.meters)} aprox.`,
    walk: "8 min a pie aprox.",
    title: "Peatonal San Martín",
    copy: "El punto de llegada es San Martín y Santiago del Estero. Sumá compras, gastronomía y un paseo por el centro.",
    image: "/images/catedral-peatonal-san-martin-mar-del-plata.webp",
    alt: "Catedral de los Santos Pedro y Cecilia en Plaza San Martín, inicio de la peatonal de Mar del Plata",
    width: 1350,
    height: 2100,
    sizes: "(max-width: 720px) 100vw, 50vw",
    mapQuery: "Peatonal San Martín Mar del Plata",
    featured: false,
    photoClass: "nearby-photo-peatonal",
  },
  {
    distance: `${formatWalkingMeters(walkingDistances.casino.meters)} aprox.`,
    walk: "Paseo por el centro",
    title: "Casino Central",
    copy: "El Casino Central, un clásico del centro de Mar del Plata para sumar a una caminata por la costa.",
    image: "/images/casino-central-mar-del-plata.webp",
    alt: "Casino Central y rambla de Mar del Plata vistos desde el mar",
    width: 1800,
    height: 1350,
    sizes: "(max-width: 720px) 100vw, 50vw",
    mapQuery: "Casino Central Mar del Plata",
    featured: false,
    photoClass: "nearby-photo-casino",
  },
];

export default function LocationPage() {
  return (
    <>
      <Header overlay />
      <main id="contenido" className="location-page">
        <PageHero eyebrow="La Perla · Mar del Plata" title="Una ubicación estratégica" copy="A pasos del mar y muy cerca de los principales atractivos de la ciudad." image="/images/costa-la-perla-mar-del-plata.webp" alt="Costa de La Perla en Mar del Plata" />
        <section className="location-details section container reveal">
          <div>
            <p className="eyebrow">Cómo llegar</p>
            <h2>Todo queda cerca cuando elegís bien dónde alojarte.</h2>
          </div>
          <div>
            <p>Estamos en La Perla, cerca de la costa y del centro. Desde el hotel podés llegar caminando a la peatonal, el Casino, restaurantes y espectáculos. Explorá el mapa para ver las calles y la distancia hasta cada acceso señalado.</p>
            <address className="location-address">
              <strong>Hotel Bermudas</strong>
              <span>3 de Febrero 2484</span>
              <span>Mar del Plata, Buenos Aires</span>
            </address>
            <a className="button button-dark" href="https://maps.google.com/?q=3+de+Febrero+2484+Mar+del+Plata" target="_blank" rel="noreferrer">
              Abrir en Google Maps <SvgIcon name="arrow-up-right" />
            </a>
          </div>
        </section>
        <NeighborhoodMap />
        <section className="section container commercial-facts"><div><p className="section-label">Si venís en auto</p><h2>Primero, dejá los bolsos.</h2></div><div><p>{hotel.parking}</p><p className="small-note">El equipo informa estacionamiento no medido en los alrededores. Revisá la señalización y las condiciones vigentes al llegar.</p><p>{hotel.luggage}</p></div></section>
        <section className="nearby-places" aria-labelledby="nearby-title">
          <div className="container nearby-places-heading reveal">
            <div>
              <p className="eyebrow">Alrededor del hotel</p>
              <h2 id="nearby-title">Mar del Plata, a unos pasos de la puerta.</h2>
            </div>
            <p>Tres postales de la ciudad para que veas lo cerca que queda todo: playa, peatonal y los clásicos del centro.</p>
          </div>
          <div className="container nearby-grid">
            {nearbyPlaces.map((place) => (
              <article className={`nearby-card reveal ${place.featured ? "nearby-card-featured" : ""}`} key={place.title}>
                <ResponsiveImage className={place.photoClass} src={place.image} alt={place.alt} width={place.width} height={place.height} sizes={place.sizes} />
                <div className="nearby-card-shade" />
                <div className="nearby-card-body">
                  <div>
                    <span className="nearby-walk">{place.distance} · {place.walk}</span>
                    <h3>{place.title}</h3>
                    <p>{place.copy}</p>
                  </div>
                  <a className="nearby-map-link" href={`https://maps.google.com/?q=${encodeURIComponent(place.mapQuery)}`} target="_blank" rel="noreferrer" aria-label={`Ver ${place.title} en el mapa`}>
                    <SvgIcon name="arrow-up-right" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="container nearby-credit">Fotos de Wikimedia Commons: Ezarate (playa y catedral) y Fernando Souza (casino y rambla).</p>
        </section>
        <section className="map-section section" aria-labelledby="map-title">
          <div className="container">
            <div className="map-heading reveal">
              <div>
                <p className="eyebrow">Explorá la zona</p>
                <h2 id="map-title">Ubicanos en el mapa.</h2>
              </div>
              <p>Mové el mapa y acercate para conocer el hotel y sus alrededores.</p>
            </div>
            <div className="map-embed reveal">
              <iframe src="https://www.google.com/maps?q=Hotel+Bermudas,+3+de+Febrero+2484,+Mar+del+Plata,+Buenos+Aires,+Argentina&output=embed" title="Mapa interactivo de Hotel Bermudas en Mar del Plata" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              <div className="map-card">
                <span className="map-card-icon"><SvgIcon name="map" /></span>
                <div>
                  <strong>Hotel Bermudas</strong>
                  <small>3 de Febrero 2484 · La Perla</small>
                </div>
                <a href="https://maps.google.com/?q=3+de+Febrero+2484+Mar+del+Plata" target="_blank" rel="noreferrer" aria-label="Abrir ubicación en Google Maps"><SvgIcon name="arrow-up-right" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
