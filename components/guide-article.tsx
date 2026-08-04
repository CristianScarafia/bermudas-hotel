import Image from "next/image";
import Link from "next/link";
import { BookingCta, Breadcrumbs, JsonLd, RelatedLinks } from "@/components/content-sections";
import { Footer, Header, PageHero, WhatsAppButton } from "@/components/site-shell";
import { siteUrl } from "@/lib/hotel-content";

export type GuideSection = {
  title: string;
  paragraphs: string[];
  tips?: string[];
};

export function GuideArticle({
  slug,
  title,
  description,
  eyebrow,
  image,
  imageAlt,
  intro,
  sections,
}: {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: GuideSection[];
}) {
  const url = `${siteUrl}/guias/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: `${siteUrl}${image}`,
    inLanguage: "es-AR",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Hotel Bermudas", url: siteUrl },
    publisher: { "@id": `${siteUrl}/#hotel` },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Guías de Mar del Plata", item: `${siteUrl}/guias` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };
  return <><Header overlay /><main id="contenido">
    <PageHero eyebrow={eyebrow} title={title} copy={description} image={image} alt={imageAlt} />
    <Breadcrumbs items={[{ label: "Guías", href: "/guias" }, { label: title }]} />
    <article className="guide-article section container">
      <header className="guide-lead reveal"><p className="eyebrow">Guía local del Hotel Bermudas</p><p>{intro}</p></header>
      <div className="guide-body">
        {sections.map((section, index) => <section className="guide-section reveal" key={section.title}>
          <span>0{index + 1}</span><div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.tips && <ul>{section.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>}</div>
        </section>)}
      </div>
      <aside className="guide-hotel-card reveal">
        <Image src="/images/fachada-hotel-bermudas-la-perla.webp" alt="Fachada del Hotel Bermudas en el barrio La Perla" width={1800} height={1350} sizes="(max-width: 720px) 100vw, 42vw" unoptimized />
        <div><p className="eyebrow">Tu punto de partida</p><h2>Alojate en La Perla.</h2><p>Hotel Bermudas está en 3 de Febrero 2484, a 100 metros del mar y a 300 metros de la peatonal.</p><Link className="button button-dark" href="/hotel-en-la-perla">Conocer el hotel</Link></div>
      </aside>
    </article>
    <RelatedLinks title="Más ideas para tu viaje" links={[
      { href: "/guias/la-perla-a-pie", eyebrow: "Recorrido", title: "La Perla a pie", copy: "Una forma simple de combinar costa, centro y descansos." },
      { href: "/guias/playas-cerca-del-hotel", eyebrow: "A 100 metros", title: "Playas cercanas", copy: "Cómo organizar una jornada de playa desde el hotel." },
      { href: "/guias/centro-de-mar-del-plata", eyebrow: "Paseo urbano", title: "El centro de Mar del Plata", copy: "Peatonal, gastronomía y clásicos de la ciudad." },
    ].filter((link) => !link.href.endsWith(slug)).map((link) => ({ ...link, event: "view_local_guide" }))} />
    <BookingCta />
    <JsonLd data={articleSchema} /><JsonLd data={breadcrumbSchema} />
  </main><Footer /><WhatsAppButton /></>;
}
