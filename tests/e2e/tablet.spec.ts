import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow, gotoHomeFresh } from "./helpers";

/**
 * The tablet band, 781px to 1100px.
 *
 * A header that is tested at 1280px and at 390px still overflows in between:
 * six nav links plus the brand fit at 1101px and not at 1100px, and the
 * reading toggle has to fit somewhere at every one of those widths. This file
 * pins that band down, so a header change cannot pass both ends and break the
 * middle.
 */
test.use({ viewport: { width: 900, height: 800 } });

test("the header collapses to the hamburger and does not overflow", async ({ page }) => {
  await gotoHomeFresh(page);

  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  await expect(page.locator(".main-nav")).toBeHidden();
  await expect(page.locator(".header-reading")).toBeHidden();
  await expectNoHorizontalOverflow(page);
});

test("the reading mode moves into the menu, with its words", async ({ page }) => {
  await gotoHomeFresh(page);
  await page.getByRole("button", { name: "Open menu" }).click();

  const menu = page.locator(".main-nav");
  await expect(menu).toHaveClass(/open/);
  await expect(menu.locator(".mobile-reading-hint")).toBeVisible();

  // Words, not icons: this band has room, so the label is the instruction.
  await expect(menu.getByRole("button", { name: "Technical" })).toBeVisible();
  await menu.getByRole("button", { name: "Technical" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-reading", "technical");
});

test("the wide header keeps its links and shows the toggle", async ({ page }) => {
  // Just above the collapse: the nav comes back and the toggle returns to the
  // header, which is the other side of the same switch.
  await page.setViewportSize({ width: 1200, height: 800 });
  await gotoHomeFresh(page);

  // Seven section links. The mobile "Start a conversation" anchor is also a
  // direct child of .main-nav, so count the hrefs rather than the elements.
  await expect(page.locator(".main-nav > a[href^='#']")).toHaveCount(8);
  for (const label of ["Work", "Expertise", "Process", "Lab", "About", "Questions", "Contact"]) {
    await expect(page.locator(".main-nav").getByText(label, { exact: true })).toBeVisible();
  }
  await expect(page.locator(".header-reading")).toBeVisible();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  await expectNoHorizontalOverflow(page);
});

test("the icon-only header toggle keeps a 40px target", async ({ page }) => {
  // Below 1440px the header toggle drops its words for icons. The target has
  // to stay at or above the 40px minimum the README promises.
  await page.setViewportSize({ width: 1200, height: 800 });
  await gotoHomeFresh(page);

  const buttons = page.locator(".header-reading button");
  await expect(buttons).toHaveCount(2);
  for (let i = 0; i < 2; i++) {
    const box = (await buttons.nth(i).boundingBox())!;
    expect(
      Math.min(box.width, box.height),
      `header reading button ${i} is ${box.width}x${box.height}`,
    ).toBeGreaterThanOrEqual(40);
  }
});
