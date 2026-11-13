import { expect, test, type Page } from "@playwright/test";

const title = `Contact flow ${Date.now()}`;

test("representative contacts follow a listing through contributor, review and public views", async ({ page }) => {
  test.setTimeout(90_000);
  await login(page, "demo.agent@househunt.test", "DemoAgent123!");
  await page.goto("/contributor/properties/new");
  await page.getByLabel("Property title").fill(title);
  await page.getByLabel("Property type").selectOption({ label: "Apartment" });
  await page.getByLabel("Monthly rent (KSh)").fill("63500");
  await page.getByLabel("Short property description").fill("Isolated Playwright demo submission for verifying representative contact data.");
  await page.getByLabel("County").selectOption({ label: "Nairobi" });
  await page.getByLabel("Estate / neighbourhood").fill("Test Estate");
  await page.getByLabel("Location description").fill("Test Estate, Nairobi (automated demo data)");
  await page.getByLabel("Bedrooms").fill("2");
  await page.getByLabel("Bathrooms").fill("1");
  await page.getByLabel("Furnishing status").selectOption({ label: "Unfurnished" });
  await page.getByLabel("Parking availability").selectOption({ label: "Available" });
  await page.getByLabel("Available amenities").fill("Automated test amenity");
  await page.getByLabel("Contact person's name").fill("Playwright Representative");
  await page.getByLabel("Phone number").fill("+1 202 555 0100");
  await page.getByLabel("WhatsApp number").fill("+1 202 555 0101");
  await page.locator('input[type="file"]').setInputFiles("public/featured-home-kilimani.png");
  await page.getByRole("button", { name: /Submit for review/i }).click();
  await expect(page.getByRole("heading", { name: "Submitted for review" })).toBeVisible();
  await page.goto("/properties");
  await expect(page.getByText(title)).toHaveCount(0);

  await logout(page);
  await login(page, "demo.admin@househunt.test", "DemoAdmin123!");
  await page.goto("/admin/properties");
  await page.getByLabel("Search title, estate or contributor").fill(title);
  await page.getByRole("button", { name: "Inspect submission" }).click();
  await expect(page.getByText("+1 202 555 0101")).toBeVisible();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Approve" }).click();

  await page.goto("/properties");
  const listingLink = page.getByRole("link", { name: title });
  await expect(listingLink).toBeVisible();
  const detailPath = await listingLink.getAttribute("href");
  expect(detailPath).toBeTruthy();
  await listingLink.click();
  await expect(page.getByRole("complementary").getByText("Playwright Representative")).toBeVisible();
  await page.getByRole("button", { name: "Send an enquiry" }).click();
  const contactDialog = page.getByRole("dialog");
  await expect(contactDialog.getByRole("link", { name: "Call representative" })).toHaveAttribute("href", "tel:+12025550100");
  const whatsappLink = contactDialog.getByRole("link", { name: "WhatsApp representative" });
  await expect(whatsappLink).toHaveAttribute("href", /https:\/\/wa\.me\/12025550101\?text=/);
  const whatsappHref = await whatsappLink.getAttribute("href");
  const message = new URL(whatsappHref!).searchParams.get("text");
  expect(message).toBe(`Hello, I'm interested in the ${title} in Test Estate · Nairobi. Is it still available, and could I arrange a viewing?`);
  await page.keyboard.press("Escape");
  await expect(contactDialog).not.toBeVisible();
  await page.getByRole("button", { name: "Contact representative" }).click();
  await expect(contactDialog).toBeVisible();
  await contactDialog.getByRole("button", { name: "Close contact panel" }).click();
  await expect(contactDialog).not.toBeVisible();

  await page.goto("/admin/properties/manage");
  const adminCard = page.locator("article").filter({ hasText: title });
  await adminCard.getByRole("button", { name: "Edit" }).click();
  await adminCard.getByLabel("Phone number").fill("+1 202 555 0102");
  await adminCard.getByRole("button", { name: "Save administrator changes" }).click();
  await page.goto(detailPath!);
  await page.getByRole("button", { name: "Send an enquiry" }).click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Call representative" })).toHaveAttribute("href", "tel:+12025550102");
  await page.keyboard.press("Escape");

  await logout(page);
  await login(page, "demo.agent@househunt.test", "DemoAgent123!");
  await page.goto("/contributor/properties/manage");
  const contributorCard = page.locator("article").filter({ hasText: title });
  await contributorCard.getByRole("link", { name: "Edit" }).click();
  await page.getByLabel("Phone").fill("+1 202 555 0103");
  await page.getByRole("button", { name: "Save Changes" }).click();
  await expect(page.getByRole("heading", { name: "Changes saved" })).toBeVisible();
  await page.goto("/properties");
  await expect(page.getByText(title)).toHaveCount(0);

  await logout(page);
  await login(page, "demo.admin@househunt.test", "DemoAdmin123!");
  await page.goto("/admin/properties");
  await page.getByLabel("Search title, estate or contributor").fill(title);
  await page.getByRole("button", { name: "Inspect submission" }).click();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Approve" }).click();
  await page.goto(detailPath!);
  await page.getByRole("button", { name: "Send an enquiry" }).click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Call representative" })).toHaveAttribute("href", "tel:+12025550103");
  await page.keyboard.press("Escape");
  await page.goto("/properties/modern-westlands-home");
  await expect(page.getByText("Representative contact details are not available for this listing.")).toBeVisible();
});

test("contact panel only offers configured representative methods", async ({ page }) => {
  const fixtures = [
    { id: "contact-phone-only", publicPropertyId: "contact-phone-only", title: "Phone only test home", phone: "+1 202 555 0110" },
    { id: "contact-whatsapp-only", publicPropertyId: "contact-whatsapp-only", title: "WhatsApp only test home", whatsapp: "+1 202 555 0111" },
    { id: "contact-no-method", publicPropertyId: "contact-no-method", title: "No contact test home" },
  ].map((fixture) => ({
    ...fixture,
    contributorId: "contact-test",
    image: "/featured-home-kilimani.png",
    location: "Test Estate · Nairobi",
    monthlyRent: 50000,
    submittedOn: "13 Nov 2026",
    status: "approved",
    publicationStatus: "published",
  }));
  await page.addInitScript((records) => {
    sessionStorage.setItem("house-hunting-demo-contributor-properties", JSON.stringify(records));
  }, fixtures);

  for (const fixture of fixtures) {
    await page.goto(`/properties/${fixture.publicPropertyId}`);
    await page.getByRole("button", { name: "Send an enquiry" }).click();
    const dialog = page.getByRole("dialog");
    const call = dialog.getByRole("link", { name: "Call representative" });
    const whatsapp = dialog.getByRole("link", { name: "WhatsApp representative" });
    if (fixture.id === "contact-phone-only") {
      await expect(call).toHaveAttribute("href", "tel:+12025550110");
      await expect(whatsapp).toHaveCount(0);
    } else if (fixture.id === "contact-whatsapp-only") {
      await expect(call).toHaveCount(0);
      await expect(whatsapp).toHaveAttribute("href", /https:\/\/wa\.me\/12025550111\?text=/);
    } else {
      await expect(call).toHaveCount(0);
      await expect(whatsapp).toHaveCount(0);
      await expect(dialog.getByText(/contact details are currently unavailable/i)).toBeVisible();
    }
  }
});

async function login(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await page.waitForURL(/\/(dashboard|admin|contributor\/properties)$/);
}

async function logout(page: Page) {
  const width = page.viewportSize()?.width ?? 1440;
  if (width < 1280) {
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("button", { name: "Log out" }).click();
  } else {
    const control = page.getByRole("button", { name: /Open account menu/ });
    await control.click();
    await page.getByRole("menu").getByRole("button", { name: "Log out" }).click();
  }
  await expect(page).toHaveURL(/\/$/);
}
