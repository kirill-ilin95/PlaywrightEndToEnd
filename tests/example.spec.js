const { test, expect } = require("@playwright/test");
const { PlaywrightDevPage } = require("./playwright-dev-page");

test("getting started should contain table of contents", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.search("Test");
  await playwrightDev.clickAlertButton();
  await playwrightDev.choseDate();
});

test("Incorect login, checking errore messege", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.checkErrorMessege();
  await page.screenshot({ path: "screenshot.png" });
});

test.only("Login with valide credentials", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.loginWithValidCredentials();
  await page.screenshot({ path: "screenshot.png" });
});
