import { expect, test } from "@playwright/test";

test("customer can complete demo checkout and sees the cart cleared", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  await page.goto("/products");
  await page.getByRole("button", { name: "Add Canvas Tote to cart" }).click();
  await page.getByRole("link", { name: /cart/i }).click();
  await expect(page.getByRole("heading", { name: "Your cart" })).toBeVisible();
  await page.getByRole("link", { name: "Continue to checkout" }).click();

  await page.getByRole("textbox", { name: "Full name" }).fill("Taylor Customer");
  await page.getByRole("textbox", { name: "Email address" }).fill("taylor@example.com");
  await page.getByRole("textbox", { name: "Address", exact: true }).fill("123 Market Street");
  await page.getByRole("button", { name: "Complete demo checkout" }).click();

  await expect(page.getByRole("heading", { name: "Thank you." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Cart (0)" })).toBeVisible();
});
