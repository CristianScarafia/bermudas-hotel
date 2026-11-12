import assert from "node:assert/strict";
import test from "node:test";
import { validateInquiry, inquiryMessage, safeLinkDestination } from "../lib/inquiry.ts";

const valid = { mode: "stay", arrival: "2030-02-10", departure: "2030-02-13", flexible: false, guests: "2", room: "doble", segment: "", organization: "", notes: "" };

test("rejects impossible dates, past dates and capacity mismatches", () => {
  assert.deepEqual(validateInquiry(valid, "2030-02-01"), {});
  assert.ok(validateInquiry({ ...valid, arrival: "2030-02-30" }, "2030-02-01").arrival);
  assert.ok(validateInquiry({ ...valid, arrival: "2030-01-01" }, "2030-02-01").arrival);
  assert.ok(validateInquiry({ ...valid, departure: valid.arrival }, "2030-02-01").departure);
  assert.ok(validateInquiry({ ...valid, guests: "5" }, "2030-02-01").room);
});

test("allows no dates for flexible groups, but validates partially entered dates", () => {
  const group = { ...valid, mode: "group", segment: "Agencia de viajes", guests: "24", arrival: "", departure: "", flexible: true };
  assert.deepEqual(validateInquiry(group, "2030-02-01"), {});
  assert.ok(validateInquiry({ ...group, arrival: "2030-02-10" }, "2030-02-01").departure);
  assert.match(inquiryMessage(group), /Personas estimadas: 24/);
});

test("analytics destinations remove private inquiry text and contact details", () => {
  assert.equal(safeLinkDestination("https://wa.me/542236076020?text=Nombre%20y%20fechas#private"), "https://wa.me/542236076020");
  assert.equal(safeLinkDestination("mailto:private@example.com?subject=Name"), "mailto:");
  assert.equal(safeLinkDestination("tel:+54123456789"), "tel:");
});
