import {test,expect} from "../src/fixtures/pagefixtures.js";
import { meta, log} from "reporting-labs"


test.beforeEach(async ({loginpage}) => {
    await loginpage.goToLoginPage();
    await loginpage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test('Verify product header', async ({ homepage,searchResultsPage,productInfoPage }) => {

    meta ({ priority: 'P1',severity: 'critical', owner : 'Himmu'})
    await homepage.searchForProduct("MacBook");
    await searchResultsPage.selectProductByName("MacBook Pro");
    const productHeader = await productInfoPage.getProductHeading();
    console.log(productHeader);
    log('Product header  title : ',productHeader)
    expect(productHeader).toContain("MacBook Pro");

});

test('Verify product images count', async ({ homepage,searchResultsPage,productInfoPage }) => {
    await homepage.searchForProduct("Samsung");
    await searchResultsPage.selectProductByName("Samsung Galaxy Tab 10.1");
    expect(await productInfoPage.getProductImagesCount()).toBeGreaterThan(0);
});

test('Verify product information', async ({ homepage,searchResultsPage,productInfoPage }) => {
    await homepage.searchForProduct("MacBook");
    await searchResultsPage.selectProductByName("MacBook Pro");
    const productInfo = await productInfoPage.getProductInfo();
    expect(productInfo.get('productheader')).toContain("MacBook Pro");
    expect(productInfo.get('productimagescount')).toBeGreaterThan(0);
});
