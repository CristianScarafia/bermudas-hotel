import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";

export const metadata: Metadata = {
  title: "Qué hacer en el centro de Mar del Plata",
  description: "Guía para combinar peatonal, gastronomía y paseos del centro de Mar del Plata desde Hotel Bermudas en La Perla.",
  alternates: { canonical: "/guias/centro-de-mar-del-plata" },
};

export default function MarDelPlataCenterGuidePage() {
  return <GuideArticle slug="centro-de-mar-del-plata" title="El centro de Mar del Plata" eyebrow="A pasos de la peatonal" description="Una forma ordenada de combinar paseo urbano, gastronomía y los clásicos del centro." image="/images/fachada-hotel-bermudas-la-perla.webp" imageAlt="Hotel Bermudas cerca del centro y la peatonal de Mar del Plata" intro="Desde Hotel Bermudas podés llegar rápidamente al área central y adaptar el paseo al tiempo que tengas disponible. La peatonal se encuentra a 300 metros, por lo que resulta fácil salir sin una planificación compleja y volver cuando quieras descansar." sections={[
    { title: "Usá la peatonal como eje", paragraphs: ["La peatonal funciona como una referencia sencilla para comenzar el recorrido. Desde allí podés decidir si querés priorizar compras, una pausa gastronómica o continuar hacia otros puntos del centro.", "En temporada alta suele haber más movimiento. Si preferís caminar con tranquilidad, elegí horarios menos concurridos." ] },
    { title: "Combiná actividades cercanas", paragraphs: ["En lugar de cruzar la ciudad varias veces, agrupá las actividades por zona. Podés dedicar una salida al centro y reservar otro momento para la costa u otros barrios.", "Consultá horarios oficiales antes de visitar teatros, espacios culturales o comercios específicos, porque pueden variar durante el año." ] },
    { title: "Elegí dónde comer según tu plan", paragraphs: ["Si vas a continuar caminando, una parada breve puede ser suficiente. Para una comida más larga, conviene elegir el lugar antes y revisar si requiere reserva en fechas de alta demanda.", "El equipo del hotel puede orientarte con opciones de la zona según el tipo de comida que busques." ] },
    { title: "Volvé al hotel caminando", paragraphs: ["La cercanía ayuda a cerrar el paseo sin sumar otro traslado. Conservá la dirección del hotel en el teléfono y, si salís en grupo, acordá un punto de encuentro para el regreso." ] },
  ]} />;
}
