import Image from "next/image";
import { BookingCta, Breadcrumbs, FaqSection, JsonLd, RelatedLinks } from "@/components/content-sections";
import { Footer, Header, Icon, PageHero, WhatsAppButton } from "@/components/site-shell";
import { roomAmenities, rooms, siteUrl, type Room } from "@/lib/hotel-content";

export function RoomDetail({ room }: { room: Room }) {
  const path = `/habitaciones/${room.slug}`;
  const roomSchema = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "@id": `${siteUrl}${path}#habitacion`,
    name: room.shortName,
    url: `${siteUrl}${path}`,
    description: room.description,
    image: `${siteUrl}${room.image}`,
    occupancy: { "@type": "QuantitativeValue", maxValue: room.capacity },
    containedInPlace: { "@id": `${siteUrl}/#hotel` },
    amenityFeature: roomAmenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.label,
      value: true,
    })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: room.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Habitaciones", item: `${siteUrl}/habitaciones` },
      { "@type": "ListItem", position: 3, name: room.shortName, item: `${siteUrl}${path}` },
    ],
  };
  const otherRooms = rooms.filter((candidate) => candidate.slug !== room.slug);

  return (
    <>
      <Header overlay />
      <main id="contenido">
        <PageHero eyebrow={room.eyebrow} title={room.shortName} copy={room.intro} image={room.image} alt={room.imageAlt} />
        <Breadcrumbs items={[{ label: "Habitaciones", href: "/habitaciones" }, { label: room.shortName }]} />

        <section className="room-detail-intro section container">
          <div className="reveal"><p className="eyebrow">Hasta {room.capacity} huéspedes</p><h2>Comodidad para disfrutar Mar del Plata.</h2></div>
          <div className="room-detail-copy reveal">
            <p>{room.intro}</p>
            <dl>
              <div><dt>Ideal para</dt><dd>{room.idealFor}</dd></div>
              <div><dt>Capacidad</dt><dd>Hasta {room.capacity} huéspedes</dd></div>
              <div><dt>Configuración</dt><dd>{room.bed}</dd></div>
            </dl>
          </div>
        </section>

        <section className="room-features container" aria-label={`Servicios de la ${room.shortName.toLowerCase()}`}>
          {roomAmenities.map((amenity) => <div className="room-feature reveal" key={amenity.label}><Icon name={amenity.icon} /><span>{amenity.label}</span></div>)}
        </section>

        <section className="room-gallery section container" aria-labelledby="gallery-title">
          <div className="section-heading reveal"><div><p className="eyebrow">Imágenes reales</p><h2 id="gallery-title">Conocé la habitación.</h2></div></div>
          <div className="room-gallery-grid">
            {room.gallery.map((photo, index) => (
              <figure className={`reveal gallery-${index + 1}`} key={photo.src}>
                <Image src={photo.src} alt={photo.alt} width={1800} height={1350} sizes={index === 0 ? "(max-width: 720px) 100vw, 65vw" : "(max-width: 720px) 100vw, 35vw"} unoptimized />
              </figure>
            ))}
          </div>
          <p className="room-gallery-note">Las fotografías muestran habitaciones e instalaciones reales. La distribución y los detalles pueden variar según la unidad asignada.</p>
        </section>

        <FaqSection faqs={room.faqs} title={`Preguntas sobre la ${room.shortName.toLowerCase()}`} />
        <RelatedLinks
          title="Compará otras habitaciones"
          links={otherRooms.map((candidate) => ({
            href: `/habitaciones/${candidate.slug}`,
            eyebrow: `Hasta ${candidate.capacity} huéspedes`,
            title: candidate.shortName,
            copy: candidate.intro,
            event: "view_room",
          })).concat([{ href: "/informacion-del-huesped", eyebrow: "Antes de viajar", title: "Información del huésped", copy: "Reservas, horarios, pagos y condiciones explicados con claridad.", event: "view_guest_information" }])}
        />
        <BookingCta message={`Hola Hotel Bermudas, quisiera consultar disponibilidad para una ${room.shortName.toLowerCase()}. Mis fechas son:`} />
        <JsonLd data={roomSchema} />
        <JsonLd data={faqSchema} />
        <JsonLd data={breadcrumbSchema} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
