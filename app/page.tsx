import Link from "next/link";
import Image from "next/image";
import { Footer, Header, Icon, WhatsAppButton } from "@/components/site-shell";

const services = [
  ["wifi", "Wi-Fi en habitaciones", "Conectividad en todos los espacios"],
  ["coffee", "Desayuno incluido", "Para comenzar el día con energía"],
  ["snow", "Climatización", "Aire acondicionado frío/calor"],
  ["safe", "Caja de seguridad", "Más tranquilidad durante tu estadía"],
] as const;

const reviews = [
  {
    text: "Excelente atención, mucha amabilidad y un desayuno completo. Las habitaciones son cómodas y todo se encuentra muy limpio.",
    author: "Cristina Moreno",
  },
  {
    text: "Muy cómodo, con una ubicación excelente y anfitriones que te hacen sentir como en casa. Volvería sin dudarlo.",
    author: "María Alemán",
  },
  {
    text: "La atención fue excelente desde el primer contacto. Se nota el valor humano de todo el equipo.",
    author: "Huésped verificado",
  },
];

export default function Home() {
  return (
    <>
      <Header overlay />
      <main id="contenido">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src="/images/IMG_0947.webp"
            alt="Fachada del Hotel Bermudas en La Perla, Mar del Plata"
            width={1800}
            height={1350}
            sizes="100vw"
            priority
            unoptimized
          />
          <div className="hero-shade" />
          <div className="hero-content container">
            <p className="eyebrow light">La Perla · Mar del Plata</p>
            <h1 id="hero-title">Tu lugar<br />a pasos del mar</h1>
            <p className="hero-copy">
              Descansá en habitaciones renovadas, cerca de todo y con la calidez de sentirte como en casa.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="https://wa.me/542236076020?text=Hola%20Hotel%20Bermudas%2C%20quisiera%20consultar%20disponibilidad" target="_blank" rel="noreferrer">
                Consultar disponibilidad <span aria-hidden="true">↗</span>
              </a>
              <Link className="text-link light-link" href="/habitaciones">Conocer habitaciones <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="hero-facts" aria-label="Información destacada">
            <div><strong>100 m</strong><span>del mar</span></div>
            <div><strong>300 m</strong><span>de la peatonal</span></div>
            <div><strong>20</strong><span>habitaciones</span></div>
          </div>
          <a className="scroll-cue" href="#bienvenidos" aria-label="Ir a la siguiente sección"><span /></a>
        </section>

        <section id="bienvenidos" className="intro section container reveal">
          <div className="section-number">01</div>
          <div className="intro-heading">
            <p className="eyebrow">Bienvenidos</p>
            <h2>Mar del Plata se disfruta mejor desde La Perla.</h2>
          </div>
          <div className="intro-copy">
            <p>
              Una ubicación estratégica para vivir la playa, el centro y la gastronomía de la ciudad sin resignar tranquilidad. En Bermudas combinamos comodidad, cercanía y atención personalizada.
            </p>
            <Link className="text-link" href="/ubicacion">Descubrir la ubicación <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="editorial section">
          <div className="editorial-grid container">
            <div className="editorial-image editorial-large reveal">
              <Image src="/images/IMG_0930.webp" alt="Habitación matrimonial renovada del Hotel Bermudas" width={1800} height={1350} sizes="(max-width: 720px) 100vw, 58vw" unoptimized />
              <span className="image-tag">Confort renovado</span>
            </div>
            <div className="editorial-content reveal">
              <p className="eyebrow">Habitaciones</p>
              <h2>Un descanso simple, cómodo y cuidado.</h2>
              <p>Habitaciones dobles, triples y cuádruples pensadas para parejas, familias y grupos. Todas cuentan con baño privado renovado y las comodidades necesarias para disfrutar la estadía.</p>
              <ul className="feature-list">
                <li>Sommiers confortables</li>
                <li>TV HD y Wi-Fi</li>
                <li>Aire acondicionado</li>
                <li>Caja de seguridad</li>
              </ul>
              <Link className="button button-dark" href="/habitaciones">Ver habitaciones</Link>
            </div>
            <div className="editorial-image editorial-small reveal">
              <Image src="/images/IMG_0937.webp" alt="Baño privado moderno de una habitación" width={1800} height={1350} sizes="(max-width: 720px) 100vw, 34vw" unoptimized />
            </div>
          </div>
        </section>

        <section className="services-preview section container">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">Todo lo esencial</p>
              <h2>Servicios para disfrutar sin preocupaciones.</h2>
            </div>
            <Link className="text-link desktop-link" href="/servicios">Todos los servicios <span aria-hidden="true">→</span></Link>
          </div>
          <div className="service-grid">
            {services.map(([icon, title, copy], index) => (
              <article className="service-card reveal" key={title} style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}>
                <Icon name={icon} />
                <span className="card-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="location-banner">
          <Image src="/images/mar-del-plata.webp" alt="Costa de Mar del Plata cerca del Hotel Bermudas" width={1000} height={750} sizes="100vw" unoptimized />
          <div className="location-overlay" />
          <div className="location-content container reveal">
            <p className="eyebrow light">Una ubicación privilegiada</p>
            <h2>Cerca del mar.<br />Cerca de todo.</h2>
            <p>Playa, peatonal, gastronomía y espectáculos a pocos minutos caminando.</p>
            <Link className="button button-outline" href="/ubicacion">Cómo llegar</Link>
          </div>
        </section>

        <section className="reviews section container">
          <div className="reviews-heading reveal">
            <p className="eyebrow">Experiencias reales</p>
            <h2>La mejor parte de Bermudas es cómo te hacemos sentir.</h2>
            <div className="rating"><span>★★★★★</span><p>Valorado por nuestros huéspedes</p></div>
          </div>
          <div className="review-list">
            {reviews.map((review, index) => (
              <figure className="review-card reveal" key={review.author}>
                <span className="quote-mark">“</span>
                <blockquote>{review.text}</blockquote>
                <figcaption><span>0{index + 1}</span>{review.author}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <Image src="/images/IMG_0971.webp" alt="Recepción del Hotel Bermudas" width={1800} height={1350} sizes="100vw" unoptimized />
          <div className="final-cta-overlay" />
          <div className="final-cta-content reveal">
            <Image src="/images/logo-bermudas.webp" alt="" width={130} height={130} unoptimized />
            <p className="eyebrow light">Tu próxima estadía</p>
            <h2>Mar del Plata te espera.</h2>
            <p>Consultanos directamente y accedé a la mejor atención para planificar tu viaje.</p>
            <a className="button button-primary" href="https://wa.me/542236076020?text=Hola%20Hotel%20Bermudas%2C%20quisiera%20consultar%20disponibilidad" target="_blank" rel="noreferrer">Reservar por WhatsApp</a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
