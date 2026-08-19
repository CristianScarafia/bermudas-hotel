import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer, Header, Icon, PageHero, WhatsAppButton } from "@/components/site-shell";
import { SvgIcon } from "@/components/icons";
import { BookingCta, FaqSection } from "@/components/content-sections";
import { generalFaqs, roomAmenities, rooms } from "@/lib/hotel-content";

export const metadata: Metadata = {
  title: "Habitaciones dobles, triples y cuádruples",
  description: "Conocé las habitaciones del Hotel Bermudas en Mar del Plata: dobles, triples y cuádruples, con baño privado, Wi-Fi, TV HD y aire acondicionado.",
  alternates: { canonical: "/habitaciones" },
};

const photos = [
  ["habitacion-doble-hotel-bermudas-mar-del-plata", "Habitación doble matrimonial renovada del Hotel Bermudas"],
  ["habitacion-triple-hotel-bermudas-la-perla", "Habitación triple con cama matrimonial e individual"],
  ["habitacion-cuadruple-familiar-hotel-bermudas", "Habitación cuádruple con cuatro plazas para familias y grupos"],
  ["habitacion-doble-dos-camas-hotel-bermudas", "Habitación doble con dos camas individuales"],
  ["habitacion-triple-otra-vista-hotel-bermudas", "Vista amplia de una habitación triple climatizada"],
  ["habitacion-cuadruple-otra-vista-hotel-bermudas", "Otra vista de una habitación cuádruple familiar"],
  ["bano-renovado-hotel-bermudas", "Baño privado renovado con ducha"],
  ["placard-habitacion-hotel-bermudas", "Placard abierto y espacio de guardado de la habitación"],
] as const;

export default function RoomsPage() {
  return <>
    <Header overlay />
    <main id="contenido">
      <PageHero eyebrow="Descansá a tu manera" title="Habitaciones" copy="Espacios renovados, cómodos y funcionales para parejas, familias y grupos." image="/images/habitacion-triple-otra-vista-hotel-bermudas.webp" alt="Vista amplia de una habitación renovada del Hotel Bermudas en Mar del Plata" />
      <section className="room-intro section container reveal">
        <div><p className="eyebrow">20 habitaciones</p><h2>Todo lo que necesitás para descansar bien.</h2></div>
        <div><p>Podés elegir habitaciones dobles, triples o cuádruples. Todas ofrecen las mismas comodidades y baños totalmente renovados, con una propuesta simple, cálida y confortable.</p><a className="text-link" href="https://wa.me/542236076020?text=Hola%2C%20quisiera%20saber%20qué%20habitación%20tienen%20disponible" target="_blank" rel="noreferrer">Consultar la opción ideal <SvgIcon name="arrow-up-right" /></a></div>
      </section>
      <section className="room-types container" aria-labelledby="room-types-title">
        <div className="section-heading reveal"><div><p className="eyebrow">Elegí tu habitación</p><h2 id="room-types-title">Una opción para cada viaje.</h2></div><p className="section-note">Capacidad máxima orientativa</p></div>
        <div className="room-type-grid">
          {rooms.map((room) => <article className="room-type-card reveal" key={room.slug}>
            <Image src={room.gallery[0].src} alt={room.imageAlt} width={1800} height={1350} sizes="(max-width: 720px) 100vw, 33vw" unoptimized />
            <div><span>Hasta {room.capacity} huéspedes</span><h3>{room.shortName}</h3><p>{room.intro}</p><Link href={`/habitaciones/${room.slug}`} data-analytics-event="view_room">Ver detalles <SvgIcon name="arrow-right" /></Link></div>
          </article>)}
        </div>
      </section>
      <section className="room-features container" aria-label="Comodidades de las habitaciones">
        {roomAmenities.map((amenity) => <div className="room-feature reveal" key={amenity.label}><Icon name={amenity.icon} /><span>{amenity.label}</span></div>)}
      </section>
      <section className="gallery-section section container">
        <div className="section-heading reveal"><div><p className="eyebrow">Galería</p><h2>Conocé cada detalle.</h2></div><p className="section-note">Imágenes reales del hotel</p></div>
        <div className="photo-grid">
          {photos.map(([photo, alt], index) => <figure className={`photo-item photo-${index + 1} reveal`} key={photo}><Image src={`/images/${photo}.webp`} alt={alt} width={1800} height={1350} sizes="(max-width: 720px) 100vw, 58vw" unoptimized /><figcaption>{index === 0 ? "Habitación doble" : index === 1 ? "Habitación triple" : index === 2 ? "Habitación cuádruple" : "Detalles renovados"}</figcaption></figure>)}
        </div>
      </section>
      <FaqSection faqs={[generalFaqs[1], generalFaqs[2], generalFaqs[3], generalFaqs[4], generalFaqs[5]]} title="Preguntas sobre las habitaciones" />
      <BookingCta title="¿Qué habitación necesitás?" copy="Contanos las fechas y cuántas personas viajan. Te ayudamos a encontrar la mejor opción." message="Hola Hotel Bermudas, quisiera consultar una habitación. Mis fechas y cantidad de huéspedes son:" />
    </main>
    <Footer /><WhatsAppButton />
  </>;
}
