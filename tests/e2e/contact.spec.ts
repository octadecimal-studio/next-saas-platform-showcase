import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test('contact page loads with form', async ({ page }) => {
    await page.goto('/pl/kontakt');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByLabel(/imie i nazwisko/i)).toBeVisible();
    await expect(page.getByLabel(/^email/i)).toBeVisible();
    await expect(page.getByLabel(/wiadomosc/i)).toBeVisible();
  });

  test('validation shows errors on empty submit', async ({ page }) => {
    await page.goto('/pl/kontakt');
    await page.getByRole('button', { name: /wyslij/i }).click();
    await expect(page.getByText(/min\. 2 znaki/i).first()).toBeVisible();
  });

  test('validation rejects invalid email', async ({ page }) => {
    await page.goto('/pl/kontakt');
    await page.getByLabel(/imie i nazwisko/i).fill('Jan Test');
    await page.getByLabel(/^email/i).fill('invalid-email');
    await page.getByLabel(/wiadomosc/i).fill('This is a valid test message for e2e.');
    await page.getByLabel(/wyrazam zgode/i).check();
    await page.getByRole('button', { name: /wyslij/i }).click();
    await expect(page.getByText(/nieprawidlowy adres email/i)).toBeVisible();
  });

  test('valid submission triggers API', async ({ page }) => {
    await page.route('**/api/leads', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });
    await page.goto('/pl/kontakt');
    await page.getByLabel(/imie i nazwisko/i).fill('Jan Test');
    await page.getByLabel(/^email/i).fill('jan@test.pl');
    await page.getByLabel(/wiadomosc/i).fill('This is a valid test message for e2e automation.');
    await page.getByLabel(/wyrazam zgode/i).check();
    await page.getByRole('button', { name: /wyslij/i }).click();
    await expect(page.getByText(/dziekujemy/i)).toBeVisible();
  });
});
