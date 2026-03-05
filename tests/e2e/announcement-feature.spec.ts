import { test, expect } from '@playwright/test';

const BASE_URL = 'https://announcement-hub-7.preview.emergentagent.com';

test.describe('Announcement Banner - Restaurant Sites', () => {
  
  test('Cantina shows active announcement banner', async ({ page }) => {
    await page.goto('/site/cantina', { waitUntil: 'domcontentloaded' });
    
    // Check announcement banner is visible
    const banner = page.getByTestId('announcement-banner');
    await expect(banner).toBeVisible();
    
    // Check the message element exists and has text
    const message = page.getByTestId('announcement-message');
    await expect(message).toBeVisible();
    
    // Message should have some content
    const messageText = await message.textContent();
    expect(messageText).toBeTruthy();
    expect(messageText!.length).toBeGreaterThan(5);
  });

  test('Mercato shows success (green) announcement banner', async ({ page }) => {
    await page.goto('/site/mercato', { waitUntil: 'domcontentloaded' });
    
    // Check announcement banner is visible
    const banner = page.getByTestId('announcement-banner');
    await expect(banner).toBeVisible();
    
    // Check the message contains Kerst/Christmas menu text
    const message = page.getByTestId('announcement-message');
    await expect(message).toBeVisible();
    await expect(message).toContainText('Kerstmenu');
    
    // Verify banner has success styling (green gradient)
    const bannerBg = await banner.evaluate(el => getComputedStyle(el).background);
    expect(bannerBg).toMatch(/rgb\(4|10b981|047857/i);
  });

  test('Bottega does NOT show announcement banner when inactive', async ({ page }) => {
    await page.goto('/site/bottega', { waitUntil: 'domcontentloaded' });
    
    // Banner should not be visible
    const banner = page.getByTestId('announcement-banner');
    await expect(banner).not.toBeVisible();
    
    // Verify no spacer element either
    const spacer = page.getByTestId('announcement-spacer');
    await expect(spacer).not.toBeVisible();
  });

  test('Ascoli does NOT show announcement banner when inactive', async ({ page }) => {
    await page.goto('/site/ascoli', { waitUntil: 'domcontentloaded' });
    
    // Banner should not be visible
    const banner = page.getByTestId('announcement-banner');
    await expect(banner).not.toBeVisible();
  });

  test('Announcement banner has proper z-index and fixed position', async ({ page }) => {
    await page.goto('/site/cantina', { waitUntil: 'domcontentloaded' });
    
    const banner = page.getByTestId('announcement-banner');
    await expect(banner).toBeVisible();
    
    // Check position is fixed
    const position = await banner.evaluate(el => getComputedStyle(el).position);
    expect(position).toBe('fixed');
    
    // Check z-index is high enough (1100)
    const zIndex = await banner.evaluate(el => getComputedStyle(el).zIndex);
    expect(parseInt(zIndex)).toBeGreaterThanOrEqual(1000);
  });

  test('Announcement banner stays visible on scroll', async ({ page }) => {
    await page.goto('/site/cantina', { waitUntil: 'domcontentloaded' });
    
    const banner = page.getByTestId('announcement-banner');
    await expect(banner).toBeVisible();
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    
    // Banner should still be visible at top
    await expect(banner).toBeVisible();
    
    // Verify top position is 0
    const top = await banner.evaluate(el => getComputedStyle(el).top);
    expect(top).toBe('0px');
  });
});

test.describe('Site Admin Login', () => {
  
  test('Restaurant login page loads correctly', async ({ page }) => {
    await page.goto('/restaurant-login', { waitUntil: 'domcontentloaded' });
    
    // Check login form elements
    await expect(page.getByText('Restaurant Login')).toBeVisible();
    await expect(page.getByTestId('site-admin-email')).toBeVisible();
    await expect(page.getByTestId('site-admin-password')).toBeVisible();
    await expect(page.getByTestId('site-admin-login-btn')).toBeVisible();
  });

  test('Site admin can login with valid Cantina credentials', async ({ page }) => {
    await page.goto('/restaurant-login', { waitUntil: 'domcontentloaded' });
    
    // Fill login form
    await page.getByTestId('site-admin-email').fill('cantina@test.be');
    await page.getByTestId('site-admin-password').fill('test123');
    await page.getByTestId('site-admin-login-btn').click();
    
    // Wait for redirect to dashboard
    await page.waitForURL(/\/mijn-site/, { timeout: 10000 });
    
    // Verify we're on the dashboard - use heading role for more specificity
    await expect(page.getByRole('heading', { name: 'La Cantina Italiana' }).first()).toBeVisible();
    // Check for welcome text
    await expect(page.getByText(/Welkom/)).toBeVisible();
  });

  test('Invalid login shows error message', async ({ page }) => {
    await page.goto('/restaurant-login', { waitUntil: 'domcontentloaded' });
    
    // Fill with wrong credentials
    await page.getByTestId('site-admin-email').fill('wrong@test.be');
    await page.getByTestId('site-admin-password').fill('wrongpass');
    await page.getByTestId('site-admin-login-btn').click();
    
    // Should show error
    await expect(page.getByText(/mislukt|Invalid/i)).toBeVisible({ timeout: 5000 });
    
    // Should stay on login page
    await expect(page).toHaveURL(/restaurant-login/);
  });
});

test.describe('Site Admin Dashboard - Announcement Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/restaurant-login', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('site-admin-email').fill('cantina@test.be');
    await page.getByTestId('site-admin-password').fill('test123');
    await page.getByTestId('site-admin-login-btn').click();
    await page.waitForURL(/\/mijn-site/, { timeout: 10000 });
  });

  test('Dashboard shows Speciale Aankondiging section', async ({ page }) => {
    // Check for announcement section
    await expect(page.getByText('Speciale Aankondiging')).toBeVisible();
    
    // Check for announcement active toggle checkbox
    await expect(page.getByText('Actief op website')).toBeVisible();
    
    // Check for type selector
    await expect(page.getByText('Type bericht')).toBeVisible();
    
    // Check for announcement save button
    await expect(page.getByRole('button', { name: /Aankondiging Opslaan/i })).toBeVisible();
  });

  test('Announcement type selector has all options', async ({ page }) => {
    // Find the type select dropdown in the announcement section
    const announcementSection = page.locator('.border-orange-200').first();
    const typeSelect = announcementSection.locator('select');
    await expect(typeSelect).toBeVisible();
    
    // Check all options are available
    await expect(typeSelect.locator('option[value="info"]')).toContainText(/Informatie|blauw/i);
    await expect(typeSelect.locator('option[value="warning"]')).toContainText(/Waarschuwing|oranje/i);
    await expect(typeSelect.locator('option[value="success"]')).toContainText(/Goed nieuws|groen/i);
  });

  test('Logout button works', async ({ page }) => {
    // Find and click logout
    await page.getByTestId('site-admin-logout-btn').click();
    
    // Should redirect to login page
    await expect(page).toHaveURL(/restaurant-login/, { timeout: 5000 });
  });
});
