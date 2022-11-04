const { test, expect } = require("@playwright/test");

exports.LoginPageObject = class loginPageObject {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(this.page).toHaveTitle(
      "LoginPage Practise | Rahul Shetty Academy"
    );
  }
};
