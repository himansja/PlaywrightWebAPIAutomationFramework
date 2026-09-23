import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class HomePage extends BasePage {
  private readonly logoutLink: Locator;
  private readonly headers: Locator;
  private readonly searchBox: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.headers = page.getByRole("heading", { level: 2 });
    this.searchBox = page.locator("input[name='search']");
    this.searchButton = page.locator("#search button");
  }

  async isLogoutLinkVisible(): Promise<boolean> {
    return await this.logoutLink.isVisible();
  }

  async getHomePageHeaders(): Promise<string[]> {
    let headers = await this.headers.allInnerTexts();
    // const headersText: string[] = [];
    // const headersCount = await this.headers.count();
    // for (let i = 0; i < headersCount; i++) {
    //     headersText.push(await this.headers.nth(i).textContent() || "");
    // }
    // return headersText;
    return headers;
  }

  async searchForProduct(productName: string): Promise<void> {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
  }
}
