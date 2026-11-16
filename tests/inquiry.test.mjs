import assert from "node:assert/strict";
import test from "node:test";
import { validateInquiry, inquiryMessage, safeLinkDestination } from "../lib/inquiry.ts";

const valid = { mode: "stay", arrival: "2030-02-10", departure: "2030-02-13", flexible: false, guests: "2" };

test("rejects impossible dates, past dates and invalid guest counts", () => {
  assert.deepEqual(validateInquiry(valid, "2030-02-01"), {});
  assert.ok(validateInquiry({ ...valid, arrival: "2030-02-30" }, "2030-02-01").arrival);
  assert.ok(validateInquiry({ ...valid, arrival: "2030-01-01" }, "2030-02-01").arrival);
  assert.ok(validateInquiry({ ...valid, departure: valid.arrival }, "2030-02-01").departure);
  assert.ok(validateInquiry({ ...valid, guests: "6" }, "2030-02-01").guests);
});

test("allows no dates for flexible groups, but validates partially entered dates", () => {
  const group = { ...valid, mode: "group", guests: "24", arrival: "", departure: "", flexible: true };
  assert.deepEqual(validateInquiry(group, "2030-02-01"), {});
  assert.ok(validateInquiry({ ...group, arrival: "2030-02-10" }, "2030-02-01").departure);
  assert.equal(inquiryMessage(group), [
    "Hola Hotel Bermudas. Quiero consultar alojamiento para un grupo.",
    "Fechas: todavía por definir.",
    "Personas estimadas: 24.",
  ].join("\n"));
});

test("analytics destinations remove private inquiry text and contact details", () => {
  assert.equal(safeLinkDestination("https://wa.me/542236076020?text=Nombre%20y%20fechas#private"), "https://wa.me/542236076020");
  assert.equal(safeLinkDestination("mailto:private@example.com?subject=Name"), "mailto:");
  assert.equal(safeLinkDestination("tel:+54123456789"), "tel:");
});
