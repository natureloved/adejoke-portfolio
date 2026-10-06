/**
 * Verifies the contact form honeypot end to end against the live dev server.
 *
 * 1. bot case: honeypot filled -> no network POST to Formspree, but the visitor
 *    still sees the success message (a bot learns nothing from "rejected")
 * 2. human case: honeypot empty -> a POST to Formspree is actually attempted
 */
import { chromium } from "@playwright/test";

process.env.PLAYWRIGHT_BROWSERS_PATH ??= `${process.env.HOME}/.cache/ms-playwright`;

const BASE = "http://localhost:3000";
/**
 * XDG_CACHE_HOME points at the bot-desktop state, so Playwright resolves its
 * browser cache there instead of ~/.cache. Point at the full Chromium build
 * explicitly; the headless shell it wants by default is a different revision.
 */
const BROWSER = "/home/ubuntu/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

let failures = [];
const log = (...a) => console.log(...a);

async function openDialog(page) {
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("h1");
  // Three triggers share one dialog; click the section's own button and wait
  // for the dialog to actually open before touching anything inside it.
  await page.locator(".contact-section button:has-text('Start a conversation')").click();
  await page.waitForFunction(
    () => document.querySelector("dialog.contact-modal")?.open === true,
  );
  await page.waitForSelector(".contact-modal form", { state: "visible" });
}

const browser = await chromium.launch({ executablePath: BROWSER });

// ---------- case 1: bot ----------
{
  const page = await browser.newPage();
  const posts = [];
  page.on("request", (r) => {
    if (r.url().includes("formspree")) posts.push(r.url());
  });
  await openDialog(page);

  const hp = page.locator("input[name='company_website']");
  const hidden = await hp.evaluate((el) => {
    const d = el.closest("div");
    const s = getComputedStyle(d);
    return s.position === "absolute" && d.className.includes("sr-only");
  });
  log("honeypot present in DOM:", (await hp.count()) === 1);
  log("honeypot hidden via sr-only:", hidden);
  if ((await hp.count()) !== 1) failures.push("honeypot field missing from DOM");

  await page.fill("input[name='name']", "Bot Test");
  await page.fill("input[name='email']", "bot@example.com");
  await page.fill("textarea[name='message']", "Simulated bot submission.");
  await page.locator("input[name='company_website']").fill("http://spam.example");
  posts.length = 0;
  await page.click(".contact-modal button.form-submit");
  await page.waitForTimeout(1500);

  const ok = (await page.locator(".contact-success").count()) > 0;
  log("\n[bot] success message shown to visitor:", ok);
  log("[bot] POSTs to formspree:", posts.length, posts);
  if (!ok) failures.push("bot case did not show success message");
  if (posts.length !== 0) failures.push(`bot case leaked ${posts.length} POST(s) to Formspree`);
  await page.close();
}

// ---------- case 2: human ----------
{
  const page = await browser.newPage();
  const posts = [];
  page.on("request", (r) => {
    if (r.url().includes("formspree")) posts.push(r.url());
  });
  // Fresh page so the dialog starts closed (the bot case left it open).
  await openDialog(page);

  await page.fill("input[name='name']", "Real Person");
  await page.fill("input[name='email']", "person@example.com");
  await page.fill("textarea[name='message']", "A real enquiry about a project.");
  posts.length = 0;
  await page.click(".contact-modal button.form-submit");
  await page.waitForTimeout(2500);

  log("\n[human] POSTs to formspree:", posts.length, posts);
  const fb = page.locator(".contact-modal .form-error, .contact-modal .contact-success");
  const shown = (await fb.count()) > 0;
  const text = shown ? await fb.first.innerText() : "";
  log("[human] dialog feedback shown:", shown);
  log("[human] feedback:", JSON.stringify(text.trim().slice(0, 90)));
  if (posts.length === 0) failures.push("human case did not POST to Formspree (form broken for real users)");
  await page.close();
}

await browser.close();
log("\n" + "=".repeat(50));
if (failures.length) {
  log("FAILED:");
  for (const f of failures) log("  -", f);
  process.exit(1);
}
log("ALL CHECKS PASSED");
