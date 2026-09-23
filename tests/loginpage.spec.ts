import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage.js";
import { HomePage } from "../src/pages/HomePage.js";

import * as allure from "allure-js-commons";

// Create LoginPage page class object
let loginpage: LoginPage;
let homepage: HomePage;

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page);
  homepage = new HomePage(page);
  await loginpage.goToLoginPage();
});

test("Login page test", async ({}) => {
  let pageTitle = await loginpage.getLoginPageTitle();
  console.log("Login Page Title:", pageTitle);
  expect(pageTitle).toBe("Account Login");
});

test("forgot pwd link exists", async ({}) => {
  test.step("Validating forgot password link", async ({}) => {
    let forgottenpasswordLink =
      await loginpage.isForgottenPasswordLinkVisible();
    expect(forgottenpasswordLink).toBeTruthy();
  });
});

test("user is able to login with valid credentials", async ({}) => {
  await loginpage.doLogin("manish.wilson561@test.com", "pw123");
  expect.soft(await homepage.isLogoutLinkVisible()).toBeTruthy();
  expect(await homepage.getHomePageHeaders()).toEqual([
    "My Account",
    "My Orders",
    "My Affiliate Account",
    "Newsletter",
  ]);
});
