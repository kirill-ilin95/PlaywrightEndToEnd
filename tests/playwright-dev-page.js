const { expect } = require("@playwright/test");

exports.PlaywrightDevPage = class PlaywrightDevPage {
  constructor(page) {
    this.page = page;
    this.alertButton = page.locator("button", { hasText: "Click Me" });
    this.passedField = page.locator("p", {
      hasText: "You pressed Cancel!",
    });
    this.searchingField = page.locator("#Wikipedia1_wikipedia-search-input");
    this.firstSearchingPlace = page.locator(
      "#wikipedia-search-result-link:nth-child(1)"
    );
    this.searchingButton = page.locator(".wikipedia-search-button");
    this.datePick = page.locator("#datepicker");
    this.todayDay = page.locator(".ui-state-default.ui-state-highlight");

    //rahulShetty
    this.userName = page.locator("#username");
    this.password = page.locator("#password");
    this.singInButton = page.locator('[name="signin"]');
    this.checkBlockMessege = page.locator('[style*="block;"]');
    this.checkBoxUser = page.locator(
      ".form-check-inline .customradio:nth-child(2) .radiotextsty"
    );
    this.buttonOkAlertMessege = page.locator("#okayBtn");
    this.buttonAccepteTerms = page.locator("#terms");
    this.titles = page.locator(".card-body a");
    this.dropdown = page.locator("select.form-control");
    this.blinkingText = page.locator("[href*='documents-request']");
  }

  async goto(first) {
    if (first) {
      await this.page.goto("https://testautomationpractice.blogspot.com/");
      await expect(this.page).toHaveTitle("Automation Testing Practice");
    } else {
      await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      await expect(this.page).toHaveTitle(
        "LoginPage Practise | Rahul Shetty Academy"
      );
    }
  }

  async search(text) {
    await this.searchingField.fill(text);
    await this.searchingButton.click();
    await expect(this.firstSearchingPlace).toHaveText(text);
  }

  async checkErrorMessege() {
    await this.userName.fill("Kyrylo");
    await this.password.fill("HellEEE");
    await this.singInButton.click();
    console.log(await this.checkBlockMessege.textContent());
    await expect(this.checkBlockMessege).toContainText(
      "Incorrect username/password."
    );
  }

  async loginWithValidCredentials() {
    await this.userName.fill("rahulshettyacademy");
    await this.password.fill("learning");
    await this.dropdown.selectOption("consult");
    await this.checkBoxUser.click();
    await expect(this.checkBoxUser).toBeChecked();
    // console.log(await this.checkBoxUser.isChecked()); // for log checking result
    await this.buttonOkAlertMessege.click();
    await this.buttonAccepteTerms.click();
    await expect(this.buttonAccepteTerms).toBeChecked();
    await this.buttonAccepteTerms.uncheck();
    expect(await this.buttonAccepteTerms.isChecked()).toBeFalsy();
    await expect(this.blinkingText).toHaveAttribute("class", "blinkingText");
    await this.singInButton.click();
    //For Stability
    console.log(await this.titles.first().textContent());
    console.log(await this.titles.nth(2).textContent());
    // await this.page.waitForLoadState("networkidle");
    // await Promise.all([
    //   this.page.waitForNavigation(),
    //   this.singInButton.click(),
    // ]); // Firefix BUG (waitForNavigation) - doesn't work
    // console.log(await this.titles.allTextContents());
  }

  async clickAlertButton() {
    await this.alertButton.click();
    await expect(this.passedField).toBeVisible();
  }

  async choseDate() {
    await this.datePick.click();
    await this.todayDay.click();
    await this.page.screenshot({ path: "screenshot.png" }); // Screenshot
  }
};
