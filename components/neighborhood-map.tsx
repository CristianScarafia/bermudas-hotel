"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SvgIcon, type IconName } from "@/components/icons";
import { useHydrated } from "@/components/use-hydrated";
import { CoastalDivider } from "@/components/coastal-art";
import { formatWalkingMeters, walkingDistances } from "@/lib/walking-distances";
import geography from "@/lib/neighborhood-geography.json";

type LocalPlace = { id: keyof typeof walkingDistances; name: string; shortName: string; label: string; text: string; query: string; icon: IconName; source?: string };

// Real projected OSM coordinates; pins attach to walking accesses, not building centres.
// New landmarks checked against EMTUR and municipal sources on 2026-11-11.
const places: LocalPlace[] = [
  { id: "hotel", name: "Hotel Bermudas", shortName: "Bermudas", label: "Tu punto de partida", text: "3 de Febrero 2484, La Perla. Dejá tus bolsos y empezá a recorrer la ciudad: el ingreso es desde las 12:00 y la salida hasta las 10:00.", query: "Hotel Bermudas 3 de Febrero 2484 Mar del Plata", icon: "bed" },
  { id: "beach", name: "El mar", shortName: "La playa", label: "Costa por Santa Fe", text: "La costa de La Perla para una mañana de playa, una caminata o una pausa frente al mar. El punto señalado es la llegada de Santa Fe a la avenida costera. Para bajar a la arena, elegí un acceso habilitado.", query: "Playa La Perla Mar del Plata", icon: "beach" },
  { id: "rambla", name: "Rambla", shortName: "Rambla", label: "Paseo costero cerca del hotel", text: "El paseo frente al mar cercano al hotel, a unos 200 metros. El recorrido llega al sector costero próximo a Santiago del Estero, para caminar y disfrutar la vista de La Perla.", query: "Paseo costero La Perla Santiago del Estero Mar del Plata", icon: "promenade" },
  { id: "center", name: "La peatonal", shortName: "Peatonal", label: "San Martín y Santiago del Estero", text: "El recorrido llega a San Martín y Santiago del Estero, una de las opciones para sumar un paseo por el centro, compras y una parada para comer al plan del día.", query: "Peatonal San Martín Mar del Plata", icon: "shopping" },
  { id: "cathedral", name: "Catedral", shortName: "Catedral", label: "Arquitectura y ciudad", text: "La Catedral de los Santos Pedro y Cecilia forma parte del patrimonio arquitectónico marplatense. Podés combinar la visita con un paseo por el centro.", query: "Catedral de los Santos Pedro y Cecilia Mar del Plata", icon: "church", source: "https://www.turismomardelplata.gob.ar/ASP/SP/audioguias.htm" },
  { id: "square", name: "Plaza España", shortName: "Plaza España", label: "Una pausa al aire libre", text: "Un espacio de La Perla para sumar al recorrido por el barrio. En la plaza también se encuentra el Museo de Ciencias Naturales Lorenzo Scaglia.", query: "Plaza España Mar del Plata", icon: "park" },
  { id: "museum", name: "Museo Scaglia", shortName: "Museo", label: "Para descubrir en familia", text: "El Museo Municipal de Ciencias Naturales Lorenzo Scaglia está en Plaza España. Consultá su programación y condiciones de visita para incluirlo en tu estadía.", query: "Museo Municipal de Ciencias Naturales Lorenzo Scaglia Mar del Plata", icon: "museum", source: "https://www.mardelplata.gob.ar/cienciasnaturales" },
  { id: "casino", name: "Casino Central", shortName: "Casino", label: "Un clásico de Mar del Plata", text: "El edificio del Casino Central es uno de los clásicos del centro de Mar del Plata. Sumalo a una caminata por la costa y revisá los accesos vigentes antes de salir.", query: "Casino Central Mar del Plata", icon: "landmark" },
  { id: "station", name: "Terminal", shortName: "Terminal", label: "Si llegás en micro o tren", text: "La Estación Terminal Ferroautomotora reúne la llegada de micros de larga distancia y trenes. Consultá el recorrido hasta el hotel para organizar el último tramo del viaje.", query: "Terminal Ferroautomotora María Eva Duarte de Perón Mar del Plata", icon: "train", source: "https://www.turismomardelplata.gob.ar/ASP/SP/como-llegar.htm" },
];

type Camera = { x: number; y: number; span: number };
function fitCamera(points: number[][], zoom: number): Camera {
  const xs = points.map(p => p[0]); const ys = points.map(p => p[1]);
  const span = Math.max(220, Math.min(1000, Math.max(350, (Math.max(...xs) - Math.min(...xs)) * 1.45, (Math.max(...ys) - Math.min(...ys)) * 1.45) / zoom));
  return { x: Math.max(0, Math.min(1000 - span, (Math.max(...xs) + Math.min(...xs) - span) / 2)), y: Math.max(0, Math.min(1000 - span, (Math.max(...ys) + Math.min(...ys) - span) / 2)), span };
}

function mapPins(camera: Camera, width: number, selected: number) {
  const occupied: { x: number; y: number }[] = [];
  const offsets = Array.from({ length: 49 }, (_, i) => [((i % 7) - 3) * 52, (Math.floor(i / 7) - 3) * 52 - 22]).sort((a, b) => Math.hypot(a[0], a[1] + 22) - Math.hypot(b[0], b[1] + 22));
  // Selected point and hotel have priority. Small leader lines keep nearby icons
  // apart without moving their true positions on the map.
  return places.map((point, index) => ({ point, index })).sort((a, b) => (a.index === selected ? -2 : a.index === 0 ? -1 : a.index) - (b.index === selected ? -2 : b.index === 0 ? -1 : b.index)).flatMap(({ point, index }) => {
    const [x, y] = geography.points[point.id];
    const anchorX = (x - camera.x) / camera.span * width;
    const anchorY = (y - camera.y) / camera.span * width;
    if (anchorX < 6 || anchorX > width - 6 || anchorY < 6 || anchorY > width - 6) return [];
    let position = { x: anchorX, y: anchorY - 22 };
    for (const [dx, dy] of offsets) {
      const candidate = { x: Math.max(26, Math.min(width - 26, anchorX + dx)), y: Math.max(38, Math.min(width - 64, anchorY + dy)) };
      if (occupied.every(other => Math.abs(candidate.x - other.x) >= 50 || Math.abs(candidate.y - other.y) >= 50)) { position = candidate; break; }
    }
    occupied.push(position);
    return [{ ...position, anchorX, anchorY, point, index }];
  });
}

export function NeighborhoodMap() {
  const id = useId();
  const hydrated = useHydrated();
  const [selected, setSelected] = useState(0);
  const [perspective, setPerspective] = useState(true);
  const [area, setArea] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(400);
  const surface = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!surface.current) return;
    const observer = new ResizeObserver(entries => setWidth(entries[0].contentRect.width));
    observer.observe(surface.current);
    return () => observer.disconnect();
  }, []);
  const place = places[selected];
  const distance = walkingDistances[place.id].meters;
  const route = place.id === "hotel" ? null : geography.routes[place.id];
  const focus = area ? [[0, 0], [1000, 1000]] : route ? route.points : Object.entries(geography.points).filter(([key]) => key !== "station").map(([, point]) => point);
  const camera = fitCamera(focus, zoom);
  const pins = mapPins(camera, width, selected);
  const connection = route?.points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("") || "";
  const labels: typeof geography.labels = [];
  const labelBoxes: { x: number; y: number; w: number; h: number }[] = [];
  for (const label of [...geography.labels].sort((a, b) => a.priority - b.priority)) {
    const x = (label.x - camera.x) / camera.span * width;
    const y = (label.y - camera.y) / camera.span * width;
    const angle = label.angle * Math.PI / 180;
    const w = Math.abs(Math.cos(angle)) * label.name.length * 5.7 + Math.abs(Math.sin(angle)) * 12;
    const h = Math.abs(Math.sin(angle)) * label.name.length * 5.7 + Math.abs(Math.cos(angle)) * 12;
    if (x - w / 2 < 12 || x + w / 2 > width - 12 || y - h / 2 < 35 || y + h / 2 > width - 55) continue;
    if (pins.some(pin => Math.abs(x - pin.x) < w / 2 + 28 && Math.abs(y - pin.y) < h / 2 + 28)) continue;
    if (labels.some(other => other.name === label.name)) continue;
    if (labelBoxes.some(box => Math.abs(x - box.x) < (w + box.w) / 2 + 10 && Math.abs(y - box.y) < (h + box.h) / 2 + 10)) continue;
    labels.push(label); labelBoxes.push({ x, y, w, h });
    if (labels.length === 12) break;
  }
  const selectPlace = (index: number) => { setSelected(index); setArea(false); setZoom(1); };
  const destination = selected === 0
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.query)}`
    : `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(places[0].query)}&destination=${route!.destination[1]},${route!.destination[0]}&travelmode=walking`;
  return <>
    <CoastalDivider to="lagoon" variant="shore" />
    <section className="neighborhood-section section" data-ready={hydrated} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="neighborhood-heading">
          <div><p className="section-label">Explorá desde Bermudas</p><h2 id={`${id}-title`}>Tu lugar en La Perla.</h2><p className="neighborhood-intro">Del hotel a la costa, el centro o la terminal. Elegí un lugar y seguí su recorrido por las calles del barrio.</p></div>
          <button type="button" disabled={!hydrated} className="map-view-toggle" aria-pressed={perspective} onClick={() => setPerspective(value => !value)}>{perspective ? "Ver desde arriba" : "Ver en perspectiva"}</button>
        </div>
        <div className="neighborhood-layout">
          <div className={`neighborhood-scene ${perspective ? "is-perspective" : ""}`}>
            <div className="neighborhood-surface" ref={surface}>
              <div className="neighborhood-plane" aria-hidden="true">
                <svg className="neighborhood-geography" viewBox={`${camera.x} ${camera.y} ${camera.span} ${camera.span}`}>
                  <image href="/maps/la-perla-base.svg" width="1000" height="1000" />
                  <g className="map-street-labels" fontSize={camera.span / width * 11}>{labels.map(label => <text key={`${label.name}-${label.x}`} x={label.x} y={label.y} textAnchor="middle" transform={`rotate(${label.angle} ${label.x} ${label.y})`}>{label.name}</text>)}</g>
                  {route && <g className="neighborhood-path"><path className="route-halo" d={connection} vectorEffect="non-scaling-stroke" /><path className="route-line" d={connection} vectorEffect="non-scaling-stroke" /></g>}
                </svg>
                <svg className="map-pin-leaders" viewBox={`0 0 ${width} ${width}`}>{pins.map(pin => <g key={pin.point.id}><path d={`M${pin.anchorX} ${pin.anchorY}L${pin.x} ${pin.y}`} /><circle cx={pin.anchorX} cy={pin.anchorY} r="3" /></g>)}</svg>
              </div>
              <div className="neighborhood-markers">{pins.map(({ point, index, x, y }) => <button key={point.id} className={`neighborhood-pin pin-${point.id}`} style={{ left: `${x / width * 100}%`, top: `${y / width * 100}%` }} type="button" disabled={!hydrated} onClick={() => selectPlace(index)} aria-pressed={selected === index} aria-controls={`${id}-detail`} aria-label={`Seleccionar ${point.name}`}><span><SvgIcon name={point.icon} /></span><strong>{point.shortName}</strong></button>)}</div>
            </div>
            <div className="map-tools" role="group" aria-label="Controles del mapa">
              <button type="button" disabled={!hydrated || zoom >= 2} onClick={() => setZoom(value => Math.min(2, value * 1.35))} aria-label="Acercar mapa">+</button>
              <button type="button" disabled={!hydrated || zoom <= .7} onClick={() => setZoom(value => Math.max(.7, value / 1.35))} aria-label="Alejar mapa">−</button>
              <button type="button" disabled={!hydrated} aria-pressed={area} onClick={() => { setArea(true); setZoom(1); }}>Toda la zona</button>
              {route && <button type="button" disabled={!hydrated} onClick={() => { setArea(false); setZoom(1); }}>Ver recorrido</button>}
            </div>
            <span className="map-north" aria-hidden="true">↑ N</span>
            <div className="map-caption"><span className="map-route-key" />{route ? `${place.shortName} · ${formatWalkingMeters(distance)} aprox. a pie` : "La Perla y el centro, desde Bermudas"}</div>
          </div>
          <div className="neighborhood-info">
            <div className="place-picker" role="group" aria-label="Elegí un punto de interés">{places.map((point, index) => <button type="button" disabled={!hydrated} key={point.id} aria-label={point.name} aria-describedby={`${id}-${point.id}-distance`} aria-pressed={selected === index} aria-controls={`${id}-detail`} onClick={() => selectPlace(index)}><SvgIcon name={point.icon} /><span className="place-picker-label"><span>{point.name}</span><small id={`${id}-${point.id}-distance`}>{formatWalkingMeters(walkingDistances[point.id].meters)}{point.id === "hotel" ? " · origen" : " aprox. a pie"}</small></span></button>)}</div>
            <div className="place-detail" id={`${id}-detail`} aria-live="polite">
              <div className="place-detail-heading"><span className="place-detail-icon"><SvgIcon name={place.icon} /></span><div><p className="section-label">{place.label}</p><h3>{place.name}</h3></div></div>
              <p className="place-distance"><strong>{formatWalkingMeters(distance)}</strong><span>{distance === 0 ? "Punto de partida" : "aprox. a pie desde el hotel"}</span></p>
              <p>{place.text}</p>
              {route && <p className="place-route-streets"><b>Por dónde vas</b>{route.streets.join(" → ")}</p>}
              <a className="button button-dark" href={destination} target="_blank" rel="noreferrer" data-cta-location="neighborhood_map">{selected === 0 ? "Abrir ubicación" : "Consultar recorrido"}<SvgIcon name="arrow-up-right" /></a>
              {place.source && <a className="place-source" href={place.source} target="_blank" rel="noreferrer">Información turística del lugar</a>}
            </div>
            <p className="small-note">Mapa local simplificado. Recorridos peatonales y distancias aproximadas hasta el acceso señalado; pueden variar por obras o cruces habilitados. Revisados el 11/11/2026. Cartografía: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a> · <a href="/maps/neighborhood-source.json">Datos del mapa (ODbL)</a> · <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noreferrer">Corregir el mapa</a>.</p>
          </div>
        </div>
      </div>
    </section>
    <CoastalDivider from="lagoon" to="paper" variant="tide" />
  </>;
}
