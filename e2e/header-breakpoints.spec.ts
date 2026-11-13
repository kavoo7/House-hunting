import { expect, test } from "@playwright/test";

test("header fits at tablet widths and switches layouts at the desktop breakpoint", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Viewport boundaries are checked once in Chromium.");

  await page.goto("/");

  for (const width of [768, 800, 900, 1023, 1024, 1279, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });

    const headerWidth = await page.locator("header").evaluate((header) => ({
      client: header.clientWidth,
      scroll: header.scrollWidth,
    }));
    expect(headerWidth.scroll, `header should fit at ${width}px`).toBeLessThanOrEqual(headerWidth.client);

    if (width < 1280) {
      await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeHidden();
    } else {
      await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
      await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
    }
  }
});
