import { expect, test } from "@playwright/test";
import { DESKTOP, gotoHomeFresh, setReadingMode } from "./helpers";

/**
 * Interactions. Each test drives the control the way a visitor would and
 * asserts the outcome is real, not that a class was applied.
 */

test.describe("reading mode", () => {
  test("plain is the default and shows plain positioning", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    await expect(page.locator("html")).toHaveAttribute("data-reading", "plain");
    const plainCopy = page.locator(".hero-description[data-plain]");
    await expect(plainCopy).toBeVisible();
    // Plain mode must not be the technical paragraph wearing a different label.
    const text = await plainCopy.innerText();
    expect(text.toLowerCase()).not.toContain("starknet");
    expect(text.toLowerCase()).not.toContain("solidity");
  });

  test("switching to technical reveals the technical copy", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    await setReadingMode(page, "Technical");
    const techCopy = page.locator(".hero-description[data-tech]");
    await expect(techCopy).toBeVisible();
    await expect(techCopy).toContainText("Bitcoin L2");

    // The plain paragraph hides rather than duplicating the page.
    await expect(page.locator(".hero-description[data-plain]")).toBeHidden();
  });

  test("the choice survives a reload", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);
    await setReadingMode(page, "Technical");

    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("data-reading", "technical");
  });
});

test.describe("case study dialog", () => {
  test("opens, shows the project and closes on Escape", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const dialog = page.locator("dialog.case-modal");
    await expect(dialog).toBeHidden();

    await page.locator("[data-case-opener='drawbound']").click();
    await expect(dialog).toBeVisible();
    await expect(page.locator("#case-title")).toHaveText("DrawBound");
    // The deep content only exists in the dialog, so this proves the case
    // study really rendered rather than the card being cloned.
    await expect(dialog).toContainText("loan-health");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("returns focus to the card that opened it", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const opener = page.locator("[data-case-opener='drawbound']");
    await opener.click();
    await expect(page.locator("dialog.case-modal")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("dialog.case-modal")).toBeHidden();
    await expect(opener).toBeFocused();
  });

  test("a second case opens a different dialog, not the first one again", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    await page.locator("[data-case-opener='drawbound']").click();
    await expect(page.locator("#case-title")).toHaveText("DrawBound");
    await page.keyboard.press("Escape");

    await page.locator("[data-case-opener='voz']").click();
    await expect(page.locator("#case-title")).toHaveText("Voz");
    await page.keyboard.press("Escape");
  });
});

test.describe("contact dialog", () => {
  test("opens from the hero and the header is reused, not duplicated", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // One shared dialog, opened from several places.
    await expect(page.locator("dialog.contact-modal")).toHaveCount(1);

    await page.locator(".hero-actions button.btn-outline", { hasText: "Start a conversation" }).click();
    await expect(page.locator("dialog.contact-modal")).toBeVisible();

    // Closing and reopening from a different trigger reopens the same node.
    await page.locator("dialog.contact-modal button.dialog-close").click();
    await expect(page.locator("dialog.contact-modal")).toBeHidden();

    // The label is "Let’s talk" with a typographic apostrophe.
    await page.getByRole("button", { name: /talk/ }).first().click();
    await expect(page.locator("dialog.contact-modal")).toBeVisible();
  });

  test("an unconfigured form says so instead of claiming success", async ({ page, context }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    // This is the regression guard for the fixed bug: with no endpoint the
    // form must fail loudly, never report success and never post anywhere.
    await page.route("**/formspree.io/**", (route) => route.abort());
    await page.locator(".hero-actions button.btn-outline", { hasText: "Start a conversation" }).click();

    await page.fill("input[name='name']", "Test Visitor");
    await page.fill("input[name='email']", "visitor@example.com");
    await page.fill("textarea[name='message']", "A test message.");
    await page.getByRole("button", { name: "Send it over" }).click();

    const error = page.locator(".form-error[role='alert']");
    await expect(error).toBeVisible();
    await expect(error).toContainText("not connected to an inbox");
    // The typed message is preserved, so nothing is lost.
    await expect(page.locator("textarea[name='message']")).toHaveValue("A test message.");
    await expect(page.locator(".contact-success")).toHaveCount(0);
  });
});

test.describe("copy email", () => {
  test("copies the address and confirms it", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    await page.locator(".copy-btn").click();
    // Three live regions share role=status (this toast, plus the lab and work
    // filter announcements), so scope to the toast rather than the role.
    await expect(page.locator(".toast")).toContainText("copied");
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toBe("akinolaa769@gmail.com");
  });
});

test.describe("lab filter", () => {
  test("filters to a category and counts correctly", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    const cards = page.locator("#lab .project-card");
    const total = await cards.count();
    expect(total).toBe(15);

    await page.locator("#lab .filter-btn", { hasText: "Agent" }).click();
    // The filter announces its own result, which is the number a screen-reader
    // user gets, so assert against that rather than counting DOM nodes.
    await expect(page.locator("#lab [role='status']")).toContainText(
      `Showing ${await page.locator("#lab .project-card").count()} of ${total} lab projects.`,
    );
    expect(await page.locator("#lab .project-card").count()).toBeLessThan(total);

    await page.locator("#lab .filter-btn", { hasText: "All" }).click();
    await expect(page.locator("#lab .project-card")).toHaveCount(total);
  });
});

test.describe("nav active state", () => {
  test("marks the section the reader is in", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoHomeFresh(page);

    await page.locator(".main-nav a[href='#lab']").click();
    // The dot follows the scroll, so give it a beat to catch up.
    await expect(page.locator(".main-nav a[href='#lab']")).toHaveAttribute(
      "aria-current",
      "true",
      { timeout: 15_000 },
    );
    await expect(page.locator("#labHeading")).toBeInViewport();
  });
});
