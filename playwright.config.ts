import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright resolves its browser cache from XDG_CACHE_HOME, which on this
 * host points at the bot-desktop state directory rather than the home
 * directory. Pinning the path explicitly keeps the suite finding the
 * installed Chromium regardless of which shell launched it.
 */
process.env.PLAYWRIGHT_BROWSERS_PATH ??= `${process.env.HOME}/.cache/ms-playwright`;

/**
 * The suite runs against a real production build, not the dev server: the dev
 * server compiles lazily, so a slow first paint here would be measured as a
 * bug in the code. `npm run build && npm run serve` is the documented path;
 * these tests assume something is already listening on PORT.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? [["line"]] : [["list"]],
  timeout: 45_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: process.env.TEST_BASE_URL ?? "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "off",
    video: "off",
  },
  projects: [
    { name: "desktop-chrome", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
      // Interaction-only: a phone run of every spec is slow and adds nothing
      // the desktop project does not already cover, except where a spec calls
      // test.use({ viewport }) itself for a layout assertion.
      testMatch: /.*\.(mobile|interaction)\.spec\.ts/,
    },
  ],
});
