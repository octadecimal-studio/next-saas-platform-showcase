import { test, expect } from '@playwright/test';

test.describe('Products catalog', () => {
  test('/produkty lists all products', async ({ page }) => {
    await page.goto('/pl/produkty');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Nasze produkty|produkty/i);
    const cards = page.getByRole('heading', { level: 3 });
    await expect(cards).toHaveCount(3);
  });

  test('status filter works', async ({ page }) => {
    await page.goto('/pl/produkty');
    await page.getByRole('button', { name: 'Produkcja', exact: true }).click();
    const cards = page.getByRole('heading', { level: 3 });
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText('Business Data');
  });

  test('clear filters restores full list', async ({ page }) => {
    await page.goto('/pl/produkty');
    await page.getByRole('button', { name: 'Beta', exact: true }).click();
    await page.getByRole('button', { name: /wyczysc/i }).click();
    const cards = page.getByRole('heading', { level: 3 });
    await expect(cards).toHaveCount(3);
  });

  test('product detail page renders', async ({ page }) => {
    await page.goto('/pl/produkty/business-data');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Business Data Module');
    await expect(page.getByText(/REGON/i).first()).toBeVisible();
  });

  test('back link to catalog works', async ({ page }) => {
    await page.goto('/pl/produkty/tenders');
    await page.getByRole('link', { name: /nasze produkty/i }).click();
    await expect(page).toHaveURL(/\/pl\/produkty\/?$/);
  });
});
