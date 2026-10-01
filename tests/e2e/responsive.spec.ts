import { devices, expect, test } from "@playwright/test";
import { DESKTOP, MOBILE, SECTIONS, expectNoHorizontalOverflow, gotoHomeFresh } from "./helpers";

/**
 * Responsive layout. The claim under test is the one in the README: no
 * horizontal overflow down to 360px, and a usable layout at every step.
 */

// 360 is the narrowest viewport the design claims to support. Test below that
// only measures that the page breaks, which nobody asked for.
const NARROWEST = 360;

test.describe("layout: no horizontal overflow", () => {
  for (const width of [360, 390, 480, 600, 768, 900, 1020, 1130, 1280, 1600]) {
    test(`no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await gotoHomeFresh(page);
      await expectNoHorizontalOverflow(page);
    });
  }
});

test.describe("layout: section stacking", () => {
  test("desktop keeps nav and hero side by side", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const copy = (await page.locator(".hero-copy").boundingBox())!;
    const art = (await page.locator(".hero-art").boundingBox())!;
    // Side by side means the art starts to the right of the copy block.
    expect(art.x).toBeGreaterThan(copy.x + copy.width - 1);
  });

  test("narrow stacks hero art under the copy", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await gotoHomeFresh(page);

    const copy = (await page.locator(".hero-copy").boundingBox())!;
    const art = (await page.locator(".hero-art").boundingBox())!;
    expect(art.y).toBeGreaterThan(copy.y + copy.height - 1);
  });

  test("desktop nav links are hidden on a phone", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);
    await expect(page.locator(".main-nav").first()).toBeVisible();

    await page.setViewportSize(MOBILE);
    await expect(page.locator(".main-nav").first()).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });
});

test.describe("layout: type floor", () => {
  test("real content is never below 13px", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // Sample rendered text nodes rather than reading CSS values: the claim is
    // about what the reader actually gets, not about which classes exist.
    const tooSmall = await page.evaluate(() => {
      const offenders: string[] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = (node.textContent ?? "").trim();
        if (!text) continue;
        const el = node.parentElement;
        if (!el) continue;
        if (el.closest("svg, script, style, .sr, [aria-hidden='true']")) continue;
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") continue;
        const size = parseFloat(style.fontSize);
        // Only flag copy that is meant to be read, not micro labels that sit
        // next to a larger readable element.
        if (size < 13) offenders.push(`${size}px: ${text.slice(0, 40)}`);
      }
      return offenders;
    });
    expect(tooSmall).toEqual([]);
  });
});

test("every nav target exists", async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await gotoHomeFresh(page);
  for (const id of SECTIONS) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test("page renders on a reduced-motion preference without breaking", async ({ browser }) => {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: DESKTOP,
  });
  const page = await context.newPage();
  await gotoHomeFresh(page);
  // The rule lives in globals.css; if it were dropped the transitions would
  // still run, which is the failure this guards.
  const scrollBehavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  expect(scrollBehavior).toBe("auto");
  await context.close();
});

test("section order matches the nav", async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await gotoHomeFresh(page);
  const order = await page.evaluate(() =>
    [...document.querySelectorAll("main > section")]
      .map((s) => s.id)
      .filter(Boolean),
  );
  // The nav targets must appear in the order the nav lists them. The page also
  // has hero and contact sections, which the nav does not link to, so the
  // assertion is about relative order rather than an exact list.
  const navOrder = order.filter((id) => (SECTIONS as readonly string[]).includes(id));
  expect(navOrder).toEqual([...SECTIONS]);
  expect(order).toContain("top");
  expect(order).toContain("contact");
});
