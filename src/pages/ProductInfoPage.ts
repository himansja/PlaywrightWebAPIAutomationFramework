import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class ProductInfoPage extends BasePage {
  private readonly addToCartButton: Locator;
  private readonly productTitle: Locator;
  private readonly heading: Locator;
  private readonly productImages: Locator;
  private productInfoMap: Map<string, string | number>;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole("button", { name: "Add to Cart" });
    this.productTitle = page.getByRole("heading", { level: 1 });
    this.heading = page.getByRole("heading", { level: 1 });
    this.productImages = page.locator("div#content li img");
    this.productInfoMap = new Map<string, string | number>();
  }

  async getProductTitle(): Promise<string> {
    return (await this.productTitle.textContent()) || "";
  }

  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getProductHeading(): Promise<string> {
    return await this.heading.innerText();
  }

  async getProductImagesCount(): Promise<number> {
    await this.productImages.first().waitFor({ state: "visible" }); //Wait for the first image to be visible before counting the images
    return await this.productImages.count();
  }

  async getProductInfo(): Promise<Map<string, string | number>> {
    this.productInfoMap.set("productheader", await this.getProductHeading());
    this.productInfoMap.set(
      "productimagescount",
      await this.getProductImagesCount(),
    );
    await this.getProductMetaData();
    await this.getProductPriceData();
    return this.productInfoMap;
  }

  private async getProductMetaData(): Promise<void> {
    const productMetaData = this.page.locator(
      "div#content ul.list-unstyled:nth-of-type(1) li",
    );

    const metaData = await productMetaData.allInnerTexts();
    for (let data of metaData) {
      if (data) {
        let meta = data.split(":") || [];
        let metaKey = meta[0].trim();
        let metaValue = meta[1].trim();
        this.productInfoMap.set(metaKey, metaValue);
      }
    }
  }

  private async getProductPriceData(): Promise<void> {
    const productPriceData = this.page.locator(
      "div#content ul.list-unstyled:nth-of-type(2) li",
    );

    const priceMetaData = await productPriceData.allInnerTexts();

    for (const data of priceMetaData) {
      const trimmed = data.trim();
      if (!trimmed) continue;

      if (!trimmed.includes(":")) {
        this.productInfoMap.set("productprice", trimmed);
        continue;
      }

      const [key, ...rest] = trimmed.split(":");
      const priceKey = key.trim();
      const priceValue = rest.join(":").trim();

      if (priceKey) {
        this.productInfoMap.set(priceKey, priceValue);
      }
    }
  }
}
