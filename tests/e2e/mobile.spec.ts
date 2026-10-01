import { devices, expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow, gotoHomeFresh } from "./helpers";

/**
 * A real phone profile, in its own file because a device descriptor changes
 * the whole worker (touch, DPR, UA) and cannot be scoped to a describe block.
 *
 * A resized desktop window still reports a mouse and no touch, so menu
 * behaviour and tap-target geometry have to be measured on a real phone.
 */
test.use({
  ...devices["Pixel 7"],
});

test.describe("phone navigation", () => {
  test("the menu opens, navigates and closes", async ({ page }) => {
    await gotoHomeFresh(page);

    const toggle = page.getByRole("button", { name: "Open menu" });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(page.locator(".main-nav")).toHaveClass(/open/);
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

    await page.locator(".main-nav a[href='#work']").click();
    await expect(page.locator(".main-nav")).not.toHaveClass(/open/);
    await expect(page.locator("#work")).toBeInViewport();
    await expectNoHorizontalOverflow(page);
  });

  test("Escape closes the menu", async ({ page }) => {
    await gotoHomeFresh(page);

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator(".main-nav")).toHaveClass(/open/);

    await page.keyboard.press("Escape");
    await expect(page.locator(".main-nav")).not.toHaveClass(/open/);
  });

  test("the page does not scroll behind the open menu", async ({ page }) => {
    await gotoHomeFresh(page);

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator("body")).toHaveClass(/modal-open/);
    await page.keyboard.press("Escape");
    await expect(page.locator("body")).not.toHaveClass(/modal-open/);
  });
});

test.describe("phone touch targets", () => {
  test("header controls are at least 40px", async ({ page }) => {
    await gotoHomeFresh(page);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();

    // Only controls that are actually displayed. The "Let's talk" CTA is
    // hidden below 780px (the menu takes its place), and a hidden button has
    // no tap target to get wrong, so measuring it would fail the layout for
    // doing exactly what it should.
    const controls = page.locator(".header-actions button:visible");
    const count = await controls.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const box = (await controls.nth(i).boundingBox())!;
      expect(
        Math.min(box.width, box.height),
        `header button ${i} is ${box.width}x${box.height}`,
      ).toBeGreaterThanOrEqual(40);
    }
  });

  test("the phone does not overflow with the menu open", async ({ page }) => {
    await gotoHomeFresh(page);
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator(".main-nav")).toHaveClass(/open/);
    await expectNoHorizontalOverflow(page);
  });
});

test.describe("phone reading mode", () => {
  test("the toggle is reachable and switches the copy", async ({ page }) => {
    await gotoHomeFresh(page);

    // Three switches exist at a phone width: header (hidden), hero, and the
    // open menu. Scope to the hero's copy, which is the one always visible.
    const group = page.getByRole("group", { name: "Reading mode" }).nth(1);
    await expect(group).toBeVisible();
    await group.getByRole("button", { name: "Technical" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-reading", "technical");
    await expect(page.locator(".hero-description[data-plain]")).toBeHidden();
  });
});
