import { expect, type Locator, type Page } from '@playwright/test';

export class OrgAccountPage {
    private page: Page;
    private searchInput: Locator;
    private searchButton: Locator;
    private adTitles: Locator;
    private priceFromInput: Locator;
    private priceToInput: Locator;
    private filterButton: Locator;

    constructor(page: Page) {
        this.searchInput = page.locator('input[type="text"].search-input[placeholder="Я ищу..."]');
        this.searchButton = page.locator('button[type="button"].search-input-button');
        this.adTitles = page.locator('.ad-tile-horizontal-header-link-title');
        this.priceFromInput = page.locator('input[type="number"].LFInput__input[placeholder="Цена от"]');
        this.priceToInput = page.locator('input[type="number"].LFInput__input[placeholder="Цена до"]');
        this.filterButton = page.locator('button[type="button"].LFButton.medium.primary-green');
    }

    async searchForProduct(product: string) {
        await this.searchInput.fill(product);
        await this.searchButton.click();
    }

    async waitUntilAdsVisible() {
        await this.adTitles.first().waitFor({ timeout: 20000, state: 'visible' });
    }

    async getNumberOfVisibleAds() {
        const adsCount = await this.adTitles.filter({ hasText: '' }).count();
        return adsCount;
    }

    async setPriceRangeAndApplyFilter(minPrice: string, maxPrice: string) {
        await this.priceFromInput.fill(minPrice);
        await this.priceToInput.fill(maxPrice);
        await this.filterButton.click();
    }
}