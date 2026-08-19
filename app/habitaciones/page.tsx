import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer, Header, Icon, PageHero, WhatsAppButton } from "@/components/site-shell";
import { SvgIcon } from "@/components/icons";
import { BookingCta, FaqSection } from "@/components/content-sections";
import { generalFaqs, roomAmenities, rooms } from "@/lib/hotel-content";

export const metadata: Metadata = {
  title: "Habitaciones dobles, triples, cuádruples y quíntuples",
  description: "Conocé las habitaciones del Hotel Bermudas en Mar del Plata: dobles, triples, cuádruples y quíntuples, con baño privado, Wi-Fi, TV HD y aire acondicionado.",
  alternates: { canonical: "/habitaciones" },
};

const photos = [
  ["habitacion-doble-hotel-bermudas-mar-del-plata", "Habitación doble matrimonial renovada del Hotel Bermudas", "Habitación doble"],
  ["habitacion-triple-hotel-bermudas-la-perla", "Habitación triple con cama matrimonial e individual", "Habitación triple"],
  ["habitacion-cuadruple-moderna-hotel-bermudas", "Habitación cuádruple moderna para familias y grupos", "Habitación cuádruple"],
  ["habitacion-quintuple-hotel-bermudas", "Primer ambiente de la habitación quíntuple del Hotel Bermudas", "Habitación quíntuple"],
  ["habitacion-quintuple-segundo-ambiente-hotel-bermudas", "Segundo ambiente de la habitación quíntuple", "Segundo ambiente"],
  ["habitacion-cuadruple-moderna-otra-vista-hotel-bermudas", "Otra vista de la habitación cuádruple moderna", "Habitación cuádruple"],
  ["bano-habitacion-cuadruple-moderna-hotel-bermudas", "Baño privado renovado de una habitación cuádruple", "Baño privado"],
  ["bano-habitacion-quintuple-hotel-bermudas", "Baño privado renovado de la habitación quíntuple", "Baño privado"],
  ["placard-habitacion-quintuple-hotel-bermudas", "Placard y espacio de guardado de la habitación quíntuple", "Placard"],
] as const;

export default function RoomsPage() {
  return <>
    <Header overlay />
    <main id="contenido">
      <PageHero eyebrow="Descansá a tu manera" title="Habitaciones" copy="Espacios renovados para parejas, familias y grupos de hasta cinco huéspedes." image="/images/habitacion-quintuple-hotel-bermudas.webp" alt="Habitación quíntuple renovada del Hotel Bermudas en Mar del Plata" />
      <section className="room-intro section container reveal">
        <div><p className="eyebrow">20 habitaciones</p><h2>Todo lo que necesitás para descansar bien.</h2></div>
        <div><p>Podés elegir habitaciones dobles, triples, cuádruples o quíntuples. Todas ofrecen las mismas comodidades y baños totalmente renovados, con una propuesta simple, cálida y confortable.</p><a className="text-link" href="https://wa.me/542236076020?text=Hola%2C%20quisiera%20saber%20qué%20habitación%20tienen%20disponible" target="_blank" rel="noreferrer">Consultar la opción ideal <SvgIcon name="arrow-up-right" /></a></div>
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
          {photos.map(([photo, alt, caption], index) => <figure className={`photo-item photo-${index + 1} reveal`} key={photo}><Image src={`/images/${photo}.webp`} alt={alt} width={1800} height={1350} sizes="(max-width: 720px) 100vw, 58vw" unoptimized /><figcaption>{caption}</figcaption></figure>)}
        </div>
      </section>
      <FaqSection faqs={[generalFaqs[1], generalFaqs[2], generalFaqs[3], generalFaqs[4], generalFaqs[5]]} title="Preguntas sobre las habitaciones" />
      <BookingCta title="¿Qué habitación necesitás?" copy="Contanos las fechas y cuántas personas viajan. Te ayudamos a encontrar la mejor opción." message="Hola Hotel Bermudas, quisiera consultar una habitación. Mis fechas y cantidad de huéspedes son:" />
    </main>
    <Footer /><WhatsAppButton />
  </>;
}
