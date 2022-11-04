const { test, expect } = require("@playwright/test");
const { LoginPageObject } = require("./loginPageObject");

test("Checking login page", async ({ page }) => {
  const LoginPageObject = new LoginPageObject(page);
  await LoginPageObject.goto();
});
