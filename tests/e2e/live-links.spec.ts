import { expect, test } from "@playwright/test";
import { DESKTOP, gotoHome } from "./helpers";

/**
 * Live target check, deliberately kept out of the default run.
 *
 * A dead link is a real failure of the site's central promise, but hammering
 * nineteen third-party deployments on every suite run is slow and turns a
 * transient outage into a red build. Run it on purpose:
 *
 *   npm run test:links -- --grep live
 */

test.describe("live", () => {
  test("every external link on the page resolves", async ({ page, request }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHome(page);

    const urls = await page.evaluate(() =>
      [
        ...new Set(
          [...document.querySelectorAll<HTMLAnchorElement>("a[href^='http']")].map((a) => a.href),
        ),
      ].filter((h) => !h.includes("formspree.io")), // POST-only, cannot be GET-probed
    );

    // GitHub profile appears in several places; dedupe keeps the run short.
    const results: { url: string; status: number }[] = [];
    for (const url of urls) {
      try {
        const res = await request.get(url, { timeout: 20_000, maxRedirects: 5 });
        results.push({ url, status: res.status() });
      } catch {
        results.push({ url, status: 0 });
      }
    }

    // LinkedIn answers unauthenticated crawler probes with 999, which is its
    // rate-limit/block code rather than a missing profile, so it cannot be
    // classified from here. It is reported separately instead of failing the
    // run for a response only LinkedIn can interpret.
    const blocked = results.filter((r) => r.status === 999);
    const dead = results.filter((r) => (r.status === 0 || r.status >= 400) && r.status !== 999);
    expect(
      dead,
      `dead links: ${dead.map((d) => `${d.url} (${d.status})`).join(", ")}`,
    ).toEqual([]);
    if (blocked.length) {
      console.log(`blocked by the host (999), check manually: ${blocked.map((b) => b.url).join(", ")}`);
    }
  });
});
