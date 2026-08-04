import Link from "next/link";
import Image from "next/image";
import { SvgIcon, type IconName } from "@/components/icons";
import { ResponsiveImage } from "@/components/responsive-image";

const nav = [
  { href: "/habitaciones", label: "Habitaciones" },
  { href: "/servicios", label: "Servicios" },
  { href: "/ubicacion", label: "Ubicación" },
  { href: "/contacto", label: "Contacto" },
];

export function Header({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={`site-header ${overlay ? "header-overlay" : "header-solid"}`}>
      <div className="header-inner container">
        <Link className="brand" href="/" aria-label="Hotel Bermudas, inicio">
          <Image src="/images/logo-bermudas.webp" alt="Hotel Bermudas" width={76} height={76} priority unoptimized />
          <span><strong>Bermudas</strong><small>Hotel · Mar del Plata</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <a className="header-book" href="https://wa.me/542236076020?text=Hola%20Hotel%20Bermudas%2C%20quisiera%20consultar%20disponibilidad" target="_blank" rel="noreferrer">Reservar <SvgIcon name="arrow-up-right" /></a>
        <details className="mobile-menu">
          <summary aria-label="Abrir menú"><span /><span /></summary>
          <nav aria-label="Navegación móvil">
            {nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            <a href="https://wa.me/542236076020?text=Hola%20Hotel%20Bermudas%2C%20quisiera%20consultar%20disponibilidad" target="_blank" rel="noreferrer">Reservar por WhatsApp</a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main container">
        <div className="footer-brand">
          <Image src="/images/logo-bermudas.webp" alt="Hotel Bermudas" width={130} height={130} unoptimized />
          <p>Hospitalidad, comodidad y cercanía para disfrutar Mar del Plata.</p>
        </div>
        <div className="footer-column"><h2>Explorar</h2>{nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div>
        <div className="footer-column"><h2>Contacto</h2><a href="tel:+542236076020">+54 223 607-6020</a><a href="mailto:bermudashotel@hotmail.com">bermudashotel@hotmail.com</a><a href="https://maps.google.com/?q=3+de+Febrero+2484+Mar+del+Plata" target="_blank" rel="noreferrer">3 de Febrero 2484<br />Mar del Plata, Argentina</a></div>
        <div className="footer-column footer-reserve"><h2>Reservas</h2><p>Consultá disponibilidad y obtené atención personalizada.</p><a className="text-link light-link" href="https://wa.me/542236076020" target="_blank" rel="noreferrer">Escribir por WhatsApp <SvgIcon name="arrow-up-right" /></a></div>
      </div>
      <div className="footer-bottom container"><span>© {new Date().getFullYear()} Hotel Bermudas</span><span>Mar del Plata · Buenos Aires</span></div>
    </footer>
  );
}

export function WhatsAppButton() {
  return <a className="whatsapp" href="https://wa.me/542236076020?text=Hola%20Hotel%20Bermudas%2C%20quisiera%20consultar%20disponibilidad" target="_blank" rel="noreferrer" aria-label="Consultar disponibilidad por WhatsApp"><span>WhatsApp</span><b><SvgIcon name="whatsapp" /></b></a>;
}

export function Icon({ name }: { name: IconName }) {
  return <span className={`service-icon icon-${name}`} aria-hidden="true"><SvgIcon name={name} /></span>;
}

export function PageHero({ eyebrow, title, copy, image, alt }: { eyebrow: string; title: string; copy: string; image: string; alt: string }) {
  return (
    <section className="page-hero">
      <ResponsiveImage src={image} alt={alt} width={image.includes("mar-del-plata") ? 1000 : 1800} height={image.includes("mar-del-plata") ? 750 : 1350} sizes="100vw" priority />
      <div className="page-hero-overlay" />
      <div className="page-hero-content container"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div>
    </section>
  );
}
