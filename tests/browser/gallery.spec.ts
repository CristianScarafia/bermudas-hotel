import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager\.com|google-analytics\.com/, route => route.abort());
});

for (const width of [360, 768, 1440]) {
  test(`room thumbnails load, fit and open every category at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    for (const capacity of [2, 3, 4, 5]) {
      await page.locator(".room-picker").getByRole("button", { name: `${capacity} personas` }).click();
      const panel = page.locator(".explorer-panel:not([hidden])");
      const thumbnails = panel.locator(".gallery-thumbnails");
      await thumbnails.scrollIntoViewIfNeeded();
      await expect.poll(() => thumbnails.locator("img").evaluateAll(images => images.every(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0))).toBe(true);
      const layout = await thumbnails.evaluate(el => {
        const parent = el.getBoundingClientRect();
        return [...el.querySelectorAll("button")].every(button => {
          const rect = button.getBoundingClientRect();
          return rect.left >= parent.left - 1 && rect.right <= parent.right + 1 && rect.width >= 44 && rect.height >= 44;
        });
      });
      expect(layout).toBe(true);
      const trigger = thumbnails.getByRole("button").first();
      await trigger.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect.poll(() => dialog.locator(".gallery-dialog-inner > img").evaluate(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
      await page.keyboard.press("ArrowRight");
      await expect(dialog.locator(".gallery-controls p")).toContainText("2 /");
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
    }
  });
}

test("a failed thumbnail variant retries the complete photograph", async ({ page }) => {
  let blocked = 0;
  await page.route(/habitacion-doble-dos-camas-hotel-bermudas-480\.webp/, route => { blocked++; return route.abort(); });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const thumbnails = page.locator(".explorer-panel:not([hidden]) .gallery-thumbnails");
  await thumbnails.scrollIntoViewIfNeeded();
  const image = thumbnails.locator("img").nth(1);
  await expect.poll(() => blocked).toBeGreaterThan(0);
  await expect(image).toHaveAttribute("data-full-source-fallback", "true");
  await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
  expect(await image.evaluate(img => (img as HTMLImageElement).currentSrc)).toMatch(/habitacion-doble-dos-camas-hotel-bermudas\.webp\?v=/);
});
