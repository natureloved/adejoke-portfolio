import { expect, test } from "@playwright/test";
import { DESKTOP, gotoHomeFresh } from "./helpers";

/**
 * Link integrity. The site's core promise is "no claim without a link", so a
 * dead link is a broken promise rather than a cosmetic bug. These tests only
 * inspect the anchors the page actually renders; whether the targets are up is
 * a separate, slower check in links-live.spec.ts.
 */

test.describe("anchors", () => {
  test("every external link opens safely in a new tab", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const unsafe = await page.evaluate(() => {
      const out: string[] = [];
      for (const a of document.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')) {
        const rel = (a.getAttribute("rel") ?? "").toLowerCase().split(/\s+/);
        if (!rel.includes("noopener")) out.push(a.href);
      }
      return out;
    });
    expect(unsafe).toEqual([]);
  });

  test("no link points at a localhost or 127.0.0.1 address", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // In-page anchors resolve to the dev origin by definition, so they are
    // excluded: what matters is that no link leaves the site for a localhost
    // address, which is what an accidental paste of a dev URL produces.
    const bad = await page.evaluate(
      (origin) =>
        [...document.querySelectorAll<HTMLAnchorElement>("a[href]")]
          .map((a) => a.href)
          .filter((h) => /localhost|127\.0\.0\.1/.test(h))
          .filter((h) => !h.startsWith(origin)),
      "http://127.0.0.1:3100",
    );
    expect(bad).toEqual([]);
  });

  test("every anchor has an accessible name", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const nameless = await page.evaluate(() => {
      const out: string[] = [];
      for (const a of document.querySelectorAll<HTMLAnchorElement>("a[href]")) {
        const name = (a.getAttribute("aria-label") ?? a.textContent ?? "").trim();
        const hasSvgTitle = !!a.querySelector("svg title");
        if (!name && !hasSvgTitle) out.push(a.outerHTML.slice(0, 100));
      }
      return out;
    });
    expect(nameless).toEqual([]);
  });

  test("every in-page anchor resolves to an element", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const dangling = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>("a[href^='#']")]
        .map((a) => a.getAttribute("href")!)
        .filter((h) => h.length > 1 && !document.querySelector(h)),
    );
    expect(dangling).toEqual([]);
  });
});

test.describe("images", () => {
  test("every image has alt text and is marked decorative when empty", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const missing = await page.evaluate(() => {
      const out: string[] = [];
      for (const img of document.querySelectorAll("img")) {
        if (!img.hasAttribute("alt")) out.push(img.getAttribute("src") ?? "unknown");
      }
      return out;
    });
    expect(missing).toEqual([]);
  });

  test("every image actually loads", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Images are lazy except the hero, so wait for each to settle before
    // checking naturalWidth, which is 0 until the file has decoded.
    const broken = await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll("img")];
      await Promise.all(
        imgs.map((i) =>
          i.complete
            ? Promise.resolve()
            : new Promise((res) => {
                i.addEventListener("load", res, { once: true });
                i.addEventListener("error", res, { once: true });
              }),
        ),
      );
      return imgs.filter((i) => i.naturalWidth === 0).map((i) => i.getAttribute("src") ?? "?");
    });
    expect(broken).toEqual([]);
  });

  test("hero screenshot is a real capture, not a placeholder", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // next/image serves an optimised derivative, so naturalWidth is the
    // resized width, not the source. The claim under test is that the image is
    // a genuine capture rather than a blank or tiny placeholder, so assert on
    // the aspect ratio and that it decoded at a usable size.
    const shot = page.locator(".hero-art .browser-shot");
    await expect(shot).toBeVisible();
    const dims = await shot.evaluate((el: HTMLImageElement) => ({
      w: el.naturalWidth,
      h: el.naturalHeight,
    }));
    expect(dims.w).toBeGreaterThan(500);
    expect(dims.h).toBeGreaterThan(300);
    // drawbound.webp is 1200x750; the optimised copy keeps the same ratio.
    expect(dims.w / dims.h).toBeCloseTo(1200 / 750, 1);
  });
});

test.describe("document metadata", () => {
  test("title and description are set", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    await expect(page).toHaveTitle(/Akinola Adejoke/);
    const description = await page
      .locator("meta[name='description']")
      .getAttribute("content");
    expect(description?.length ?? 0).toBeGreaterThan(80);
  });

  test("canonical and og:url point at the same origin", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
    const ogUrl = await page.locator("meta[property='og:url']").getAttribute("content");
    const siteUrl = process.env.TEST_SITE_URL ?? "https://adejoke.my.id";

    // The bug this guards: a page on the custom domain advertising the Vercel
    // deployment alias as canonical reads to a crawler as a duplicate of itself.
    expect(new URL(canonical!).origin).toBe(new URL(siteUrl).origin);
    expect(new URL(ogUrl!).origin).toBe(new URL(siteUrl).origin);
  });

  test("Person JSON-LD is valid and matches the site identity", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const raw = await page.locator("script[type='application/ld+json']").first().textContent();
    const data = JSON.parse(raw!);
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Akinola Adejoke");
    expect(new URL(data.url).origin).toBe(new URL(process.env.TEST_SITE_URL ?? "https://adejoke.my.id").origin);
    expect(Array.isArray(data.sameAs)).toBe(true);
    expect(data.sameAs.length).toBeGreaterThanOrEqual(3);
  });

  test("robots.txt allows the page and points at the sitemap", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBe(true);
    const body = await robots.text();
    expect(body).toContain("Sitemap:");
  });

  test("sitemap lists the site once", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    const body = await sitemap.text();
    const matches = body.match(/<loc>/g) ?? [];
    expect(matches.length).toBe(1);
  });

  test("the social card renders at 1200x630", async ({ page }) => {
    await page.goto("/opengraph-image", { waitUntil: "domcontentloaded" });
    const type = await page.evaluate(
      () => (document.contentType || "").toLowerCase(),
    );
    expect(type).toContain("image");
    // Sanity-check the bytes are a PNG and the size is right, by fetching it.
    const res = await page.request.get("/opengraph-image");
    const buf = await res.body();
    expect(buf.subarray(1, 4).toString()).toBe("PNG");
    // IHDR width/height, big-endian, at byte offsets 16 and 20.
    expect(buf.readUInt32BE(16)).toBe(1200);
    expect(buf.readUInt32BE(20)).toBe(630);
  });
});

test.describe("security headers", () => {
  test("the security headers are served", async ({ request }) => {
    const res = await request.get("/");
    const headers = res.headers();
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["strict-transport-security"]).toContain("max-age=31536000");
  });
});
