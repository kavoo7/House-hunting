import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/", "/properties", "/properties/bright-airy-apartment", "/properties/modern-westlands-home",
  "/properties/peaceful-city-retreat", "/about", "/guide", "/neighbourhoods",
  "/how-it-works", "/privacy", "/terms", "/contact", "/help", "/login", "/signup", "/reset-password",
];

test("public routes load, have one footer and fit the viewport", async ({ page }) => {
  for (const route of publicRoutes) {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("footer")).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow, `horizontal overflow on ${route}`).toBe(false);
  }
});

test("homepage calls to action navigate to their destinations", async ({ page }) => {
  test.skip((test.info().project.use.viewport as { width?: number } | undefined)?.width !== undefined && ((test.info().project.use.viewport as { width: number }).width < 1024), "Homepage neighbourhood and guidance sections are only rendered at the large breakpoint.");
  await page.goto("/");
  await page.getByRole("link", { name: "Explore neighbourhoods" }).click();
  await expect(page).toHaveURL(/\/neighbourhoods$/);
  await page.goto("/");
  await page.getByRole("link", { name: "Read our rental guide" }).click();
  await expect(page).toHaveURL(/\/guide$/);
  await page.goto("/contact");
  await expect(page.getByRole("heading", { name: /help you find your way/ })).toBeVisible();
  await expect(page.getByText(/support channel will be made available/i)).toBeVisible();
  await page.goto("/properties/bright-airy-apartment");
  await expect(page.getByRole("heading", { name: "Interested in this home?" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send an enquiry" })).toBeVisible();
});

test("search filters and property detail navigation work", async ({ page }) => {
  await page.goto("/properties?location=Westlands");
  await expect(page.getByText("1 sample property found")).toBeVisible();
  await expect(page.getByText("Modern living in Westlands")).toBeVisible();
  await page.goto("/properties/modern-westlands-home");
  await expect(page.getByRole("heading", { name: "Modern living in Westlands" }).first()).toBeVisible();
});

test("unknown routes render the not found page", async ({ page }) => {
  await page.goto("/route-that-does-not-exist");
  await expect(page.getByRole("link", { name: /Return to homepage/ })).toBeVisible();
});

test("public footer navigation destinations resolve", async ({ page }) => {
  await page.goto("/");
  for (const [name, route] of [["Find a home", "/properties"], ["Neighbourhoods", "/neighbourhoods"], ["Rental guide", "/guide"], ["Help centre", "/help"], ["About us", "/about"], ["Contact us", "/contact"], ["Privacy policy", "/privacy"], ["Terms of use", "/terms"]] as const) {
    await page.goto("/");
    await page.locator("footer").getByRole("link", { name, exact: true }).click({ force: true });
    await expect(page).toHaveURL(new RegExp(`${route.replaceAll("/", "\\/")}$`));
  }
});
