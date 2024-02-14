// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('HomePage', () => {

  test('app', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    const screenBackground = page.locator('#homeContainer');
    await expect(screenBackground).toBeVisible;
  });

});
