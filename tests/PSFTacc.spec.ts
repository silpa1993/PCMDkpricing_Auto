import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  await page.goto('https://crm.nextrel.tre.se/login/login.html?req=/ps/signon.html?');
  await page.locator('input[name="httpd_username"]').click();
  await page.locator('input[name="httpd_username"]').fill('cftest1');
  await page.locator('input[name="httpd_username"]').press('Tab');
  await page.locator('input[name="httpd_password"]').fill('cftest1');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('menuitem', { name: 'Main Menu' }).click();
  await page.getByRole('menuitem', { name: 'Customers CRM' }).click();
  await page.getByRole('menuitem', { name: 'Consumer' }).click();
 
await page.frameLocator('iframe[name="TargetContent"]').locator('[id="RB_FLT_CRIT_WRK_RA_VALUE\\$1"]').fill('196808285479');
await page.frameLocator('iframe[name="TargetContent"]').locator('[id="RB_FLT_CRIT_WRK_RA_VALUE\\$1"]').press('Enter');
await page.frameLocator('iframe[name="TargetContent"]').getByRole('button', { name: 'Customer Account' }).click();
await page.frameLocator('iframe[name="TargetContent"]').getByRole('cell', { name: 'Find an Existing Value Add a New Value' }).getByRole('link', { name: 'Add a New Value' }).click();


  //await page.frameLocator('iframe[name="TargetContent"]').locator('[id="RB_FLT_CRIT_WRK_RA_VALUE\\$1"]').click({
    //modifiers: ['Control']
 // });
  //await page.frameLocator('iframe[name="TargetContent"]').locator('[id="RB_FLT_CRIT_WRK_RA_VALUE\\$1"]').fill('196808285479');
/*  await page1.getByRole('textbox').dblclick();
  await page1.getByRole('textbox').press('Control+a');
  await page1.getByRole('textbox').fill('196808285479');
  await page1.getByRole('button', { name: 'Search Search' }).click();
  await page1.getByRole('cell', { name: 'Teatauto1' }).click();
  await page1.getByRole('row', { name: '10791710147 ACTIVE POST Teatauto1 196808285479 2023-06-14 10:13:33 2023-06-14 10:14:35' }).getByRole('cell', { name: '10791710147' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').locator('[id="RB_FLT_CRIT_WRK_RA_VALUE\\$1"]').click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('button', { name: 'Search' }).click();
  await page.frame({
    name: 'TargetContent'
  }).getByRole('button', { name: 'Customer Account' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('link', { name: 'Teatauto1' }).click();
  await page1.goto('chrome://newtab/');
  await page1.goto('chrome-error://chromewebdata/');
  await page1.goto('https://rapidcontext.nextrel.tre.se/webchecker/');
  await page1.getByRole('heading', { name: 'PeopleSoft' }).click();
  await page1.locator('div').filter({ hasText: /^Accounts$/ }).locator('span').click();
  await page1.locator('select[name="type"]').selectOption('taxpayer_no');
  await page1.getByRole('textbox').click();
  await page1.getByRole('textbox').fill('https://rapidcontext.nextrel.tre.se/webchecker/');
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('button', { name: 'Search' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('button', { name: 'Customer Account' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').locator('#win0divSEARCHMODE').getByRole('link', { name: 'Add a New Value' }).click();

  await page.frameLocator('iframe[name="TargetContent"]').getByLabel('*Account Name:').click();
  await page.frameLocator('iframe[name="TargetContent"]').getByText('*Account Name:').click();
  await page.frameLocator('iframe[name="TargetContent"]').getByLabel('*Account Name:').press('Control+a');
  await page.frameLocator('iframe[name="TargetContent"]').getByLabel('*Account Name:').fill('Teatauto1');
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('button', { name: 'Register' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('link', { name: 'Account Refresh' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('link', { name: 'Account Refresh' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('link', { name: 'Toolbar Button ID' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('link', { name: 'Account Refresh' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('link', { name: 'Account Refresh' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('link', { name: 'Toolbar Button ID' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('link', { name: 'Account Refresh' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('link', { name: 'Toolbar Button ID' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').getByRole('link', { name: 'Account Refresh' }).click();
  await page.goto('https://crm.nextrel.tre.se/psp/ps/EMPLOYEE/CRM/c/RB_MANAGE_CUSTOMER_INFORMATION.RD_CONSUMER_SRCH_2.GBL?FolderPath=PORTAL_ROOT_OBJECT.CR_CUSTOMER.CR_RD_CONSUMER_SRCH_2_GBL&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder');
  await page.getByRole('menuitem', { name: 'Consumer' }).click();
  await page.frameLocator('iframe[name="TargetContent"]').locator('[id="RB_FLT_CRIT_WRK_RA_VALUE\\$1"]').click();*/

});