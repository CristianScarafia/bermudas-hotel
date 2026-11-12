export type Inquiry = {
  mode: "stay" | "group";
  arrival: string;
  departure: string;
  flexible: boolean;
  guests: string;
  room: string;
  segment: string;
  organization: string;
  notes: string;
};

export const groupTypes = ["Agencia de viajes", "Contingente turístico", "Delegación deportiva", "Congreso o evento", "Viaje educativo o de egresados", "Grupo familiar o social"];
export const roomCapacities: Record<string, number> = { doble: 2, triple: 3, cuadruple: 4, quintuple: 5 };
export const roomLabels: Record<string, string> = { doble: "Doble", triple: "Triple", cuadruple: "Cuádruple", quintuple: "Quíntuple" };

function parseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
}

export function localToday(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function validateInquiry(input: Inquiry, today = localToday()): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.flexible || input.arrival || input.departure) {
    if (!parseDate(input.arrival)) errors.arrival = "Elegí una fecha de entrada válida.";
    else if (input.arrival < today) errors.arrival = "La entrada debe ser hoy o una fecha posterior.";
    if (!parseDate(input.departure)) errors.departure = "Elegí una fecha de salida válida.";
    else if (input.arrival && input.departure <= input.arrival) errors.departure = "La salida debe ser posterior a la entrada.";
  }
  const guests = Number(input.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > (input.mode === "stay" ? 5 : 999)) {
    errors.guests = input.mode === "stay" ? "Elegí entre 1 y 5 huéspedes. Para más personas, usá la consulta de grupo." : "Ingresá una cantidad estimada entre 1 y 999 personas.";
  }
  if (input.mode === "stay" && input.room && (!roomCapacities[input.room] || guests > roomCapacities[input.room])) errors.room = "Elegí una categoría con capacidad para todos los huéspedes.";
  if (input.mode === "group" && !groupTypes.includes(input.segment)) errors.segment = "Elegí el tipo de viaje para orientar la propuesta.";
  return errors;
}

function displayDate(value: string) {
  return value.split("-").reverse().join("/");
}

export function inquiryMessage(input: Inquiry) {
  const dates = input.arrival && input.departure
    ? `Entrada: ${displayDate(input.arrival)}. Salida: ${displayDate(input.departure)}.${input.flexible ? " Fechas flexibles." : ""}`
    : "Fechas: todavía por definir.";
  return [
    `Hola Hotel Bermudas. Quiero consultar ${input.mode === "group" ? "alojamiento para un grupo" : "una estadía"}.`,
    dates,
    `${input.mode === "group" ? "Personas estimadas" : "Huéspedes"}: ${input.guests}.`,
    input.mode === "group" ? `Tipo de viaje: ${input.segment}.` : input.room ? `Habitación: ${roomLabels[input.room]}.` : "Quisiera que me orienten sobre la habitación.",
    input.mode === "group" && input.organization.trim() ? `Organización: ${input.organization.trim().slice(0, 120)}.` : "",
    input.notes.trim() ? `Consulta: ${input.notes.trim().slice(0, 500)}` : "",
    "¿Me confirman disponibilidad, precio total, incluidos y condiciones de reserva?",
  ].filter(Boolean).join("\n");
}

export function safeLinkDestination(href: string) {
  try {
    const url = new URL(href, "https://bermudashotel.com");
    if (url.protocol === "tel:") return "tel:";
    if (url.protocol === "mailto:") return "mailto:";
    return `${url.origin}${url.pathname}`;
  } catch { return ""; }
}
