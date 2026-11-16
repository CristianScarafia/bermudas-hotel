export type Inquiry = {
  mode: "stay" | "group";
  arrival: string;
  departure: string;
  flexible: boolean;
  guests: string;
};

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
  ].join("\n");
}

export function safeLinkDestination(href: string) {
  try {
    const url = new URL(href, "https://bermudashotel.com");
    if (url.protocol === "tel:") return "tel:";
    if (url.protocol === "mailto:") return "mailto:";
    return `${url.origin}${url.pathname}`;
  } catch { return ""; }
}
