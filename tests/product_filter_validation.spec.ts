import { test, expect } from '@playwright/test';
import { OrgAccountPage } from '../pages/OrgAccount.page';

test.describe('Product Search and Filtering Test Suite', () => {
    
    test('Validate Price Filter and Search', async({ page }) => {
        const accountPage = new OrgAccountPage(page);
        await page.goto('https://lalafo.kg/');
        
        const searchDetails = {
            query: 'стол',
            minPrice: '3000',
            maxPrice: '10000'
        };

        // Инициализация поиска
        await accountPage.searchProduct(searchDetails.query);
        await accountPage.waitForAds();

        // Применение фильтра по цене
        await accountPage.applyPriceFilter(searchDetails.minPrice, searchDetails.maxPrice);
        await page.waitForTimeout(20000);

        // Подсчёт результатов
        const filteredAdsCount = await accountPage.getAdsCount();
        console.log(`After filtering, the number of ads is: ${filteredAdsCount}`);

        expect(filteredAdsCount).toBeGreaterThan(0); // Добавим проверку
    });
});
