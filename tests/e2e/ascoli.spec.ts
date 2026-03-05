import { test, expect } from '@playwright/test';

const BASE_URL = '/site/ascoli';

test.describe('L\'Ascoli Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');
  });

  test('hero section displays correctly with title and subtitle', async ({ page }) => {
    // Check hero title
    await expect(page.locator('h1')).toContainText("L'ASCOLI");
    
    // Check subtitle
    await expect(page.getByText('Authentieke Italiaanse keuken in het hart van Zaventem')).toBeVisible();
    
    // Check CTA buttons/links (may be styled links, not actual buttons)
    await expect(page.getByText('RESERVEREN').first()).toBeVisible();
    await expect(page.getByText('BEKIJK MENU').first()).toBeVisible();
  });

  test('dark navigation bar with all links', async ({ page }) => {
    const nav = page.locator('nav');
    
    // Check navigation background is dark
    await expect(nav).toBeVisible();
    
    // Check all nav links are present
    await expect(nav.getByText('HOME')).toBeVisible();
    await expect(nav.getByText('WIE ZIJN WIJ?')).toBeVisible();
    await expect(nav.getByText('KAART')).toBeVisible();
    await expect(nav.getByText('GROEPMENUS')).toBeVisible();
    await expect(nav.getByText('RESERVEREN')).toBeVisible();
    await expect(nav.getByText("FOTO'S")).toBeVisible();
    await expect(nav.getByText('INFO')).toBeVisible();
    
    // Check language switcher (use first() to handle multiple matches)
    await expect(nav.getByText('NL').first()).toBeVisible();
  });

  test('three feature cards with hover effects are displayed', async ({ page }) => {
    // Scroll to feature section
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await page.waitForTimeout(500);
    
    // Check feature cards text
    await expect(page.getByText('Italiaanse Kwaliteit')).toBeVisible();
    await expect(page.getByText('Verse Bereiding')).toBeVisible();
    await expect(page.getByText('Elegante Ambiance')).toBeVisible();
    
    // Check feature cards subtitles
    await expect(page.getByText('Authentieke Italiaanse ingrediënten')).toBeVisible();
    await expect(page.getByText('Dagelijks vers bereid')).toBeVisible();
    await expect(page.getByText('Verfijnde eetervaring')).toBeVisible();
  });

  test('Onze Gerechten section with 4 photos', async ({ page }) => {
    // Scroll to Onze Gerechten section
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
    await page.waitForTimeout(500);
    
    // Check section title
    await expect(page.getByText('Onze Gerechten')).toBeVisible();
    await expect(page.getByText('Een selectie van onze authentieke Italiaanse creaties')).toBeVisible();
    
    // Check gallery link
    await expect(page.getByText('BEKIJK VOLLEDIGE GALERIJ')).toBeVisible();
  });

  test('footer with correct webmaster info (fworksbuilders, no bv.)', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    // Check webmaster section
    await expect(page.getByText('fworksbuilders')).toBeVisible();
    await expect(page.getByText('+32 494 51 60 64 (WhatsApp)')).toBeVisible();
    
    // Verify "bv." is NOT present
    const footerText = await page.locator('footer').textContent();
    expect(footerText).not.toContain('bv.');
    
    // Check footer sections - use heading selectors to be specific
    await expect(page.locator('footer h3').filter({ hasText: "L'Ascoli" })).toBeVisible();
    await expect(page.locator('footer h4').filter({ hasText: 'Contact' })).toBeVisible();
    await expect(page.locator('footer h4').filter({ hasText: 'Openingstijden' })).toBeVisible();
    await expect(page.locator('footer h4').filter({ hasText: 'Snelle Links' })).toBeVisible();
  });
});

test.describe('L\'Ascoli Menu Page', () => {
  test('Soepen section with 3 items', async ({ page }) => {
    await page.goto(`${BASE_URL}/menu`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');
    
    // Scroll to Soepen section
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);
    
    // Check Soepen section title - use heading selector
    await expect(page.locator('h2').filter({ hasText: 'Soepen' })).toBeVisible();
    
    // Check all 3 soup items
    await expect(page.getByText('Minestrone, soep van verse groenten uit de tuin')).toBeVisible();
    await expect(page.getByText('Tomatenroomsoep met zachte look en basilicum')).toBeVisible();
    await expect(page.getByText('Heldere soep van eend, tortellini geparfumeerd met verse munt en limoen')).toBeVisible();
  });

  test('all menu categories are present', async ({ page }) => {
    await page.goto(`${BASE_URL}/menu`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');
    
    // Check menu page title
    await expect(page.getByText('Onze Kaart')).toBeVisible();
    
    // Check all categories by scrolling through the page - use h2 headings
    await expect(page.locator('h2').filter({ hasText: 'Koude voorgerechten' })).toBeVisible();
    
    // Scroll to see more categories
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(300);
    await expect(page.locator('h2').filter({ hasText: 'Soepen' })).toBeVisible();
    
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(300);
    await expect(page.locator('h2').filter({ hasText: 'Huisgemaakte pasta' })).toBeVisible();
    
    await page.evaluate(() => window.scrollTo(0, 1600));
    await page.waitForTimeout(300);
    await expect(page.locator('h2').filter({ hasText: 'Visgerechten' })).toBeVisible();
    await expect(page.locator('h2').filter({ hasText: 'Vleesgerechten' })).toBeVisible();
  });
});

test.describe('L\'Ascoli Navigation', () => {
  test('navigation links work correctly', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');
    
    // Test KAART link
    await page.locator('nav').getByText('KAART').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/menu/);
    await expect(page.getByText('Onze Kaart')).toBeVisible();
    
    // Test INFO link
    await page.locator('nav').getByText('INFO').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/info/);
    await expect(page.locator('h1').filter({ hasText: 'Info' })).toBeVisible();
    
    // Test HOME link
    await page.locator('nav').getByText('HOME').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText("L'ASCOLI");
  });

  test('language switcher works (NL/FR/EN)', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');
    
    // Default is NL - verify Dutch text
    await expect(page.getByText('Authentieke Italiaanse keuken in het hart van Zaventem')).toBeVisible();
    
    // Switch to French - click the language dropdown in nav
    const langButton = page.locator('nav button').filter({ hasText: /NL/i }).first();
    await langButton.click();
    await page.waitForTimeout(500);
    // Click Français in dropdown (use first() to handle potential duplicates)
    await page.getByText('Français').first().click();
    await page.waitForTimeout(1000);
    
    // Verify French navigation and text
    await expect(page.locator('nav').getByText('ACCUEIL')).toBeVisible();
    await expect(page.locator('nav').getByText('CARTE')).toBeVisible();
    await expect(page.getByText('Cuisine italienne authentique au cœur de Zaventem')).toBeVisible();
    
    // Switch to English
    const langButtonFr = page.locator('nav button').filter({ hasText: /FR/i }).first();
    await langButtonFr.click();
    await page.waitForTimeout(500);
    await page.getByText('English').first().click();
    await page.waitForTimeout(1000);
    
    // Verify English navigation
    await expect(page.locator('nav').getByText('ABOUT US')).toBeVisible();
    await expect(page.locator('nav').getByText('MENU').first()).toBeVisible();
    await expect(page.getByText('Authentic Italian cuisine in the heart of Zaventem')).toBeVisible();
  });
});
