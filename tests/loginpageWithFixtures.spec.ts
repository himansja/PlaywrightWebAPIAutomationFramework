import { test, expect } from "../src/fixtures/pagefixtures.js";
import { CsvHelper } from "../src/utils/CsvHelper.js";
import { ExcelHelper } from "../src/utils/ExcelHelper.js";
import { JsonHelper } from "../src/utils/JsonHelper.js";

test.beforeEach(async ({ loginpage }) => {
  await loginpage.goToLoginPage();
});

test("login with valid credentials", async ({ loginpage, homepage }) => {
  await loginpage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

  await expect(await homepage.isLogoutLinkVisible()).toBeTruthy();
});

test("forgot password link exists", async ({ loginpage }) => {
  let forgottenpasswordLink = await loginpage.isForgottenPasswordLinkVisible();
  expect(forgottenpasswordLink).toBeTruthy();
});

test("Login page test", async ({ loginpage }) => {
  let pageTitle = await loginpage.getLoginPageTitle();
  console.log("Login Page Title:", pageTitle);
  expect(pageTitle).toBe("Account Login");
});

test("user is not able to login with invalid credentials", async ({
  loginpage,
}) => {
  await loginpage.doLogin("invalid@test.com", "invalidpassword");
  expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
});

// ****************Using CSV ****************//

// Pros: 
// 1. light weight
// 2. easy to maintain
// 3. easy to read
// 4. 3rd party lib, no license
// 5. flat files
let testData = CsvHelper.readCsvFile("src/testdata/logindata.csv");
for (let row of testData) {
  test(`login with ${row.username} and ${row.password}`, async ({
    loginpage,
    homepage,
  }) => {
    await loginpage.doLogin(row.username!, row.password!);
    if (row.expectedResult === "success") {
      await expect(await homepage.isLogoutLinkVisible()).toBeTruthy();
    } else {
      expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
  });
}


// ****************Using Excel ****************//
//cons:
//1. maintenance
//2. MS Licensces
 
// Using excel file to read the data and perform login test using data driven approach
// let excelData = ExcelHelper.readExcelFile("src/testdata/opencartestdata.xlsx", "login");
// for (let row of excelData) {
//   test(`login with excel ${row.username} and ${row.password}`, async ({
//     loginpage,
//     homepage,
//   }) => {
//     await loginpage.doLogin(row.username!, row.password!);
//     if (row.expectedResult === "success") {
//       await expect(await homepage.isLogoutLinkVisible()).toBeTruthy();
//     } else {
//       expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
//     }
//   });
// }


// ****************Using JSON ****************//
// 1. inbuilt method parse, light weight, smaler data source
let jsonData = JsonHelper.readJson('src/testdata/logindata.json')
for (let data of jsonData) {
 test(`login with Json data files ${data.username} and ${data.password}`, async ({
    loginpage,
    homepage,
  }) => {
    await loginpage.doLogin(data.username!, data.password!);
    if (data.expectedResult === "success") {
      await expect(await homepage.isLogoutLinkVisible()).toBeTruthy();
    } else {
      expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
  });
}

//Registration page form using the data driven approach using CSV file
