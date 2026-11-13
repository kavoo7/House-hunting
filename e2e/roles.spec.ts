import { expect, test } from "@playwright/test";

test("registered user can navigate favorites and settings", async ({ page }) => {
  await login(page, "demo.user@househunt.test", "DemoUser123!");
  await expect(page).toHaveURL(/\/dashboard$/);
  await page.goto("/properties/bright-airy-apartment");
  const save = page.getByRole("button", { name: "Remove Bright & airy 2-bedroom apartment from saved homes" }).first();
  await save.click();
  await page.getByRole("dialog").getByRole("button", { name: "Remove", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("removed from your saved homes");
  await page.goto("/dashboard/favorites");
  await expect(page.getByText("Bright & airy 2-bedroom apartment")).toHaveCount(0);
  await page.goto("/dashboard/enquiries");
  await expect(page.getByRole("heading", { name: "My Enquiries." })).toBeVisible();
  await page.goto("/dashboard/profile");
  await expect(page.getByRole("heading", { name: /Profile & settings/ })).toBeVisible();
});

test("contributor listing form validates without submitting incomplete data", async ({ page }) => {
  await login(page, "demo.agent@househunt.test", "DemoAgent123!");
  await page.goto("/contributor/properties/new");
  await page.getByRole("button", { name: /Submit for review/ }).click();
  await expect(page.getByText("This field is required.").first()).toBeVisible();
});

test("admin sections load and admin navigation is present", async ({ page }) => {
  await login(page, "demo.admin@househunt.test", "DemoAdmin123!");
  for (const [route, heading] of [
    ["/admin", /Welcome back/], ["/admin/properties", /Property Review/], ["/admin/properties/manage", /All Properties/],
    ["/admin/users", /User Management/], ["/admin/contributors", /Contributor Management/], ["/admin/reports", /Reports & Complaints/],
    ["/admin/advertisements", /Advertisements/], ["/admin/settings", /Platform Settings/],
  ] as const) {
    await page.goto(route);
    await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
  }
});

test("account dropdown closes with click, Escape, and outside click", async ({ page }) => {
  await login(page, "demo.user@househunt.test", "DemoUser123!");
  await page.goto("/");
  if (page.viewportSize()!.width < 1280) {
    const mobileMenuButton = page.getByRole("button", { name: "Menu" });
    await mobileMenuButton.click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByText("Demo User")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(mobileNav).toHaveCount(0);
    await mobileMenuButton.click();
    await mobileNav.getByRole("button", { name: "Log out" }).click();
    await expect(page).toHaveURL(/\/$/);
    return;
  }
  const control = page.getByRole("button", { name: "Open account menu for Demo User" });
  await control.click();
  await expect(page.getByRole("menu")).toBeVisible();
  await control.click();
  await expect(page.getByRole("menu")).toHaveCount(0);
  await control.click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("menu")).toHaveCount(0);
  await control.click();
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Find a home" }).click();
  await expect(page.getByRole("menu")).toHaveCount(0);
});

async function login(page: import("@playwright/test").Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await page.waitForURL(/\/(dashboard|admin|contributor\/properties)$/);
}
