import type { Metadata } from "next";
import Image from "next/image";
import { Footer, Header, Icon, PageHero, WhatsAppButton } from "@/components/site-shell";
import { SvgIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Habitaciones dobles, triples y cuádruples",
  description: "Conocé las habitaciones del Hotel Bermudas en Mar del Plata: dobles, triples y cuádruples, con baño privado, Wi-Fi, TV HD y aire acondicionado.",
  alternates: { canonical: "/habitaciones" },
};

const photos = [
  ["IMG_0930", "Habitación matrimonial con aire acondicionado"],
  ["IMG_0936", "Habitación doble luminosa del hotel"],
  ["IMG_1560", "Habitación triple para familias y grupos"],
  ["IMG_0927", "Baño privado con equipamiento renovado"],
  ["IMG_0937", "Baño moderno con ducha"],
  ["IMG_0923", "Placard y caja de seguridad en la habitación"],
  ["IMG_0928", "Detalle del baño privado renovado"],
  ["IMG_0931", "Acceso y espacio de guardado de la habitación"],
] as const;

export default function RoomsPage() {
  return <>
    <Header overlay />
    <main id="contenido">
      <PageHero eyebrow="Descansá a tu manera" title="Habitaciones" copy="Espacios renovados, cómodos y funcionales para parejas, familias y grupos." image="/images/IMG_0936.webp" alt="Habitación del Hotel Bermudas en Mar del Plata" />
      <section className="room-intro section container reveal">
        <div><p className="eyebrow">20 habitaciones</p><h2>Todo lo que necesitás para descansar bien.</h2></div>
        <div><p>Podés elegir habitaciones dobles, triples o cuádruples. Todas ofrecen las mismas comodidades y baños totalmente renovados, con una propuesta simple, cálida y confortable.</p><a className="text-link" href="https://wa.me/542236076020?text=Hola%2C%20quisiera%20saber%20qué%20habitación%20tienen%20disponible" target="_blank" rel="noreferrer">Consultar la opción ideal <SvgIcon name="arrow-up-right" /></a></div>
      </section>
      <section className="room-features container" aria-label="Comodidades de las habitaciones">
        {[['bed','Sommiers confortables'],['wifi','Wi-Fi'],['tv','TV HD'],['snow','Aire frío/calor'],['safe','Caja de seguridad'],['bath','Baño privado']].map(([icon,label]) => <div className="room-feature reveal" key={label}><Icon name={icon} /><span>{label}</span></div>)}
      </section>
      <section className="gallery-section section container">
        <div className="section-heading reveal"><div><p className="eyebrow">Galería</p><h2>Conocé cada detalle.</h2></div><p className="section-note">Imágenes reales del hotel</p></div>
        <div className="photo-grid">
          {photos.map(([photo, alt], index) => <figure className={`photo-item photo-${index + 1} reveal`} key={photo}><Image src={`/images/${photo}.webp`} alt={alt} width={1800} height={1350} sizes="(max-width: 720px) 100vw, 58vw" unoptimized /><figcaption>{index < 3 ? `Habitación ${index === 2 ? 'triple' : 'doble'}` : 'Detalles renovados'}</figcaption></figure>)}
        </div>
      </section>
      <section className="compact-cta"><div className="container reveal"><p className="eyebrow light">Atención personalizada</p><h2>¿Qué habitación necesitás?</h2><p>Contanos las fechas y cuántas personas viajan. Te ayudamos a encontrar la mejor opción.</p><a className="button button-primary" href="https://wa.me/542236076020?text=Hola%2C%20quisiera%20consultar%20una%20habitación" target="_blank" rel="noreferrer">Consultar por WhatsApp</a></div></section>
    </main>
    <Footer /><WhatsAppButton />
  </>;
}
