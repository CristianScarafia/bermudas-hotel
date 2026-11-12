"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { rooms } from "@/lib/hotel-content";
import { ResponsiveImage } from "@/components/responsive-image";
import { PhotoGallery } from "@/components/photo-gallery";
import { SvgIcon } from "@/components/icons";
import { useHydrated } from "@/components/use-hydrated";

export function RoomExplorer() {
  const [active, setActive] = useState(0);
  const hydrated = useHydrated();
  const id = useId();
  return <section className="room-explorer section container" aria-labelledby={`${id}-title`}>
    <div className="explorer-heading"><div><p className="section-label">Cada viaje tiene su espacio</p><h2 id={`${id}-title`}>¿Con quién venís?</h2></div><div className="room-picker" aria-label="Elegí cantidad de huéspedes">{rooms.map((room, i) => <button key={room.slug} type="button" disabled={!hydrated} aria-pressed={active === i} aria-controls={`${id}-${room.slug}`} onClick={() => setActive(i)}><strong>{room.capacity}</strong><span>personas</span></button>)}</div></div>
    <div className="explorer-stage">{rooms.map((room, i) => <article key={room.slug} id={`${id}-${room.slug}`} className="explorer-panel" hidden={active !== i}>
      <div className="explorer-photo"><ResponsiveImage src={room.image} alt={room.imageAlt} width={1800} height={1350} sizes="(max-width: 720px) 100vw, 58vw" /><span className="photo-note">Fotografías reales del hotel</span></div>
      <div className="explorer-copy"><span className="capacity-label">Hasta {room.capacity} huéspedes{room.slug === "quintuple" ? " · dos ambientes" : ""}</span><h3>{room.shortName}</h3><p>{room.intro}</p><ul><li>Baño privado renovado</li><li>Wi-Fi y TV HD</li><li>Aire frío/calor</li></ul><Link className="button button-dark" href={`/habitaciones/${room.slug}`} data-cta-location="room_explorer">Conocer esta habitación <SvgIcon name="arrow-right" /></Link><PhotoGallery photos={room.gallery} compact /></div>
    </article>)}</div>
    <div className="explorer-bottom"><p>La configuración de camas se confirma al consultar. Si viajan más personas, armamos una propuesta de grupo.</p><Link className="text-link" href="/grupos-y-contingentes">Consultar por un grupo <SvgIcon name="arrow-right" /></Link></div>
    <noscript><p>Conocé todas las categorías en <a href="/habitaciones">Habitaciones</a>.</p></noscript>
  </section>;
}
