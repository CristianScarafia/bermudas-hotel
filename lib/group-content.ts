import type { GroupPageContent } from "@/components/group-landing";

export const groupsContent: GroupPageContent = {
  path: "/grupos-y-contingentes", label: "Grupos y contingentes", title: "El viaje es de todos. El alojamiento, bien organizado.",
  intro: "Alojamiento para grupos en La Perla, Mar del Plata. Agencias, delegaciones, encuentros familiares y contingentes: contanos qué están planeando y consultá una propuesta para sus fechas.",
  heading: "Distintas personas. Un punto de encuentro.",
  body: "Organizar una estadía compartida empieza por saber dónde duerme cada uno y qué necesita el grupo. En Bermudas podés consultar distintas combinaciones de habitaciones y centralizar la propuesta con el hotel.",
  details: [
    ["Habitaciones de dos a cinco", "Categorías dobles, triples, cuádruples y quíntuples. Esta última ofrece dos ambientes; la configuración de camas y el conjunto de habitaciones se confirman al cotizar."],
    ["Desayuno para empezar el día", "La estadía incluye desayuno continental. Si necesitan coordinar horarios, comidas o servicios adicionales, incluilo en la consulta para evaluar posibilidades."],
    ["La Perla como base", "El hotel está a una cuadra del mar y a tres del centro peatonal. Contanos la sede o actividad del viaje para evaluar los traslados."],
    ["Llegadas y equipaje", "Ingreso desde las 12:00 y salida hasta las 10:00. Podés dejar los bolsos antes o después. El acceso de un micro y su detención se consultan previamente; no hay estacionamiento propio."],
  ],
  faqs: [
    { question: "¿Cuántas personas puede alojar un grupo?", answer: "La capacidad para un contingente depende de las fechas, las habitaciones disponibles y la distribución de camas. Contanos cuántas personas viajan y revisamos una propuesta para el grupo." },
    { question: "¿Podemos consultar desde una agencia?", answer: "Sí. Indicá la agencia, las fechas o salidas previstas y el tamaño del grupo. Las condiciones comerciales se acuerdan con el hotel para la propuesta correspondiente." },
    { question: "¿Incluyen comidas o traslados?", answer: "La estadía incluye desayuno continental. Otras comidas, traslados o servicios especiales se consultan por separado; no están incluidos automáticamente." },
    { question: "¿Se puede consultar por un viaje de egresados?", answer: "Podés consultar su viabilidad. Necesitamos conocer composición, fechas y coordinación para evaluar si el alojamiento se adapta al grupo y acordar las condiciones con el responsable u operador." },
  ],
};

export const agenciesContent: GroupPageContent = {
  path: "/agencias-de-viajes", label: "Agencias y operadores", title: "Tu próxima salida a Mar del Plata empieza con una buena base.",
  intro: "Información de alojamiento para agencias de viajes, operadores y coordinadores de contingentes. Conocé Hotel Bermudas y consultá una propuesta según fechas, distribución y tipo de viaje.",
  heading: "La información que necesitás para armar la salida.",
  body: "Una propuesta comercial útil permite saber qué se ofrece, para quién y bajo qué condiciones. Compartinos el programa y la distribución estimada para evaluar el alojamiento del contingente o de sus pasajeros.",
  details: [
    ["Una ficha fácil de compartir", "Fotos reales, categorías, capacidades por habitación, ubicación, desayuno y contacto. La ficha del hotel puede imprimirse o guardarse como PDF desde el navegador."],
    ["Cada salida, su cotización", "Indicá fechas, cantidad de pasajeros y preferencias de camas. El hotel evalúa la disponibilidad y detalla total, incluidos y condiciones de la propuesta."],
    ["Condiciones comerciales conversadas", "Consultá modalidades de trabajo, pagos y condiciones para futuras salidas. Tarifas netas, comisiones o bloques de habitaciones requieren un acuerdo específico."],
    ["Organización antes de la llegada", "Confirmá responsables, horario previsto, distribución y necesidades del programa. Así cada parte conoce qué está incluido y qué se coordina por separado."],
  ],
  faqs: [
    { question: "¿Hay una tarifa fija para agencias?", answer: "La propuesta depende de fechas, tamaño y distribución del grupo. Pedí una cotización e indicá si buscás trabajar salidas puntuales o un programa recurrente." },
    { question: "¿Una consulta mantiene habitaciones bloqueadas?", answer: "No. Cualquier reserva de cupo, vigencia de una cotización o plazo de liberación debe quedar acordado con el hotel por escrito." },
    { question: "¿Qué datos agilizan la propuesta?", answer: "Nombre de la agencia, fechas o rango tentativo, cantidad estimada de pasajeros, habitaciones requeridas y necesidades operativas. No hace falta enviar documentos ni una lista de pasajeros para iniciar la consulta." },
  ],
};

export const eventsContent: GroupPageContent = {
  path: "/alojamiento-para-eventos", label: "Congresos, encuentros y deportes", title: "Venís por el encuentro. Quedate para disfrutar la ciudad.",
  intro: "Alojamiento en Mar del Plata para asistentes a congresos, jornadas, torneos y eventos. Consultá una habitación o una propuesta para participantes, delegaciones y acompañantes.",
  heading: "Tu actividad tiene fecha. Organicemos la estadía.",
  body: "Ya sea que vengas a una reunión profesional o acompañes a una delegación, conocer horarios, sede y cantidad de personas ayuda a elegir habitaciones y planificar el viaje.",
  details: [
    ["Contanos a qué encuentro venís", "Indicá el nombre, las fechas y la sede de la actividad. Desde la ubicación del hotel podés evaluar el recorrido y las opciones de traslado con el organizador."],
    ["Solo, en equipo o con acompañantes", "Podés consultar categorías de dos a cinco personas o varias habitaciones. Para equipos y delegaciones, la distribución se revisa junto con el cupo disponible."],
    ["Antes y después de la actividad", "Consultá noches adicionales si querés extender el viaje. El desayuno está incluido y podés dejar equipaje antes del ingreso o después de la salida."],
    ["Alojamiento para participantes", "La propuesta corresponde a la estadía en el hotel. Inscripciones, entradas, sedes y traslados del evento se coordinan con sus organizadores, salvo acuerdo expreso."],
  ],
  faqs: [
    { question: "¿Qué servicios podemos cotizar para los participantes?", answer: "Podés consultar habitaciones con desayuno continental para asistentes y acompañantes. Indicá fechas, sede y cantidad de personas. Otros servicios y acuerdos específicos se detallan en la propuesta del hotel." },
    { question: "¿Puedo consultar por una delegación deportiva?", answer: "Sí. Contanos cantidad de personas, fechas, sede y necesidades de distribución u horarios. El equipo evalúa las posibilidades y los servicios a coordinar." },
    { question: "¿El traslado a la sede está incluido?", answer: "No está incluido automáticamente. Revisá la ubicación y coordiná el traslado con el organizador o consultá opciones antes de reservar." },
  ],
};

export const studentContent: GroupPageContent = {
  path: "/viajes-de-egresados", label: "Viajes educativos y de egresados", title: "Un viaje que se prepara en equipo.",
  intro: "¿Están organizando un viaje educativo o de egresados a Mar del Plata? Contanos cómo se compone el grupo para evaluar la viabilidad y las condiciones de alojamiento en Hotel Bermudas.",
  heading: "Primero, entender qué necesita el grupo.",
  body: "Las necesidades cambian según edades, cantidad de personas, programa y responsables. La consulta permite revisar el encaje del alojamiento antes de avanzar con una propuesta concreta.",
  details: [
    ["Coordinación identificada", "La consulta se realiza con el adulto responsable, institución u operador. Informá cantidades estimadas y edades generales cuando sean necesarias para evaluar la propuesta."],
    ["Habitaciones y convivencia", "Revisamos disponibilidad y distribución. Las condiciones de recepción del grupo, acompañamiento y horarios deben quedar definidas antes de confirmar."],
    ["Qué corresponde al alojamiento", "Habitaciones, desayuno continental y servicios acordados en la cotización. Excursiones, transporte, actividades y organización del viaje no se incluyen automáticamente."],
    ["Una propuesta, si el encaje es adecuado", "Cada solicitud se evalúa según la operación del hotel y las características del grupo. Consultar no implica aceptación ni reserva de plazas."],
  ],
  faqs: [
    { question: "¿Cómo se confirma el alojamiento del grupo?", answer: "Primero se evalúan composición, fechas, coordinación y necesidades. El hotel confirma la posibilidad de recibir al grupo y detalla sus condiciones antes de avanzar con la reserva." },
    { question: "¿El hotel vende un paquete de viaje de egresados?", answer: "La consulta de esta página es por alojamiento. Para la organización integral del viaje, trabajá con el operador correspondiente y verificá su autorización vigente en los canales oficiales." },
    { question: "¿Hace falta enviar datos de los estudiantes para consultar?", answer: "Para empezar alcanzan fechas tentativas, cantidades y características generales. No envíes documentos, datos médicos ni listas nominales de menores en este formulario." },
  ],
};
