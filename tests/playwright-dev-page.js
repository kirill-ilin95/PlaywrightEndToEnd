const { expect, Math } = require("@playwright/test");

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
    this.titlesClient = page.locator(".card-body b");
    this.dropdown = page.locator("select.form-control");
    this.blinkingText = page.locator("[href*='documents-request']");
    this.loginPageRegisterButton = page.locator(".text-reset");
    this.registerButton = page.locator('[type="submit"]');
    this.firstNameField = page.locator("#firstName");
    this.lastNameField = page.locator("#lastName");
    this.emailField = page.locator("#userEmail");
    this.mobileNumberField = page.locator("#userMobile");
    this.passwordField = page.locator("#userPassword");
    this.confirmPasswordField = page.locator("#confirmPassword");
    this.checkboxConfirmAge = page.locator('[type="checkbox"]');
    this.alertUserExisting = page.locator("#toast-container div div");
    this.loginButton = page.locator("#login");
    this.loginAllert = page.locator("#toast-container div .toast-title");
    this.products = page.locator(".card-body");
    this.cartButton = page.locator("[routerlink*='cart']");
    this.cartTittle = page.locator(".cartSection h3");
  }

  async goto(param) {
    if (param == "first") {
      await this.page.goto("https://testautomationpractice.blogspot.com/");
      await expect(this.page).toHaveTitle("Automation Testing Practice");
    } else if (param == "second") {
      await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      await expect(this.page).toHaveTitle(
        "LoginPage Practise | Rahul Shetty Academy"
      );
    } else {
      await this.page.goto("https://rahulshettyacademy.com/client");
      await expect(this.page).toHaveTitle("Let's Shop");
    }
  }

  async clickOnRegisterButtonOnLoginPage() {
    await this.loginPageRegisterButton.click();
    await expect(this.registerButton).toBeVisible();
    await this.firstNameField.fill("test123321");
    await this.lastNameField.fill("test123321");
    await this.emailField.fill("test123321@gmail.com");
    await this.mobileNumberField.fill("4387777777");
    await this.passwordField.fill("!Test123321@gmail.com");
    await this.confirmPasswordField.fill("!Test123321@gmail.com");
    await this.checkboxConfirmAge.click();
    await this.registerButton.click();
    await expect(this.alertUserExisting).toHaveText(
      " User already exisits with this Email Id! "
    );
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

  async loginInClientPage() {
    const productName = "adidas original";
    await this.emailField.fill("test123321@gmail.com");
    await this.passwordField.fill("!Test123321@gmail.com");
    await this.loginButton.click();
    await expect(this.loginAllert).toContainText(" Login Successfully ");
    await this.page.waitForLoadState("networkidle"),
      console.log(await this.titlesClient.allTextContents());
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
    await expect(this.alertUserExisting).toContainText(
      " Product Added To Cart "
    );
    await this.cartButton.click();
    await expect(this.cartTittle).toContainText("adidas original");
    // console.log(count);
    await this.page.pause();
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
