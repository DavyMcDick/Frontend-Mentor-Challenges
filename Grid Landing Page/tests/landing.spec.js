const { test, expect } = require('@playwright/test');
const { resolve } = require('node:path');
const { pathToFileURL } = require('node:url');

const pageUrl = pathToFileURL(resolve(__dirname, '../index.html')).href;

async function openPage(page) {
  await page.goto(pageUrl);
  await page.evaluate(() => document.fonts.ready);
}

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`layout and menu fit at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 800 });
    await openPage(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const cards = await page.locator('.stat-card').all();
    expect(cards).toHaveLength(4);
    const boxes = await Promise.all(cards.map(card => card.boundingBox()));
    if (width < 768) {
      expect(boxes[1].y).toBeGreaterThan(boxes[0].y);
      expect(boxes[1].x).toBe(boxes[0].x);
    } else {
      expect(boxes[1].y).toBe(boxes[0].y);
      expect(boxes[1].x).toBeGreaterThan(boxes[0].x);
      expect(boxes[2].y).toBeGreaterThan(boxes[0].y);
    }
    const hero = await page.locator('#about').boundingBox();
    if (width >= 1024) expect(hero.y).toBe(boxes[0].y);
    else expect(boxes[0].y).toBeGreaterThanOrEqual(hero.y + hero.height - 1);

    if ([375, 1440].includes(width)) {
      await page.screenshot({ path: testInfo.outputPath('page.png'), fullPage: true });
    }
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    const panel = await page.getByRole('navigation').boundingBox();
    expect(panel.x).toBeGreaterThanOrEqual(0);
    expect(panel.x + panel.width).toBeLessThanOrEqual(width + 1);
    expect(panel.y + panel.height).toBeLessThanOrEqual(801);
    if (width < 1024) expect(panel.width).toBe(width);
    else expect(panel.width).toBeCloseTo(width * 0.275, 0);
  });
}

test('keyboard menu loops, closes with Escape, and restores focus', async ({ page }) => {
  await openPage(page);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Tab');
  const toggle = page.getByRole('button');
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('link', { name: 'About', exact: true })).toBeFocused();
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  await page.keyboard.press('Shift+Tab');
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('link', { name: 'Partners', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation')).toBeHidden();
  await expect(toggle).toBeFocused();
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('pointer dismissal and section navigation restore a usable page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await openPage(page);
  const toggle = page.getByRole('button');
  await toggle.click();
  await page.locator('#menu-overlay').click({ position: { x: 10, y: 500 } });
  await expect(page.getByRole('navigation')).toBeHidden();
  await toggle.click();
  await page.getByRole('link', { name: 'Partners', exact: true }).click();
  await expect(page).toHaveURL(/#schools$/);
  await expect(page.locator('#schools')).toBeFocused();
  await expect(page.getByRole('navigation')).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('local assets work without external requests and no browser errors occur', async ({ page }) => {
  const errors = [];
  const externalRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route(/^https?:/, route => {
    externalRequests.push(route.request().url());
    return route.abort();
  });
  await openPage(page);
  await expect(page.locator('.stat-card').first()).toHaveCSS('display', 'flex');
  expect(await page.evaluate(() => [...document.images].every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('17px Inter'))).toBe(true);
  expect(externalRequests).toEqual([]);
  expect(errors).toEqual([]);
});

test('navigation and styling remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(pageUrl);
  await expect(page.locator('#menu-toggle')).toBeHidden();
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.locator('.stat-card').first()).toHaveCSS('display', 'flex');
  await page.getByRole('link', { name: 'Partners', exact: true }).click();
  await expect(page).toHaveURL(/#schools$/);
  await context.close();
});

test('unavailable destinations are not misleading clickable links', async ({ page }) => {
  await openPage(page);
  await page.getByRole('button').click();
  for (const label of ['Annual Report', 'Donate']) {
    const item = page.getByRole('link', { name: new RegExp(label) });
    await expect(item).toHaveAttribute('aria-disabled', 'true');
    await expect(item).not.toHaveAttribute('href');
  }
});

test('hover, keyboard focus, and short viewport reflow remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await openPage(page);
  const card = page.locator('.stat-card').first();
  await card.hover();
  await expect(card).toHaveCSS('background-color', 'rgb(51, 92, 255)');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const toggle = page.getByRole('button');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveCSS('outline-style', 'solid');
  await toggle.click();
  const link = page.getByRole('link', { name: 'About', exact: true });
  await link.hover();
  await expect(link).toHaveCSS('text-decoration-line', 'underline');
  await page.keyboard.press('Escape');

  // A 720x400 CSS viewport exercises the reflow of a 1440x800 view at 200% zoom.
  await page.setViewportSize({ width: 720, height: 400 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await toggle.click();
  await expect(page.getByRole('link', { name: 'Partners', exact: true })).toBeInViewport();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
});
