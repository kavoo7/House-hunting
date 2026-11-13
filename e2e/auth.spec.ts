import { expect, test } from "@playwright/test";

const accounts = [
  { email: "demo.user@househunt.test", password: "DemoUser123!", destination: "/dashboard", role: "Registered user" },
  { email: "demo.agent@househunt.test", password: "DemoAgent123!", destination: "/contributor/properties", role: "Contributor / Agent" },
  { email: "demo.admin@househunt.test", password: "DemoAdmin123!", destination: "/admin", role: "Administrator" },
];

test("demo email and password login routes each role correctly and logout works", async ({ page }) => {
  for (const account of accounts) {
    await page.goto("/properties");
    if ((page.viewportSize()?.width ?? 1440) < 1280) {
      await page.getByRole("button", { name: "Menu" }).click();
      await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Log in", exact: true }).click();
    } else {
      await page.getByRole("link", { name: "Log in", exact: true }).click();
    }
    await page.getByLabel("Email address").fill(account.email);
    await page.getByLabel("Password", { exact: true }).fill(account.password);
    await page.getByRole("button", { name: "Log in", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${account.destination.replaceAll("/", "\\/")}$`));
    const activeName = account.role === "Registered user" ? "Demo User" : account.role === "Contributor / Agent" ? "Demo Agent" : "Demo Administrator";
    if ((page.viewportSize()?.width ?? 1440) < 1280) {
      await page.getByRole("button", { name: "Menu" }).click();
      const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
      await expect(mobileNavigation.getByText(activeName)).toBeVisible();
      await mobileNavigation.getByRole("button", { name: "Log out" }).click();
    } else {
      await page.getByRole("button", { name: `Open account menu for ${activeName}` }).click();
      const accountMenu = page.getByRole("menu");
      await expect(accountMenu).toBeVisible();
      await accountMenu.getByRole("button", { name: "Log out" }).click();
    }
    await expect(page).toHaveURL(/\/$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/properties$/);
    await expect(page.getByRole("heading", { name: /Welcome back|Contributor|Administrator/ })).toHaveCount(0);
  }
});

test("invalid login shows feedback without creating a session", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email address").fill("invalid@example.test");
  await page.getByLabel("Password", { exact: true }).fill("not-a-password");
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("not recognised");
  await expect(page).toHaveURL(/\/login$/);
});

test("Google sign-in buttons explain the demo limitation", async ({ page }) => {
  for (const route of ["/login", "/signup"]) {
    await page.goto(route);
    await page.getByRole("button", { name: "Continue with Google" }).click();
    await expect(page.getByRole("status")).toContainText("Google sign-in is not available in this demo yet.");
  }
});

test("signup validation and demo verification step work", async ({ page }) => {
  await page.goto("/signup");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText("Enter your full name.")).toBeVisible();
  await page.getByLabel("Full name").fill("Playwright Test");
  await page.getByLabel("Email address").fill("playwright.isolated@example.test");
  await page.getByLabel("Phone number").fill("+254700000099");
  await page.getByLabel("Password", { exact: true }).fill("PlaywrightTest123!");
  await page.getByLabel("Confirm password").fill("PlaywrightTest123!");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByRole("heading", { name: "Verify your email first" })).toBeVisible();
  await page.getByLabel("Six-digit code").fill("123456");
  await page.getByRole("button", { name: "Continue to account details" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
});

test("reset-password page provides its demo response", async ({ page }) => {
  await page.goto("/reset-password");
  await page.getByLabel("Email address").fill("test@example.test");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("status")).toContainText("No email was sent");
});
