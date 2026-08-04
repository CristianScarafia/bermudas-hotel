import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";

export const metadata: Metadata = {
  title: "Playas cerca del Hotel Bermudas",
  description: "Cómo organizar un día en las playas de La Perla desde Hotel Bermudas, ubicado a 100 metros del mar en Mar del Plata.",
  alternates: { canonical: "/guias/playas-cerca-del-hotel" },
};

export default function NearbyBeachesGuidePage() {
  return <GuideArticle slug="playas-cerca-del-hotel" title="Playas cerca del hotel" eyebrow="A 100 metros del mar" description="Consejos prácticos para organizar una jornada de playa desde La Perla." image="/images/costa-la-perla-mar-del-plata.webp" imageAlt="Playa y costa de Mar del Plata cerca del Hotel Bermudas" intro="Estar a 100 metros del mar cambia la logística del día: podés ir temprano, volver al hotel cuando lo necesites y elegir cuánto tiempo pasar en la playa según el clima. Esta guía ayuda a preparar una salida sencilla, especialmente si viajás en familia." sections={[
    { title: "Elegí el momento del día", paragraphs: ["Las condiciones de viento, temperatura y radiación pueden variar. Revisá el pronóstico y organizá la salida en el horario más cómodo para tu grupo.", "La cercanía permite evitar una jornada demasiado larga: podés dividir el tiempo de playa y regresar al hotel para descansar." ] },
    { title: "Prepará solamente lo necesario", paragraphs: ["Protector solar, agua, gorro, abrigo liviano y una bolsa para residuos suelen resolver lo esencial. Si viajás con menores, sumá una muda seca y acordá un punto de encuentro visible."], tips: ["Respetá siempre las indicaciones de los guardavidas.", "Prestá atención al estado del mar y a las banderas.", "Usá los accesos habilitados y cuidá el entorno."] },
    { title: "Aprovechá la ubicación del hotel", paragraphs: ["Antes de salir podés consultar en recepción cómo llegar al acceso más conveniente. Al estar cerca, no necesitás trasladar todo el equipaje de playa durante grandes distancias.", "Guardá objetos de valor en la caja de seguridad de la habitación y llevá solo lo imprescindible." ] },
    { title: "Plan alternativo si cambia el clima", paragraphs: ["Si el día no acompaña, combiná una caminata corta por la costa con el centro y la peatonal. Así mantenés el paseo sin depender de permanecer varias horas en la playa." ] },
  ]} />;
}
