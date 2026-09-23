import type { Locator,Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class SearchResultsPage extends BasePage {
  private readonly addToCartButton: Locator;
  private readonly productTitle: Locator;
  private readonly searchResults: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole("button", { name: "Add to Cart" });
    this.productTitle = page.getByRole("heading", { level: 1 });
    this.searchResults = page.locator("div.search-results");
  }



  async getPRoductSeachResultsCount(): Promise<number> {
    return await this.searchResults.count();
  }

  async isSearchResultsVisible(): Promise<boolean> {
    return await this.searchResults.isVisible();
  }

  async selectProductByName(productName: string): Promise<void> {
    const productLocator = this.page.getByRole('img', { name: productName });   //dynamic locator for product name
    await productLocator.click();
  }
}
