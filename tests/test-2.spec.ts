import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
 await page.goto('about:blank');
 await page.goto('chrome-error://chromewebdata/');
 await page.getByRole('button', { name: 'Advanced' }).click();
 await page.getByRole('link', { name: 'Proceed to x15729tzz.test.tre.se (unsafe)' }).click();
});