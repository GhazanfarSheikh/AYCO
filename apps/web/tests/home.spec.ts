import { expect, test } from "@playwright/test";

test("landing page shows AYCO hero", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { name: /Everything a student needs/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Start Scouting/i }),
  ).toBeVisible();
});
