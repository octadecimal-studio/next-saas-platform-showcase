import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('redirects / to /pl', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(/\/pl\/?$/);
  });

  test('loads Polish homepage with hero', async ({ page }) => {
    await page.goto('/pl');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Dane i automatyzacja');
    await expect(page.getByRole('link', { name: /produkty/i }).first()).toBeVisible();
  });

  test('loads English homepage', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Data and automation');
  });

  test('displays 3 product cards', async ({ page }) => {
    await page.goto('/pl');
    const cards = page.locator('#products').getByRole('heading', { level: 3 });
    await expect(cards).toHaveCount(3);
  });

  test('switches locale via LocaleSwitcher', async ({ page }) => {
    await page.goto('/pl');
    await page.getByRole('button', { name: 'EN' }).first().click();
    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Data');
  });

  test('has functioning footer links', async ({ page }) => {
    await page.goto('/pl');
    await expect(page.getByRole('link', { name: /polityka prywatnosci/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /regulamin/i })).toBeVisible();
  });
});
