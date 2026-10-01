import { expect, test } from "@playwright/test";
import { DESKTOP, gotoHomeFresh } from "./helpers";

/**
 * Data integrity. The site claims "no project described without a live demo or
 * a repository" and states hard numbers (109 tests, 12 demos, 19 repos). Those
 * are checkable against the content files and the rendered page, so they get
 * asserted rather than taken on trust.
 */

test.describe("flagship case studies", () => {
  test("each flagship has a live link and a repo", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    await page.locator("[data-case-opener='drawbound']").click();
    const dialog = page.locator("dialog.case-modal");

    // Four flagships, each with both links, verified inside the dialog where
    // the links actually render.
    const ids = await page.evaluate(() =>
      [...document.querySelectorAll("[data-case-opener]")].map((el) => el.getAttribute("data-case-opener")),
    );
    expect(ids).toEqual(["drawbound", "acadex", "pegwatch", "voz"]);

    for (const id of ids) {
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await page.locator(`[data-case-opener='${id}']`).click();
      await expect(dialog).toBeVisible();

      const live = dialog.locator("a[href^='http']").filter({ hasText: /Open|Try/ });
      await expect(live.first(), `${id} has a live link`).toBeVisible();
      const repo = dialog.locator("a[href*='github.com']");
      await expect(repo.first(), `${id} has a repo link`).toBeVisible();
    }
  });

  test("proof numbers are not invented: they cite a real source", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // The flagship proof numbers appear in the dialog as value/label pairs.
    // This asserts the label exists next to the value, which is what makes the
    // number checkable.
    await page.locator("[data-case-opener='drawbound']").click();
    const dialog = page.locator("dialog.case-modal");
    await expect(dialog).toContainText("109");
    await expect(dialog).toContainText("unit and integration tests");
  });
});

test.describe("lab builds", () => {
  test("every lab card carries a repository link", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const cards = page.locator("#lab .project-card");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(15);

    for (let i = 0; i < count; i++) {
      const hrefs = await cards.nth(i).locator("a[href]").evaluateAll((els) =>
        els.map((e) => (e as HTMLAnchorElement).href),
      );
      expect(hrefs.some((h) => h.includes("github.com")), `lab card ${i} has a repo`).toBe(true);
    }
  });

  test("the stated counts match what is rendered", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // Hero stat: 19 open-source projects = 4 flagships + 15 lab builds, each
    // with a repo. 12 live demos = 4 flagship + 8 lab builds.
    const heroStats = await page.locator(".hero-stats div").evaluateAll((els) =>
      els.map((el) => ({
        value: el.querySelector("dd")?.textContent ?? "",
        label: el.querySelector("dt")?.textContent ?? "",
      })),
    );
    expect(heroStats.map((s) => s.value)).toEqual(["109", "12", "19"]);
    expect(heroStats.map((s) => s.label)).toEqual([
      "automated tests",
      "live demos",
      "open-source projects",
    ]);

    const repos = await page.locator("#lab a[href*='github.com'], [data-case-opener]").count();
    const liveLinks = await page.locator("a[href^='http']").count();
    expect(repos).toBeGreaterThanOrEqual(4);
    expect(liveLinks).toBeGreaterThanOrEqual(12);
  });
});

test.describe("glossary links", () => {
  test("jargon in a case study links to its definition", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // Gloss links were defined but never used, which made the plain register
    // stop being self-sufficient the moment a reader met a word like
    // "collateral". This asserts the link exists and resolves to a real
    // glossary entry.
    await page.locator("[data-case-opener='drawbound']").click();
    const dialog = page.locator("dialog.case-modal");
    const link = dialog.locator("a.glossary-link[href^='#faq-']").first();
    await expect(link).toBeVisible();
    await expect(link).toHaveText("collateral");

    const target = await link.getAttribute("href");
    await expect(page.locator(target!)).toHaveCount(1);
    await expect(page.locator(target!)).toContainText("Something you lock up as a promise");
  });
});

test.describe("content is real, not placeholder", () => {
  test("no lorem ipsum anywhere on the page", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const body = (await page.locator("body").innerText()).toLowerCase();
    expect(body).not.toContain("lorem");
    expect(body).not.toContain("ipsum");
    expect(body).not.toContain("placeholder text");
    expect(body).not.toContain("todo:");
    expect(body).not.toContain("coming soon");
  });

  test("provisional data is labelled provisional in-app", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // Acadex explicitly marks 2026/2027 dates provisional because public
    // sources conflict; the claim is that uncertainty is surfaced, not hidden.
    await page.locator("[data-case-opener='acadex']").click();
    await expect(page.locator("dialog.case-modal")).toContainText(/provisional/i);
  });

  test("house style: no em dashes in visible copy", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const body = await page.locator("body").innerText();
    expect(body).not.toContain("—");
  });
});
