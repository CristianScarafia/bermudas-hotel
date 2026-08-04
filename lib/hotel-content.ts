import type { IconName } from "@/components/icons";

export const siteUrl = "https://bermudashotel.com";
export const whatsappBase = "https://wa.me/542236076020";

export type FaqItem = {
  question: string;
  answer: string;
};

export type Room = {
  slug: "doble" | "triple" | "cuadruple";
  name: string;
  shortName: string;
  capacity: number;
  eyebrow: string;
  description: string;
  intro: string;
  idealFor: string;
  bed: string;
  image: string;
  imageAlt: string;
  gallery: Array<{ src: string; alt: string }>;
  faqs: FaqItem[];
};

const sharedRoomFaqs: FaqItem[] = [
  {
    question: "¿La habitación tiene baño privado?",
    answer: "Sí. Todas las habitaciones del Hotel Bermudas cuentan con baño privado renovado.",
  },
  {
    question: "¿Qué servicios están incluidos en la habitación?",
    answer: "La habitación incluye Wi-Fi, TV HD, aire acondicionado frío/calor, sommier, caja de seguridad y baño privado. El hotel también ofrece desayuno.",
  },
  {
    question: "¿Cómo consulto disponibilidad y tarifa?",
    answer: "Podés escribirnos por WhatsApp indicando fecha de entrada, fecha de salida y cantidad de huéspedes. El equipo confirma la opción y la tarifa disponible para esas fechas.",
  },
];

export const rooms: Room[] = [
  {
    slug: "doble",
    name: "Habitación doble en Mar del Plata",
    shortName: "Habitación doble",
    capacity: 2,
    eyebrow: "Para dos huéspedes",
    description: "Habitación doble renovada en La Perla, Mar del Plata, con baño privado, Wi-Fi, TV HD, aire acondicionado y desayuno.",
    intro: "Un espacio cómodo y funcional para dos personas, pensado para descansar cerca del mar y recorrer Mar del Plata caminando.",
    idealFor: "Parejas, amigos o dos personas que buscan una estadía práctica en La Perla.",
    bed: "Configuración para dos huéspedes, sujeta a disponibilidad al momento de reservar.",
    image: "/images/habitacion-doble-hotel-bermudas-mar-del-plata.webp",
    imageAlt: "Habitación doble renovada del Hotel Bermudas en Mar del Plata",
    gallery: [
      { src: "/images/IMG_0930.webp", alt: "Cama matrimonial y aire acondicionado en una habitación doble del Hotel Bermudas" },
      { src: "/images/IMG_0923.webp", alt: "Placard con caja de seguridad de una habitación del Hotel Bermudas" },
      { src: "/images/IMG_0937.webp", alt: "Baño privado renovado de una habitación doble del Hotel Bermudas" },
    ],
    faqs: [
      { question: "¿La habitación doble admite más de dos personas?", answer: "Esta categoría está pensada para hasta dos huéspedes. Para tres o cuatro personas podés consultar las habitaciones triple o cuádruple." },
      ...sharedRoomFaqs,
    ],
  },
  {
    slug: "triple",
    name: "Habitación triple en La Perla",
    shortName: "Habitación triple",
    capacity: 3,
    eyebrow: "Para tres huéspedes",
    description: "Habitación triple en Hotel Bermudas, La Perla, para hasta tres huéspedes, con baño privado renovado, Wi-Fi, TV HD y climatización.",
    intro: "Una alternativa amplia para tres personas, con el equipamiento esencial para combinar descanso, playa y paseos por el centro.",
    idealFor: "Familias pequeñas, parejas con un menor o grupos de tres personas.",
    bed: "Configuración para tres huéspedes, sujeta a disponibilidad al momento de reservar.",
    image: "/images/habitacion-triple-hotel-bermudas-la-perla.webp",
    imageAlt: "Habitación triple con cama matrimonial e individual en Hotel Bermudas, La Perla",
    gallery: [
      { src: "/images/IMG_0936.webp", alt: "Habitación triple con cama matrimonial y cama individual en Mar del Plata" },
      { src: "/images/IMG_0931.webp", alt: "Espacio de guardado y TV HD en una habitación triple del hotel" },
      { src: "/images/IMG_0933.webp", alt: "Baño privado renovado con ducha de una habitación triple" },
    ],
    faqs: [
      { question: "¿La habitación triple es adecuada para una familia?", answer: "Sí. Es una opción habitual para dos adultos y un menor o para tres huéspedes. Contanos cómo se compone el grupo para recomendarte la alternativa disponible." },
      ...sharedRoomFaqs,
    ],
  },
  {
    slug: "cuadruple",
    name: "Habitación cuádruple familiar",
    shortName: "Habitación cuádruple",
    capacity: 4,
    eyebrow: "Para cuatro huéspedes",
    description: "Habitación cuádruple familiar en Mar del Plata para hasta cuatro huéspedes, cerca de Playa La Perla, con baño privado y desayuno.",
    intro: "Más lugar para compartir la estadía sin resignar comodidad, a pocos pasos de la playa y cerca de la peatonal.",
    idealFor: "Familias y grupos de hasta cuatro personas que prefieren alojarse juntos.",
    bed: "Configuración para cuatro huéspedes, sujeta a disponibilidad al momento de reservar.",
    image: "/images/habitacion-cuadruple-familiar-hotel-bermudas.webp",
    imageAlt: "Habitación cuádruple familiar del Hotel Bermudas en Mar del Plata",
    gallery: [
      { src: "/images/IMG_1560.webp", alt: "Habitación cuádruple con camas para una familia en Hotel Bermudas" },
      { src: "/images/IMG_0923.webp", alt: "Placard y caja de seguridad disponibles en la habitación cuádruple" },
      { src: "/images/IMG_1563.webp", alt: "Baño privado renovado de una habitación familiar del hotel" },
    ],
    faqs: [
      { question: "¿La habitación cuádruple admite familias?", answer: "Sí. Está pensada para familias o grupos de hasta cuatro huéspedes. Indicá las edades de los menores al consultar para recibir la opción adecuada." },
      ...sharedRoomFaqs,
    ],
  },
];

export const roomAmenities: Array<{ icon: IconName; label: string }> = [
  { icon: "bed", label: "Sommiers confortables" },
  { icon: "wifi", label: "Wi-Fi" },
  { icon: "tv", label: "TV HD" },
  { icon: "snow", label: "Aire frío/calor" },
  { icon: "safe", label: "Caja de seguridad" },
  { icon: "bath", label: "Baño privado" },
];

export const generalFaqs: FaqItem[] = [
  {
    question: "¿Dónde está ubicado el Hotel Bermudas?",
    answer: "Está en 3 de Febrero 2484, en el barrio La Perla de Mar del Plata, a 100 metros del mar y a 300 metros de la peatonal.",
  },
  {
    question: "¿Qué tipos de habitaciones ofrece el hotel?",
    answer: "El hotel cuenta con habitaciones dobles, triples y cuádruples. Todas tienen baño privado renovado y comodidades para una estadía confortable.",
  },
  {
    question: "¿El desayuno está incluido?",
    answer: "El hotel ofrece desayuno. Al consultar tu estadía, el equipo confirma el detalle incluido en la tarifa disponible.",
  },
  {
    question: "¿Cómo puedo reservar?",
    answer: "Podés consultar directamente por WhatsApp o teléfono. Indicá fechas, cantidad de adultos, edades de los menores y número de habitaciones para recibir una respuesta más rápida.",
  },
  {
    question: "¿Qué medios de pago aceptan?",
    answer: "Los medios de pago y las condiciones vigentes se informan junto con la cotización, antes de confirmar la reserva. Consultalos directamente para tus fechas.",
  },
  {
    question: "¿Cuál es la política de cancelación?",
    answer: "Las condiciones de cancelación pueden variar según la fecha y la modalidad de reserva. El hotel las informa por escrito antes de que confirmes.",
  },
  {
    question: "¿Cuáles son los horarios de ingreso y salida?",
    answer: "Los horarios operativos se confirman junto con la reserva. Si necesitás llegar temprano o salir más tarde, consultá previamente para evaluar disponibilidad.",
  },
  {
    question: "¿Reciben familias y grupos?",
    answer: "Sí. Hay habitaciones para hasta cuatro personas y atención específica para familias, grupos y contingentes. Para grupos grandes conviene solicitar una propuesta personalizada.",
  },
];

export function roomBySlug(slug: Room["slug"]) {
  return rooms.find((room) => room.slug === slug)!;
}

export function whatsappFor(message: string) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}
