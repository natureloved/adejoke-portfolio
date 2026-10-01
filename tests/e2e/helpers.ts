import { expect, test, type Page } from "@playwright/test";

/**
 * Shared helpers. Every spec that navigates waits for the same thing, so the
 * definition of "the page is ready" lives in one place rather than in fourteen
 * copies of `waitForLoadState`.
 */

export const DESKTOP = { width: 1280, height: 800 };
export const MOBILE = { width: 390, height: 844 };

/** Every section the nav links to, in page order. */
export const SECTIONS = [
  "work",
  "expertise",
  "process",
  "lab",
  "about",
  "faq",
] as const;

export async function gotoHome(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  // The hero is server-rendered, so the headline is present in the HTML before
  // hydration. Waiting on it and not on "networkidle" keeps the suite from
  // timing out on the font and image fetches.
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

/** The reading toggle writes to localStorage; tests start from a clean slate. */
export async function gotoHomeFresh(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

export async function setReadingMode(page: Page, mode: "Plain" | "Technical") {
  const group = page.getByRole("group", { name: "Reading mode" });
  await group.getByRole("button", { name: mode }).click();
  await expect(page.locator("html")).toHaveAttribute("data-reading", mode.toLowerCase());
}

/** No horizontal scroll: content must not overflow at any supported width. */
export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const el = document.documentElement;
    return el.scrollWidth - el.clientWidth;
  });
  expect(overflow, `document scrolls horizontally by ${overflow}px`).toBeLessThanOrEqual(0);
}
