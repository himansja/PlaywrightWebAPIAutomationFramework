import { test, expect } from "@playwright/test";

test("Inctercept request and log request", async ({ page }) => {});

// Intercept with mocking:
// mocking : fake data/response
test("Mock search data api with fake Json ", async ({ page }) => {
  let fakeProducts = [
    { name: "Fake Macbook Pro", Price: "$599" },
    { name: "Fake Iphone 18", Price: "$599" },
  ];
  // https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook
  await page.route(
    "**/index.php?route=product/search&search=macbook",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeProducts),
      });
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook')
    await page.pause();
});

//Assigment : Create two methods 401 and 500 mock
