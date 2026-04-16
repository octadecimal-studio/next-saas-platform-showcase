import { test, expect } from '@playwright/test';

test.describe('i18n routing', () => {
  test('/pl renders Polish content', async ({ page }) => {
    await page.goto('/pl');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.getByText('Nasze produkty')).toBeVisible();
  });

  test('/en renders English content', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByText('Our products')).toBeVisible();
  });

  test('/ redirects to /pl', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/pl\/?$/);
  });

  test('invalid locale returns 404', async ({ page }) => {
    const response = await page.goto('/de');
    expect(response?.status()).toBe(404);
  });

  test('pages have hreflang alternates', async ({ page }) => {
    await page.goto('/pl/produkty');
    const html = await page.content();
    expect(html).toContain('pl');
    expect(html).toContain('en');
  });
});
