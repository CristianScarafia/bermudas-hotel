"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { inquiryMessage, validateInquiry, type Inquiry } from "@/lib/inquiry";
import { whatsappFor } from "@/lib/hotel-content";
import { SvgIcon } from "@/components/icons";
import { useHydrated } from "@/components/use-hydrated";

export function InquiryForm({ mode = "stay", roomCapacity }: { mode?: "stay" | "group"; roomCapacity?: number }) {
  const id = useId();
  const hydrated = useHydrated();
  const formRef = useRef<HTMLFormElement>(null);
  const [input, setInput] = useState<Inquiry>({
    mode,
    arrival: "",
    departure: "",
    flexible: false,
    guests: mode === "group" ? "" : String(roomCapacity ?? 2),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [review, setReview] = useState(false);
  const [copied, setCopied] = useState(false);
  const started = useRef(false);
  const group = input.mode === "group";
  const message = inquiryMessage(input);

  function track(name: string) {
    window.gtag?.("event", name, { page_path: window.location.pathname, inquiry_type: input.mode, cta_location: "inquiry_form" });
  }
  function change(updates: Partial<Inquiry>) {
    setInput((previous) => ({ ...previous, ...updates }));
    setReview(false);
    setCopied(false);
    setErrors({});
    if (!started.current) { started.current = true; track("inquiry_start"); }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateInquiry(input);
    setErrors(next);
    if (Object.keys(next).length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setReview(true);
    track("inquiry_review");
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[data-inquiry-review]")?.focus());
  }
  const error = (name: string) => errors[name] ? <span className="field-error" id={`${id}-${name}-error`}>{errors[name]}</span> : null;
  const describedBy = (name: string) => errors[name] ? `${id}-${name}-error` : undefined;

  return <form ref={formRef} data-ready={hydrated} className={`inquiry-form ${group ? "inquiry-group" : ""}`} onSubmit={submit} noValidate>
    <fieldset className="inquiry-controls" disabled={!hydrated}><legend className="sr-only">Datos de tu consulta</legend>
    <div className="inquiry-heading"><div><p className="section-label">Hablemos de tu viaje</p><h3>{group ? "Una propuesta para tu grupo." : "Tu próxima pausa, acá."}</h3></div><SvgIcon name={group ? "bed" : "whatsapp"} /></div>
    {!roomCapacity && <fieldset className="inquiry-switch"><legend className="sr-only">Tipo de consulta</legend>{([['stay', 'Mi estadía'], ['group', 'Grupo o agencia']] as const).map(([value, label]) => <label key={value}><input type="radio" name={`${id}-mode`} checked={input.mode === value} onChange={() => change({ mode: value, guests: value === "group" ? "" : "2" })} /><span>{label}</span></label>)}</fieldset>}
    <div className="inquiry-fields">
      <label className="field" htmlFor={`${id}-arrival`}>Entrada<input id={`${id}-arrival`} name="arrival" aria-label="Entrada" type="date" value={input.arrival} required={!input.flexible} onChange={e => change({ arrival: e.target.value })} aria-invalid={!!errors.arrival} aria-describedby={describedBy("arrival")} />{error("arrival")}</label>
      <label className="field" htmlFor={`${id}-departure`}>Salida<input id={`${id}-departure`} name="departure" aria-label="Salida" type="date" value={input.departure} required={!input.flexible} onChange={e => change({ departure: e.target.value })} aria-invalid={!!errors.departure} aria-describedby={describedBy("departure")} />{error("departure")}</label>
      <label className="check-field field-wide"><input type="checkbox" checked={input.flexible} onChange={e => change({ flexible: e.target.checked })} />{group ? "Fechas flexibles o todavía por definir" : "Todavía no tengo fechas"}</label>
      <label className="field field-wide" htmlFor={`${id}-guests`}>
        {group ? "Personas estimadas" : "Huéspedes"}
        {group ? (
          <input id={`${id}-guests`} name="guests" type="number" min="1" max="999" inputMode="numeric" placeholder="Ej. 24" value={input.guests} onChange={e => change({ guests: e.target.value })} required aria-invalid={!!errors.guests} aria-describedby={describedBy("guests")} />
        ) : (
          <select id={`${id}-guests`} name="guests" value={input.guests} onChange={e => change({ guests: e.target.value })} aria-invalid={!!errors.guests} aria-describedby={describedBy("guests")}>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} {n === 1 ? "persona" : "personas"}</option>)}
          </select>
        )}
        {error("guests")}
      </label>
    </div>
    {!review && <button className="button button-primary inquiry-submit" type="submit" disabled={!hydrated}>Preparar mi consulta <SvgIcon name="arrow-right" /></button>}
    {review && <div className="inquiry-review" data-inquiry-review tabIndex={-1}>
      <h4>Tu consulta está lista para revisar.</h4><p>Podés editarla al abrir WhatsApp. El equipo confirma disponibilidad y condiciones.</p><pre>{message}</pre>
      <button className="button button-primary inquiry-submit" type="button" onClick={() => { track("click_whatsapp"); window.open(whatsappFor(message), "_blank", "noopener,noreferrer"); }}>Abrir WhatsApp <SvgIcon name="arrow-up-right" /></button>
      <button className="copy-brief" type="button" onClick={async () => { try { await navigator.clipboard.writeText(message); setCopied(true); track("inquiry_copy"); } catch { setCopied(false); } }}>Copiar resumen</button><span role="status">{copied ? "Resumen copiado." : ""}</span>
    </div>}
    </fieldset>
    <p className="inquiry-footnote">Desayuno continental incluido. Disponibilidad y tarifa a confirmar.</p>
    <noscript><p className="small-note">Podés consultar por WhatsApp con el enlace de abajo o llamar al +54 223 607-6020.</p></noscript>
    <a className="inquiry-direct" href={whatsappFor(group ? "Hola Hotel Bermudas. Quiero consultar alojamiento para un grupo." : "Hola Hotel Bermudas. Quiero consultar una estadía.")} target="_blank" rel="noreferrer" data-cta-location="inquiry_fallback">Prefiero escribir directamente</a>
  </form>;
}
