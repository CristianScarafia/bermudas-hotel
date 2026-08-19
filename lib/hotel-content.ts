import type { IconName } from "@/components/icons";

export const siteUrl = "https://bermudashotel.com";
export const whatsappBase = "https://wa.me/542236076020";

export type FaqItem = {
  question: string;
  answer: string;
};

export type Room = {
  slug: "doble" | "triple" | "cuadruple" | "quintuple";
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
      { src: "/images/habitacion-doble-hotel-bermudas-mar-del-plata.webp", alt: "Cama matrimonial de una habitación doble renovada del Hotel Bermudas" },
      { src: "/images/habitacion-doble-dos-camas-hotel-bermudas.webp", alt: "Habitación doble con dos camas individuales en el Hotel Bermudas" },
      { src: "/images/bano-renovado-hotel-bermudas.webp", alt: "Baño privado renovado con ducha de una habitación doble" },
    ],
    faqs: [
      { question: "¿La habitación doble admite más de dos personas?", answer: "Esta categoría está pensada para hasta dos huéspedes. Para grupos más grandes podés consultar las habitaciones triple, cuádruple o quíntuple." },
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
      { src: "/images/habitacion-triple-hotel-bermudas-la-perla.webp", alt: "Habitación triple con cama matrimonial y cama individual en Mar del Plata" },
      { src: "/images/habitacion-triple-otra-vista-hotel-bermudas.webp", alt: "Vista amplia de una habitación triple con climatización y TV" },
      { src: "/images/placard-habitacion-hotel-bermudas.webp", alt: "Placard y espacio de guardado de una habitación triple" },
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
    image: "/images/habitacion-cuadruple-moderna-hotel-bermudas.webp",
    imageAlt: "Habitación cuádruple familiar del Hotel Bermudas en Mar del Plata",
    gallery: [
      { src: "/images/habitacion-cuadruple-moderna-hotel-bermudas.webp", alt: "Habitación cuádruple moderna con cama matrimonial y camas individuales" },
      { src: "/images/habitacion-cuadruple-moderna-otra-vista-hotel-bermudas.webp", alt: "Otra vista de la habitación cuádruple moderna del Hotel Bermudas" },
      { src: "/images/bano-habitacion-cuadruple-moderna-hotel-bermudas.webp", alt: "Baño privado renovado de una habitación cuádruple" },
    ],
    faqs: [
      { question: "¿La habitación cuádruple admite familias?", answer: "Sí. Está pensada para familias o grupos de hasta cuatro huéspedes. Indicá las edades de los menores al consultar para recibir la opción adecuada." },
      ...sharedRoomFaqs,
    ],
  },
  {
    slug: "quintuple",
    name: "Habitación quíntuple en Mar del Plata",
    shortName: "Habitación quíntuple",
    capacity: 5,
    eyebrow: "Para cinco huéspedes",
    description: "Habitación quíntuple en Hotel Bermudas, Mar del Plata, distribuida en dos ambientes y equipada con baño privado, Wi-Fi, TV HD y climatización.",
    intro: "Una alternativa amplia para cinco huéspedes, distribuida en dos ambientes para compartir la estadía con mayor comodidad.",
    idealFor: "Familias numerosas y grupos de hasta cinco personas que prefieren alojarse juntos.",
    bed: "Configuración para cinco huéspedes distribuida en dos ambientes, sujeta a disponibilidad.",
    image: "/images/habitacion-quintuple-hotel-bermudas.webp",
    imageAlt: "Habitación quíntuple de dos ambientes del Hotel Bermudas en Mar del Plata",
    gallery: [
      { src: "/images/habitacion-quintuple-hotel-bermudas.webp", alt: "Primer ambiente de la habitación quíntuple con cama matrimonial e individual" },
      { src: "/images/habitacion-quintuple-segundo-ambiente-hotel-bermudas.webp", alt: "Segundo ambiente con camas individuales de la habitación quíntuple" },
      { src: "/images/bano-habitacion-quintuple-hotel-bermudas.webp", alt: "Baño privado renovado de la habitación quíntuple" },
      { src: "/images/placard-habitacion-quintuple-hotel-bermudas.webp", alt: "Placard y espacio de guardado de la habitación quíntuple" },
    ],
    faqs: [
      { question: "¿Cómo se distribuye la habitación quíntuple?", answer: "La categoría ofrece capacidad para cinco huéspedes distribuida en dos ambientes. La asignación y la configuración exacta se confirman según disponibilidad." },
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
    answer: "El hotel cuenta con habitaciones dobles, triples, cuádruples y quíntuples. Todas tienen baño privado renovado y comodidades para una estadía confortable.",
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
    answer: "Sí. Hay habitaciones para hasta cinco personas y atención específica para familias, grupos y contingentes. Para grupos grandes conviene solicitar una propuesta personalizada.",
  },
];

export function roomBySlug(slug: Room["slug"]) {
  return rooms.find((room) => room.slug === slug)!;
}

export function whatsappFor(message: string) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}
