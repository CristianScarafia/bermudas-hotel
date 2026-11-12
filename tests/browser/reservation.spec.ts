import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager\.com|google-analytics\.com/, route => route.abort());
  await page.addInitScript(() => {
    window.open = (url) => { document.body.dataset.openedUrl = String(url); return null; };
  });
});

function futureDate(days: number) { return new Date(Date.now() + days * 86400000).toISOString().slice(0, 10); }

test("validates dates, preserves the brief and opens a contextual WhatsApp inquiry", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/contacto", { waitUntil: "domcontentloaded" });
  const form = page.locator(".inquiry-form");
  await form.getByRole("button", { name: "Preparar mi consulta" }).click();
  await expect(form.getByText("Elegí una fecha de entrada válida.")).toBeVisible();
  await form.getByLabel("Entrada", { exact: true }).fill(futureDate(10));
  await form.getByLabel("Salida", { exact: true }).fill(futureDate(9));
  await form.getByRole("button", { name: "Preparar mi consulta" }).click();
  await expect(form.getByText("La salida debe ser posterior a la entrada.")).toBeVisible();
  await form.getByLabel("Salida", { exact: true }).fill(futureDate(13));
  await form.getByRole("combobox", { name: "Huéspedes", exact: true }).selectOption("4");
  await form.getByRole("combobox", { name: "Habitación", exact: true }).selectOption("cuadruple");
  await form.getByRole("button", { name: "Preparar mi consulta" }).click();
  await expect(form.locator(".inquiry-review")).toContainText("Huéspedes: 4");
  await form.getByRole("button", { name: "Abrir WhatsApp" }).click();
  const destination = await page.locator("body").getAttribute("data-opened-url");
  const url = new URL(destination!);
  expect(url.origin + url.pathname).toBe("https://wa.me/542236076020");
  expect(url.searchParams.get("text")).toContain("Habitación: Cuádruple");
  expect(errors).toEqual([]);
});

test("an agency can prepare a flexible group inquiry without passenger details", async ({ page }) => {
  await page.goto("/agencias-de-viajes", { waitUntil: "domcontentloaded" });
  const form = page.locator(".inquiry-form");
  await form.getByLabel("Fechas flexibles o todavía por definir").check();
  await form.getByLabel("Personas estimadas", { exact: true }).fill("24");
  await form.getByLabel("Organización", { exact: false }).fill("Agencia de prueba");
  await form.getByRole("button", { name: "Preparar mi consulta" }).click();
  await expect(form.locator(".inquiry-review")).toContainText("Personas estimadas: 24");
  await expect(form.locator(".inquiry-review")).toContainText("Fechas: todavía por definir");
  await form.getByRole("button", { name: "Abrir WhatsApp" }).click();
  const url = new URL((await page.locator("body").getAttribute("data-opened-url"))!);
  expect(url.searchParams.get("text")).toContain("Agencia de prueba");
  expect(url.searchParams.get("text")).toContain("Tipo de viaje: Agencia de viajes");
});

test("room gallery supports navigation, Escape and return of focus", async ({ page }) => {
  await page.goto("/habitaciones/quintuple", { waitUntil: "domcontentloaded" });
  const trigger = page.locator(".explicit-gallery button").first();
  await expect(page.locator('.explicit-gallery[data-ready="true"]')).toBeVisible();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator(".gallery-controls p")).toContainText("2 / 4");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator(".inquiry-form select[name=room]")).toHaveValue("quintuple");
});

test("interactive location changes point and perspective with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ubicacion", { waitUntil: "domcontentloaded" });
  const map = page.locator(".neighborhood-section");
  await expect(map).toHaveAttribute("data-ready", "true");
  await map.getByRole("button", { name: "El mar", exact: true }).click();
  await expect(map.getByRole("heading", { name: "El mar", exact: true })).toBeVisible();
  await expect(map.getByRole("link", { name: "Consultar recorrido" })).toHaveAttribute("href", /destination=-37\./);
  await map.getByRole("button", { name: "Ver desde arriba" }).click();
  await expect(map.getByRole("button", { name: "Ver en perspectiva" })).toHaveAttribute("aria-pressed", "false");
  expect(await map.locator(".neighborhood-surface").evaluate(element => getComputedStyle(element).transform)).toBe("none");
});

for (const width of [360, 768, 1440]) {
test(`every landmark is selectable and updates directions at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 960 });
  await page.goto("/ubicacion", { waitUntil: "domcontentloaded" });
  const map = page.locator(".neighborhood-section");
  await expect(map).toHaveAttribute("data-ready", "true");
  const picker = map.getByRole("group", { name: "Elegí un punto de interés" });
  await expect(picker.getByRole("button")).toHaveCount(9);
  await map.getByRole("button", { name: "Toda la zona", exact: true }).click();
  await expect(map.locator(".neighborhood-pin svg")).toHaveCount(9);
  const area = await map.locator(".neighborhood-geography").getAttribute("viewBox");
  for (const [name, meters] of [["El mar", "150 m"], ["Rambla", "200 m"], ["La peatonal", "550 m"], ["Catedral", "850 m"], ["Plaza España", "950 m"], ["Museo Scaglia", "850 m"], ["Casino Central", "1.050 m"], ["Terminal", "2.500 m"]]) {
    await expect(picker.getByRole("button", { name, exact: true })).toContainText(meters);
    await picker.getByRole("button", { name, exact: true }).click();
    await expect(map.getByRole("heading", { name, exact: true })).toBeVisible();
    await expect(map.locator(".place-distance strong")).toHaveText(meters);
    await expect(map.getByRole("button", { name: `Seleccionar ${name}`, exact: true })).toHaveAttribute("aria-pressed", "true");
    const url = new URL((await map.getByRole("link", { name: "Consultar recorrido" }).getAttribute("href"))!);
    expect(url.origin).toBe("https://www.google.com");
    expect(url.searchParams.get("origin")).toContain("Hotel Bermudas");
    expect(url.searchParams.get("destination")).toMatch(/^-37\.|^-38\./);
    const route = await map.locator(".route-line").getAttribute("d");
    expect(route!.match(/L/g)!.length).toBeGreaterThan(1);
    await expect(map.locator(".place-route-streets")).toContainText("3 de Febrero");
  }
  await expect(map.locator(".neighborhood-geography")).not.toHaveAttribute("viewBox", area!);
  const fitted = await map.locator(".neighborhood-geography").getAttribute("viewBox");
  await map.getByRole("button", { name: "Acercar mapa", exact: true }).click();
  await expect(map.locator(".neighborhood-geography")).not.toHaveAttribute("viewBox", fitted!);
  await map.getByRole("button", { name: "Ver recorrido", exact: true }).click();
  await expect(map.locator(".neighborhood-geography")).toHaveAttribute("viewBox", fitted!);
  for (const name of ["Hotel Bermudas", "El mar", "Rambla", "La peatonal", "Catedral", "Plaza España", "Museo Scaglia", "Casino Central", "Terminal"]) {
    await map.getByRole("button", { name: "Toda la zona", exact: true }).click();
    const marker = map.getByRole("button", { name: `Seleccionar ${name}`, exact: true });
    await marker.click();
    await expect(map.getByRole("heading", { name, exact: true })).toBeVisible();
  }
});
}

for (const width of [360, 768, 1440]) {
  test(`home is usable without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Mar del Plata");
    await expect(page.locator('.inquiry-form[data-ready="true"]')).toBeVisible();
    await page.locator(".room-picker").getByRole("button", { name: "5 personas" }).click();
    await expect(page.locator(".explorer-panel:not([hidden])")).toContainText("dos ambientes");
    if (width < 1100) {
      await page.locator(".mobile-menu summary").click();
      await expect(page.getByRole("navigation", { name: "Navegación móvil" }).getByRole("link", { name: "Grupos y agencias" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open", "");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
    expect(errors).toEqual([]);
  });
}

test("without JavaScript contact remains available and the form cannot submit personal data", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:5173" });
  const page = await context.newPage();
  await page.goto("/contacto", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".inquiry-form").getByRole("button", { name: "Preparar mi consulta" })).toBeDisabled();
  await expect(page.getByRole("link", { name: "Prefiero escribir directamente" })).toHaveAttribute("href", /^https:\/\/wa\.me\//);
  await context.close();
});
