import geography from "@/lib/neighborhood-geography.json";

// Walking lengths to the exact access shown on the local map, rounded to 50 m.
// OSM / FOSSGIS OSRM foot, checked 2026-11-11; no live API dependency.
export const walkingDistances = {
  hotel: { meters: 0 },
  beach: geography.routes.beach,
  center: geography.routes.center,
  cathedral: geography.routes.cathedral,
  square: geography.routes.square,
  museum: geography.routes.museum,
  rambla: geography.routes.rambla,
  casino: geography.routes.casino,
  station: geography.routes.station,
} as const;

export function formatWalkingMeters(meters: number) {
  return `${new Intl.NumberFormat("es-AR", { useGrouping: true }).format(meters)} m`;
}
