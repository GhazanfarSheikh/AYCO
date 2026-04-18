import { expect, test } from "@playwright/test";

test("landing page shows AYCO hero", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", {
      name: /Student shopping that feels sharp, fast, and believable/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Start Scouting/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /View all Heat/i }),
  ).toBeVisible();
});
