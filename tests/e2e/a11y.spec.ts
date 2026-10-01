import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { DESKTOP, gotoHomeFresh } from "./helpers";

/**
 * Accessibility. The README claims WCAG AA contrast with zero failures, a skip
 * link, focus rings and reduced-motion support. Each claim is asserted against
 * the rendered page so the claim is checkable, not aspirational.
 */

test.describe("axe: no violations", () => {
  test("desktop renders with zero axe violations", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .analyze();

    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.html.slice(0, 120)),
      })),
    ).toEqual([]);
  });

  test("with the case dialog open there are still zero violations", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    await page.locator("[data-case-opener='drawbound']").click();
    await expect(page.locator("dialog.case-modal")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .analyze();

    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.html.slice(0, 120)),
      })),
    ).toEqual([]);
  });
});

test.describe("contrast: AA on real text", () => {
  test("every text node meets 4.5:1 (or 3:1 at large size)", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const failures = await page.evaluate(() => {
      type Fail = { text: string; ratio: number; color: string; bg: string; size: number };
      const out: Fail[] = [];

      const parse = (c: string): [number, number, number, number] => {
        const m = c.match(/rgba?\(([^)]+)\)/);
        if (!m) return [0, 0, 0, 1];
        const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
        return [parts[0], parts[1], parts[2], parts[3] ?? 1];
      };
      const lum = ([r, g, b]: number[]) => {
        const f = (v: number) => {
          const s = v / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const over = (fg: number[], bg: number[]) => {
        const a = fg[3];
        return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a));
      };
      const ratio = (fg: number[], bg: number[]) => {
        const l1 = lum(fg);
        const l2 = lum(bg);
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      };
      // Walk up until a non-transparent background is found, compositing any
      // translucent layers on the way.
      const bgOf = (el: Element): number[] => {
        let cur: Element | null = el;
        const layers: number[][] = [];
        while (cur) {
          const [r, g, b, a] = parse(getComputedStyle(cur).backgroundColor);
          if (a > 0) {
            layers.push([r, g, b, a]);
            if (a === 1) break;
          }
          cur = cur.parentElement;
        }
        let base = [255, 255, 255];
        for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
        return base;
      };

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = (node.textContent ?? "").trim();
        if (!text) continue;
        const el = node.parentElement;
        if (!el) continue;
        if (el.closest("script, style, [aria-hidden='true'], .art-label")) continue;
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || parseFloat(style.opacity) < 1) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        const fg = parse(style.color);
        if (fg[3] < 1) continue;
        const bg = bgOf(el);
        const r = ratio(over(fg, bg), bg);
        const px = parseFloat(style.fontSize);
        const weight = Number(style.fontWeight) || 400;
        const large = px >= 24 || (px >= 18.66 && weight >= 700);
        const min = large ? 3 : 4.5;
        if (r < min) {
          out.push({ text: text.slice(0, 50), ratio: Math.round(r * 100) / 100, color: style.color, bg: `rgb(${bg.map(Math.round).slice(0, 3).join(",")})`, size: px });
        }
      }
      return out;
    });

    expect(failures).toEqual([]);
  });
});

test.describe("keyboard access", () => {
  test("skip link is the first stop and reaches main", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => document.activeElement?.className ?? "");
    expect(focused).toContain("skip-link");

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("focus rings are visible", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    await page.locator(".btn").first().focus();
    const outline = await page.locator(".btn").first().evaluate((el) => {
      const s = getComputedStyle(el);
      return { width: s.outlineWidth, style: s.outlineStyle };
    });
    expect(parseFloat(outline.width)).toBeGreaterThanOrEqual(2);
    expect(outline.style).not.toBe("none");
  });

  test("the page is reachable by tab in order", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const reached: string[] = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const tag = await page.evaluate(() => document.activeElement?.tagName ?? "NONE");
      reached.push(tag);
      if (tag === "NONE") break;
    }
    // Never falls off the page into the browser chrome while still focused.
    expect(reached.filter((t) => t === "A" || t === "BUTTON" || t === "INPUT" || t === "SELECT" || t === "TEXTAREA").length)
      .toBeGreaterThanOrEqual(6);
  });
});

test.describe("reduced motion", () => {
  test("transitions and animations are disabled", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce", viewport: DESKTOP });
    const page = await context.newPage();
    await gotoHomeFresh(page);

    const animated = await page.evaluate(() => {
      const offenders: string[] = [];
      for (const el of document.querySelectorAll("*")) {
        const s = getComputedStyle(el);
        const dur = parseFloat(s.transitionDuration) + parseFloat(s.animationDuration);
        if (dur > 0) offenders.push(`${el.tagName}.${el.className} ${dur}s`);
      }
      return offenders;
    });
    expect(animated).toEqual([]);
    await context.close();
  });
});
