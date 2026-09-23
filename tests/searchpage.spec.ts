import { test, expect } from "../src/fixtures/pagefixtures.js";
import { CsvHelper } from "../src/utils/CsvHelper.js";

test.beforeEach(async ({ loginpage }) => {
  await loginpage.goToLoginPage();
  await loginpage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

let productData = CsvHelper.readCsvFile("src/testdata/productdata.csv");
for (let [index, row] of productData.entries()) {
  test(`Search for ${row.searchKey ?? "undefined"} - ${row.productName ?? "undefined"} and ${index} verify results count using data-driven approach`, async ({
    homepage,
    searchResultsPage,
  }) => { 
    await homepage.searchForProduct(row.searchKey!);
    let resultsCount = await searchResultsPage.getPRoductSeachResultsCount();
    expect(resultsCount).toBe(Number(row.resultsCount));
  });
}

test("search for a product and verify results count", async ({
  homepage,
  searchResultsPage,
}) => {
  await homepage.searchForProduct("MacBook");

  let resultsCount = await searchResultsPage.getPRoductSeachResultsCount();
  expect(resultsCount).toBeGreaterThan(0);
});

test("verify search results are visible and clickable", async ({
  homepage,
  searchResultsPage,
  productInfoPage,
}) => {
  await homepage.searchForProduct("MacBook");
  const searchResults = await searchResultsPage.selectProductByName("MacBook");
  expect(searchResults).toContain("MacBook");
  expect(await productInfoPage.getProductTitle()).toContain("MacBook");
});
