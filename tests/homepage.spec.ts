import { test, expect } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage.js";
import { LoginPage } from "../src/pages/LoginPage.js";

let loginpage: LoginPage;
let homepage: HomePage;

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page);
  await loginpage.goToLoginPage();
  await loginpage.doLogin("manish.wilson561@test.com", "pw123");
  homepage = new HomePage(page);
});

test("Logout link exists", async ({}) => {
  let logoutLink = await homepage.isLogoutLinkVisible();
  expect(logoutLink).toBeTruthy();
});

test("Home page headers", async ({}) => {
  let allHeaders = await homepage.getHomePageHeaders();
  console.log("Home Page Headers:", allHeaders);
  expect.soft(allHeaders).toHaveLength(4);
  expect(allHeaders).toEqual([
    "My Account",
    "My Orders",
    "My Affiliate Account",
    "Newsletter"
  ]);
});
