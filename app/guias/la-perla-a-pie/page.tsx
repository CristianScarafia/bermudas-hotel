import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";

export const metadata: Metadata = {
  title: "La Perla a pie: guía para recorrer el barrio",
  description: "Una guía flexible para recorrer La Perla a pie desde Hotel Bermudas y combinar costa, barrio y centro de Mar del Plata.",
  alternates: { canonical: "/guias/la-perla-a-pie" },
};

export default function LaPerlaWalkingGuidePage() {
  return <GuideArticle slug="la-perla-a-pie" title="La Perla a pie" eyebrow="Recorrido desde el hotel" description="Una guía flexible para combinar costa, barrio y centro sin depender del auto." image="/images/costa-la-perla-mar-del-plata.webp" imageAlt="Vista de la costa de La Perla para recorrer a pie desde el Hotel Bermudas" intro="La ubicación del Hotel Bermudas permite armar un paseo que empiece junto al mar y continúe hacia el movimiento del centro. La clave no es completar una lista: es adaptar el recorrido al clima, al ritmo del grupo y al tiempo disponible." sections={[
    { title: "Empezá por la costa", paragraphs: ["Desde el hotel, la cercanía con el mar permite comenzar temprano o aprovechar las últimas horas de la tarde. Caminá por el frente costero, observá la playa y elegí el tramo que resulte más cómodo para el grupo.", "Si viajás con menores o personas con movilidad reducida, conviene reconocer primero los accesos y definir un punto simple de regreso."], tips: ["Llevá abrigo liviano incluso en días templados.", "Protegete del sol y mantené agua a mano.", "Evitá dejar pertenencias sin supervisión."] },
    { title: "Recorré el barrio con calma", paragraphs: ["La Perla combina perfil residencial, alojamientos y comercios. Podés alternar el paseo costero con calles interiores para buscar un café, hacer una pausa o simplemente conocer otra cara del barrio.", "Usá el mapa del hotel para orientarte y guardá la dirección 3 de Febrero 2484 como referencia para volver." ] },
    { title: "Conectá con la peatonal y el centro", paragraphs: ["La peatonal está a 300 metros del hotel. Es una continuación natural para quienes quieren sumar comercios, gastronomía y movimiento urbano al recorrido.", "La duración depende de cuántas paradas hagas. Si el clima cambia, podés acortar el circuito y retomarlo otro día." ] },
    { title: "Cerrá el día sin apuro", paragraphs: ["Volver caminando al hotel ayuda a terminar el recorrido de manera simple. En recepción podés consultar recomendaciones según el día, la temporada y el tipo de salida que estés buscando." ] },
  ]} />;
}
