
// PageFixtures.ts file is used to create the fixtures for the tests, so that we can use it in the tests using the baseTest.extend :Inheritance
// Own custom fixtures + Playwright fixtures can be used by simply importing the pagefixtures.ts file in the test file and using it in the test file.


// Create alias if test as baseTest, so that we can extend the baseTest to add our own fixtures
import {test as baseTest} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { BasePage } from "../pages/BasePage";
import { ProductInfoPage } from "../pages/ProductInfoPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";



// Create type for the fixtures, so that we can use it in the tests
type pageFixtures = {
    basePage: BasePage,
    loginpage: LoginPage,
    homepage: HomePage
    searchResultsPage: SearchResultsPage,
    productInfoPage: ProductInfoPage,
}

//extend the playwright test with our own fixtures, so that we can use it in the tests using the baseTest.extend :Inheritance

// here 'use' is the default export in playwright test
export let test = baseTest.extend<pageFixtures>({
    basePage : async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },
    loginpage : async ({ page }, use) => {
        let loginpage = new LoginPage(page);
        await use(loginpage);
    },
    homepage : async ({ page }, use) => {
        let homepage = new HomePage(page);
        await use(homepage);
    },
    searchResultsPage : async ({ page }, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },
    productInfoPage : async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    }
})

export { expect} from "@playwright/test";