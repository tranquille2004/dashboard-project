import { Page, expect } from '@playwright/test';

export async function waitForAppReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
}

export async function dismissToasts(page: Page) {
  await page.addLocatorHandler(
    page.locator('[data-sonner-toast], .Toastify__toast, [role="status"].toast, .MuiSnackbar-root'),
    async () => {
      const close = page.locator('[data-sonner-toast] [data-close], [data-sonner-toast] button[aria-label="Close"], .Toastify__close-button, .MuiSnackbar-root button');
      await close.first().click({ timeout: 2000 }).catch(() => {});
    },
    { times: 10, noWaitAfter: true }
  );
}

export async function checkForErrors(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const errorElements = Array.from(
      document.querySelectorAll('.error, [class*="error"], [id*="error"]')
    );
    return errorElements.map(el => el.textContent || '').filter(Boolean);
  });
}

export async function navigateToAscoli(page: Page) {
  await page.goto('/site/ascoli', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
}

export async function switchLanguage(page: Page, lang: 'nl' | 'fr' | 'en') {
  // Click on current language to open dropdown
  await page.locator('nav').getByText(/^(NL|FR|EN)$/i).first().click();
  await page.waitForTimeout(300);
  // Select the target language
  await page.getByText(lang.toUpperCase(), { exact: true }).click();
  await page.waitForTimeout(500);
}
