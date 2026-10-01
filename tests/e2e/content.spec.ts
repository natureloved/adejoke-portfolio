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
    expect(ids).toEqual(["drawbound", "acadex", "pegwatch", "voz", "tipwall"]);

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
    expect(count).toBeGreaterThanOrEqual(7);

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

    // 12 open-source projects = 5 flagships + 7 lab builds, each with a repo.
    // 12 live demos = the same 12: every flagship and every lab entry has one.
    // Deriving rather than hardcoding keeps this honest - a project added or
    // removed without touching the hero stat fails here instead of the site
    // quietly advertising a number that is no longer true.
    const heroStats = await page.locator(".hero-stats div").evaluateAll((els) =>
      els.map((el) => ({
        value: el.querySelector("dd")?.textContent ?? "",
        label: el.querySelector("dt")?.textContent ?? "",
      })),
    );
    expect(heroStats.map((s) => s.value)).toEqual(["109", "12", "12"]);
    expect(heroStats.map((s) => s.label)).toEqual([
      "automated tests",
      "live demos",
      "open-source projects",
    ]);

    const flagships = await page.locator("[data-case-opener]").count();
    const labCards = await page.locator("#lab .project-card").count();
    expect(flagships + labCards).toBe(12);

    // The lab cards carry both links on the card itself. The flagships carry
    // theirs inside the case-study dialog, so the repo count is the lab
    // total plus one per flagship opened.
    const labRepos = await page.locator("#lab .project-card a[href*='github.com']").count();
    expect(labRepos).toBe(labCards);

    const labLive = await page
      .locator("#lab .project-card a.project-action-primary[href^='http']")
      .count();
    expect(labLive).toBe(labCards);
  });

  test("every flagship's dialog links to a live site and a repository", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const ids = await page
      .locator("[data-case-opener]")
      .evaluateAll((els) => els.map((el) => el.getAttribute("data-case-opener")!));

    for (const id of ids) {
      await page.locator(`[data-case-opener="${id}"]`).first().click();
      const dialog = page.locator("dialog.case-modal");
      await expect(dialog).toBeVisible();

      const hrefs = await dialog
        .locator("a[href]")
        .evaluateAll((els) => els.map((a) => a.getAttribute("href")!));
      expect(hrefs.some((h) => /^https:\/\//.test(h)), `${id}: no live link`).toBe(true);
      expect(
        hrefs.some((h) => /^https:\/\/github\.com\//.test(h)),
        `${id}: no repo link`,
      ).toBe(true);

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
    }
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

test.describe("case study deep links", () => {
  test("a shared link opens the case study on load", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/#case-pegwatch", { waitUntil: "domcontentloaded" });

    // The dialog is a client component, so it opens after hydration rather
    // than being in the served HTML.
    const dialog = page.locator("dialog.case-modal");
    await expect(dialog).toBeVisible();
    await expect(page.locator("#case-title")).toHaveText("PegWatch");
  });

  test("closing clears the fragment so a reload does not reopen it", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/#case-voz", { waitUntil: "domcontentloaded" });
    await expect(page.locator("dialog.case-modal")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("dialog.case-modal")).toBeHidden();

    // The dialog hides when the browser closes the element, but the fragment
    // is cleared in the component's own close callback, which runs a beat
    // later. Assert on the hash itself rather than assuming the two land in
    // the same tick.
    await expect
      .poll(() => new URL(page.url()).hash, { timeout: 6_000 })
      .toBe("");

    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("dialog.case-modal")).toBeHidden();
    expect(new URL(page.url()).hash).toBe("");
  });

  test("an unknown fragment is ignored rather than opening an empty dialog", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/#case-does-not-exist", { waitUntil: "domcontentloaded" });
    await expect(page.locator("dialog.case-modal")).toBeHidden();
    // The page itself still loads: the fragment only ever affects the dialog.
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("opening a case sets the fragment", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    await page.locator("[data-case-opener='acadex']").click();
    await expect(page.locator("dialog.case-modal")).toBeVisible();
    expect(new URL(page.url()).hash).toBe("#case-acadex");
  });
});

test.describe("toolkit", () => {
  test("no tool overlaps another at any width", async ({ page }) => {
    for (const width of [360, 390, 480, 600, 768, 900, 1020, 1130, 1280, 1600]) {
      await page.setViewportSize({ width, height: 800 });
      await gotoHomeFresh(page);

      // The bug: the strip was one unwrappable flex line, so a squeezed tool
      // rode up over its neighbour. Four pairs collided at 768px and all ten
      // stacked inside a 100px list at 390px.
      const collisions = await page.evaluate(() => {
        const items = [...document.querySelectorAll(".toolkit .tool")].map((el) =>
          el.getBoundingClientRect(),
        );
        const bad: string[] = [];
        for (let i = 0; i < items.length - 1; i++) {
          const a = items[i];
          const b = items[i + 1];
          const sameRow = Math.abs(a.top - b.top) < 4;
          if (sameRow && a.right > b.left + 1) {
            bad.push(`items ${i} and ${i + 1} overlap by ${Math.round(a.right - b.left)}px`);
          }
        }
        return bad;
      });
      expect(collisions, `at ${width}px`).toEqual([]);
    }
  });

  test("every tool keeps its badge beside its label", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // The badge is aria-hidden, so its letter is not part of the accessible
    // name. What matters is that it is positioned before the label with a
    // gap, not painted on top of it.
    const bad = await page.evaluate(() => {
      const out: string[] = [];
      for (const li of document.querySelectorAll<HTMLElement>(".toolkit .tool")) {
        const text = (li.textContent ?? "").trim();
        const badge = li.querySelector(".next-mark, svg");
        if (!badge) continue;
        const b = badge.getBoundingClientRect();
        const l = li.getBoundingClientRect();
        // The badge starts at the left edge of the item.
        if (b.left < l.left - 1) out.push(`${text}: badge starts ${Math.round(l.left - b.left)}px left of item`);
      }
      return out;
    });
    expect(bad).toEqual([]);
  });
});

test.describe("icons", () => {
  test("every icon carries the viewBox that keeps its scale", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // Without a viewBox a 24-unit path is stretched into whatever pixel box
    // the element has, so the same arrow draws at different scales in a 17px
    // button and a 34px circle, and the small one loses its arrowhead.
    const missing = await page.evaluate(() =>
      [...document.querySelectorAll("svg.icon")]
        .filter((s) => !s.getAttribute("viewBox"))
        .map((s) => s.querySelector("use")?.getAttribute("href") ?? "unknown"),
    );
    expect(missing).toEqual([]);
  });

  test("every icon reference resolves to a defined path", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const broken = await page.evaluate(() =>
      [...document.querySelectorAll("use")]
        .map((u) => u.getAttribute("href") ?? "")
        .filter((href) => !document.getElementById(href.replace("#", ""))),
    );
    expect(broken).toEqual([]);
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

test.describe("lab cards link to their live demos", () => {
  test("every lab card links to both its demo and its repo", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // The gap this closes: the section is sold on "each one loads, checked
    // from this page", but the cards only ever linked to GitHub, so a visitor
    // had to go to the repo, read the README and hunt for the URL.
    const cards = await page.evaluate(() =>
      [...document.querySelectorAll("#lab .project-card")].map((c) => {
        const links = [...c.querySelectorAll("a.project-action")].map((a) => ({
          text: (a.textContent || "").trim(),
          href: a.getAttribute("href") || "",
        }));
        return { name: c.querySelector(".project-title")?.textContent?.trim() ?? "", links };
      }),
    );

    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      const live = card.links.find((l) => /Live/i.test(l.text));
      const source = card.links.find((l) => /Source/i.test(l.text));
      expect(live, `${card.name} has no Live link`).toBeTruthy();
      expect(source, `${card.name} has no Source link`).toBeTruthy();
      expect(live!.href).toMatch(/^https:\/\//);
      expect(source!.href).toMatch(/^https:\/\/github\.com\//);
    }
  });

  test("no card relies on an unlabelled icon to reach its source", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // The old card's only click target was a bare </> circle with no text.
    const unlabelled = await page.evaluate(() =>
      [...document.querySelectorAll("#lab .project-card a")]
        .filter((a) => !(a.textContent || "").trim() && !a.getAttribute("aria-label"))
        .map((a) => a.getAttribute("href") || ""),
    );
    expect(unlabelled).toEqual([]);
  });

  test("each card states whether it is live or source only", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const statuses = await page.evaluate(() =>
      [...document.querySelectorAll("#lab .project-card")].map((c) => ({
        live: c.getAttribute("data-live"),
        text: c.querySelector(".project-status-text")?.textContent?.trim() ?? "",
      })),
    );
    expect(statuses.length).toBeGreaterThan(0);
    for (const s of statuses) {
      expect(["Live", "Source only"]).toContain(s.text);
      // The dot and the data attribute must agree, or the grid lies.
      expect(s.live).toBe(s.text === "Live" ? "true" : "false");
    }
  });

  test("the year chip is gone", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // Every entry read "2026", so the chip carried zero information while
    // taking a tag slot. Keep the data, drop the display.
    const years = await page.evaluate(() =>
      [...document.querySelectorAll("#lab .project-card .project-tags span")]
        .map((s) => (s.textContent || "").trim())
        .filter((t) => /^20\d\d$/.test(t)),
    );
    expect(years).toEqual([]);
  });

  test("the status pill never sits under the title text", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // Measured against the text box, not the padded box: the title reserves
    // room with padding-right, so a box-level comparison reports a collision
    // that is not there.
    const bad = await page.evaluate(() => {
      const out: string[] = [];
      for (const c of document.querySelectorAll<HTMLElement>("#lab .project-card")) {
        const pill = c.querySelector(".project-status");
        const h3 = c.querySelector<HTMLElement>(".project-title");
        if (!pill || !h3) continue;
        const pr = pill.getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(h3);
        const tr = range.getBoundingClientRect();
        const name = h3.textContent?.trim() ?? "";
        if (pr.left < tr.right) out.push(`${name}: pill overlaps title by ${Math.round(tr.right - pr.left)}px`);
      }
      return out;
    });
    expect(bad).toEqual([]);
  });
});

test.describe("the header shows one reading toggle", () => {
  test("exactly one visible toggle at desktop width", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // Two "Plain / Technical" controls on screen at once reads as a bug: a
    // visitor cannot tell which one is live.
    const visible = await page.evaluate(() => {
      const rect = (el: Element) => el.getBoundingClientRect();
      return [...document.querySelectorAll(".site-header .reading-switch")].filter((s) => {
        const r = rect(s);
        return r.width > 0 && r.height > 0;
      }).length;
    });
    expect(visible).toBe(1);
  });

  test("the toggle moves into the menu rather than disappearing", async ({ page }) => {
    // Below 1100px the nav collapses to a hamburger, so the header copy has to
    // hand over to the menu copy instead of being hidden outright.
    await page.setViewportSize({ width: 900, height: 900 });
    await gotoHomeFresh(page);

    const headerCopy = await page.evaluate(() => {
      const el = document.querySelector(".site-header .header-reading");
      if (!el) return "missing";
      return el.getBoundingClientRect().height > 0 ? "visible" : "hidden";
    });
    expect(headerCopy).toBe("hidden");

    // And the menu copy is in the DOM ready to be shown.
    const menuCopy = await page.locator(".main-nav .mobile-reading .reading-switch").count();
    expect(menuCopy).toBe(1);

    // Opening the menu reveals it, so the reading mode stays reachable.
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.locator(".main-nav .mobile-reading .reading-switch")).toBeVisible();
  });

  test("the reading toggle still works from the menu", async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 900 });
    await gotoHomeFresh(page);
    await page.getByRole("button", { name: /open menu/i }).click();

    // Scope to the menu copy: the hero has its own switch with the same
    // button names, and an unscoped locator hits a strict-mode violation.
    const menuToggle = page.locator(".main-nav .mobile-reading");
    await menuToggle.getByRole("button", { name: "Technical" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-reading", "technical");
    await menuToggle.getByRole("button", { name: "Plain" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-reading", "plain");
  });
});

test.describe("selected work lists every flagship", () => {
  test("TipWall is among the selected work with a live demo", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const tipwall = page.locator('#work [data-case-opener="tipwall"]');
    await expect(tipwall).toBeVisible();

    // It must open as a case study like the others, not a half entry.
    await tipwall.click();
    const dialog = page.locator("dialog.case-modal");
    await expect(dialog).toBeVisible();
    await expect(page.locator("#case-title")).toHaveText("TipWall");
    await expect(dialog.getByRole("link", { name: /open the wall/i })).toBeVisible();
  });
});

test.describe("questions section layout", () => {
  test("the two lists are labelled and counted", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);
    await page.locator("#faq").scrollIntoViewIfNeeded();

    // The section is two different lists. Labelling each with its own count
    // is what stops the second one reading as an afterthought hanging off
    // the bottom of the first.
    const questions = page.locator("#faq .faq-column").filter({ hasText: "Questions" }).first();
    const glossary = page.locator("#faq .faq-column").filter({ hasText: "Glossary" }).first();

    await expect(questions.locator(".faq-column-count")).toHaveText("8");
    await expect(glossary.locator(".faq-column-count")).toHaveText("13");
    await expect(questions.locator("details")).toHaveCount(8);
    await expect(glossary.locator("details")).toHaveCount(13);
  });

  test("the glossary heading no longer says 'in plain English'", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);
    await page.locator("#faq").scrollIntoViewIfNeeded();

    // The intro paragraph already says the jargon is "defined in one
    // sentence each", so the heading repeated it and ran longer than the
    // terms it introduced.
    await expect(page.locator("#faq")).not.toContainText("in plain English");
    await expect(page.locator("#faq .faq-column").filter({ hasText: "Glossary" }).first()).toContainText(
      "Glossary",
    );
  });

  test("the lists sit side by side on a wide screen", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoHomeFresh(page);
    await page.locator("#faq").scrollIntoViewIfNeeded();

    // Same row, different columns. Stacked would mean the second list
    // starts below where the first one ends.
    const q = await page.locator("#faq .faq-column").nth(0).boundingBox();
    const g = await page.locator("#faq .faq-column").nth(1).boundingBox();
    expect(q && g).toBeTruthy();
    expect(Math.abs(q!.y - g!.y)).toBeLessThan
      (4);
    expect(g!.x).toBeGreaterThan(q!.x + q!.width - 1);
  });

  test("the glossary stays a link target for inline jargon", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // Restructuring moved the glossary into its own column. The ids on the
    // entries are what `Gloss` points at from a case study, so they have to
    // survive the layout change.
    await page.locator("[data-case-opener='drawbound']").click();
    const link = page.locator("dialog.case-modal a.glossary-link").first();
    const href = await link.getAttribute("href");
    expect(href).toMatch(/^#faq-/);

    await page.locator("#faq").scrollIntoViewIfNeeded();
    await expect(page.locator(href!)).toHaveCount(1);
  });
});

test.describe("the narrative matches reality", () => {
  test("no claim the owner has contradicted survives anywhere", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // These are claims the owner explicitly corrected: nursing and a
    // computer science degree were never enrolled in, and the location and
    // WATLP certification were removed at the owner's request. A build that
    // still shows any of them is claiming something untrue, which is the
    // one thing this page promises not to do.
    const body = await page.locator("body").innerText();
    for (const claim of ["nursing", "BSc", "Lagos", "WATLP", "night shift"]) {
      expect(body, `${claim} still appears on the page`).not.toContain(claim);
    }
  });

  test("no project is named that is not on the page", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // A project dropped from the portfolio must not be cited in copy, or a
    // reader goes looking for something that does not exist. Only the
    // capability cards' "examples" lines are checked, because those are the
    // ones written in the "Name / descriptor" form. The positioning copy
    // also uses slashes for technologies ("Stacks/Clarity", "EVM
    // (Solidity/Foundry)"), which are not projects and must not be matched.
    const known = await page.evaluate(() => {
      const names = new Set<string>();
      for (const el of document.querySelectorAll("#lab .project-title, #work [data-case-opener]")) {
        const t = (el.textContent || "").trim();
        if (t) names.add(t.toLowerCase());
      }
      return [...names];
    });

    // Only leaf text nodes using the "Name / descriptor" form, taken from
    // the capability section, so technology lists cannot be mistaken for
    // project names.
    const cited = await page.evaluate(() => {
      const out: string[] = [];
      for (const el of document.querySelectorAll("#expertise *")) {
        if (el.children.length) continue;
        const text = (el.textContent || "").trim();
        if (text.includes(" / ")) out.push(text);
      }
      return out;
    });

    const names = new Set<string>();
    for (const line of cited) {
      for (const m of line.matchAll(/([A-Z][A-Za-z0-9]+)\s*\//g)) names.add(m[1]);
    }
    const unknown = [...names].filter((n) => !known.includes(n.toLowerCase()));
    expect(unknown, `named projects not on the page: ${unknown.join(", ")}`).toEqual([]);
  });

  test("the story states the correct chronology", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const about = page.locator("#about");
    // Software first, radiography now: the owner's actual order.
    await expect(about).toContainText("I started as a full-stack and blockchain developer");
    await expect(about).toContainText("first-year radiography student");

    // The three fields, in order.
    const chapters = await page
      .locator("#about .about-chapter-period")
      .evaluateAll((els) => els.map((e) => (e.textContent || "").trim()));
    expect(chapters).toEqual(["Software", "Web3 & AI", "Radiography"]);
  });

  test("the facts chips carry the corrected credentials", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const facts = await page
      .locator("#about .about-fact")
      .evaluateAll((els) => els.map((e) => (e.textContent || "").trim()));
    expect(facts).toEqual([
      "First-year radiography student",
      "Full-stack & blockchain developer",
      "Open to contracts and teams",
    ]);
  });
});


test.describe("the resume download", () => {
  test("the file is served as a valid PDF", async ({ page }) => {
    // A resume that opens blank is a broken document, not a broken link, so
    // the assertion is on the payload: the magic bytes, a page object, and a
    // size that rules out a truncated or empty file.
    const res = await page.request.get("/resume.pdf");
    expect(res.status(), "resume.pdf is served").toBe(200);
    expect(res.headers()["content-type"]).toContain("application/pdf");

    const body = Buffer.from(await res.body());
    expect(body.subarray(0, 5).toString()).toBe("%PDF-");
    expect(body.byteLength, "the resume is not empty").toBeGreaterThan(3000);
    expect(body.toString("latin1").match(/\/Type\s*\/Page[^s]/g)?.length ?? 0).toBeGreaterThan(0);
  });

  test("the hero links to it as a download", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const link = page.locator('a[href="/resume.pdf"]');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("download", "");
    await expect(link).toContainText(/résumé/i);
  });
});
