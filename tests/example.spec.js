const { test, expect } = require("@playwright/test");
const { PlaywrightDevPage } = require("./playwright-dev-page");

test("getting started should contain table of contents", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto("first");
  await playwrightDev.search("Test");
  await playwrightDev.clickAlertButton();
  await playwrightDev.choseDate();
});

test("Incorect login, checking errore messege", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto("second");
  await playwrightDev.checkErrorMessege();
});

test("Login with valide credentials", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto("first");
  await playwrightDev.loginWithValidCredentials();
});

test("Childe browser window page handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);
  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await page.locator("#username").type(domain);
  console.log(await page.locator("#username").textContent());
});

test("Create account and save credentials", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.clickOnRegisterButtonOnLoginPage();
});

test.only("Login with valid credentials and buy product", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.loginInClientPage();
  await playwrightDev.addProductToCart();
  await playwrightDev.clickOnCheckoutAndBuyProduct();
});
