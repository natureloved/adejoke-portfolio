import { expect, test } from "@playwright/test";
import { gotoHomeFresh } from "./helpers";

test.describe("back to top button", () => {
  test("hidden at the top of the page and shown once the reader scrolls", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoHomeFresh(page);
    await expect(page.locator(".back-to-top")).toHaveAttribute("data-shown", "false");

    // Two viewport heights down, which is deep into a long page.
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3));
    await expect(page.locator(".back-to-top")).toHaveAttribute("data-shown", "true");
  });

  test("clicking it returns the page to the top", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoHomeFresh(page);
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3));

    const button = page.getByRole("button", { name: "Back to top" });
    await button.click();

    // Smooth scrolling means the scroll is still in flight when the click
    // resolves, so poll rather than asserting the instant value.
    await expect
      .poll(() => page.evaluate(() => Math.round(window.scrollY)), { timeout: 10_000 })
      .toBeLessThan(5);
  });

  test("it is operable by keyboard alone", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoHomeFresh(page);
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3));

    const button = page.locator(".back-to-top");
    await button.focus();
    await expect(button).toBeFocused();
    await page.keyboard.press("Enter");

    // The scroll is smooth, so asserting the end position directly races the
    // animation: under load the animation is throttled and the poll can time
    // out before the first frame lands. Wait for the scroll to start moving
    // first, then for it to reach the top.
    await expect
      .poll(
        () => page.evaluate(() => Math.round(window.scrollY) < window.innerHeight * 3 - 50),
        { timeout: 10_000 },
      )
      .toBe(true);
    await expect
      .poll(() => page.evaluate(() => Math.round(window.scrollY)), { timeout: 15_000 })
      .toBeLessThan(5);
  });

  test("not focusable while hidden", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoHomeFresh(page);

    // A hidden control left in the tab order is a trap: keyboard users get
    // an invisible stop before they get to anything.
    const btn = page.locator(".back-to-top");
    await expect(btn).toHaveAttribute("tabindex", "-1");
    await expect(btn).toHaveAttribute("aria-hidden", "true");
  });

  test("it does not cover the footer's own top link at any width", async ({ page }) => {
    // The footer has a "Back to the top" text link in the bottom-right, so a
    // fixed button would stack two controls for the same action on top of
    // each other. The lift is measured, but the link wraps to a different
    // place per viewport, so the clearance has to be verified across widths.
    //
    // The page is loaded once and the viewport is resized, rather than
    // reloaded per width: the whole spec has a 45s budget and ten full page
    // loads with a settle wait each will not fit inside it. The button
    // re-measures on resize, which is the same code path a reflow takes.
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoHomeFresh(page);
    await expect(page.locator(".back-to-top")).toBeAttached();

    for (const width of [1600, 1440, 1280, 1130, 1024, 900, 780, 600, 480, 390, 360]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.locator(".back-to-top")).toHaveAttribute("data-shown", "true");

      // The measured lift is applied by JS and then animated, so settle on
      // the computed gap: poll until there is no overlap rather than
      // inspecting a frame mid-transition.
      await expect
        .poll(
          () =>
            page.evaluate(() => {
              const el = document.querySelector<HTMLElement>(".back-to-top");
              const link = document.querySelector<HTMLElement>(".footer-bottom a");
              if (!el || !link) return 1;
              const b = el.getBoundingClientRect();
              const l = link.getBoundingClientRect();
              const overlapY = b.bottom > l.top && b.top < l.bottom;
              const overlapX = b.right > l.left && b.left < l.right;
              return overlapY && overlapX ? 1 : 0;
            }),
          { timeout: 6_000 },
        )
        .toBe(0);
    }
  });

  test("it keeps a 40px target and stays inside the viewport", async ({ page }) => {
    for (const width of [1600, 1440, 1280, 780, 390, 360]) {
      await page.setViewportSize({ width, height: 900 });
      await gotoHomeFresh(page);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.locator(".back-to-top")).toHaveAttribute("data-shown", "true");
      await page.waitForTimeout(400);

      const box = await page.locator(".back-to-top").boundingBox();
      expect(box, `at ${width}px`).toBeTruthy();
      // 40px is the minimum target the README promises.
      expect(box!.width, `width at ${width}px`).toBeGreaterThanOrEqual(40);
      expect(box!.height, `height at ${width}px`).toBeGreaterThanOrEqual(40);
      expect(box!.x + box!.width, `right edge at ${width}px`).toBeLessThanOrEqual(width);
      expect(box!.y + box!.height, `bottom edge at ${width}px`).toBeLessThanOrEqual(900);
      expect(box!.x).toBeGreaterThanOrEqual(0);
    }
  });
});
