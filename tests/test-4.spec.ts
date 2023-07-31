import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://x15729tzz.test.tre.se:44303/startpage_backup.php');
 // await page.goto('chrome-error://chromewebdata/');
  await page.getByRole('button', { name: 'Advanced' }).click();
  await page.getByRole('link', { name: 'Proceed to x15729tzz.test.tre.se (unsafe)' }).click();
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Registrera företagsabonnemang' }).first().click();
  const page3 = await page3Promise;
  await page3.frameLocator('frame[name="leftFrame"]').locator('select[name="proofOfIdentity"]').selectOption('NI');
  await page3.frameLocator('frame[name="leftFrame"]').locator('input[name="temp_organisationNumber"]').click();
  await page3.frameLocator('frame[name="leftFrame"]').getByRole('cell', { name: 'Företagstyp:* Organisationsnummer:* Identifikationssätt:* Personnummer (ÅÅÅÅMMDDXXXX):*' }).getByRole('row').filter({ hasText: 'Enskild firma Företag' }).getByRole('cell').nth(1).click({
    modifiers: ['Control']
  });
  await page3.frameLocator('frame[name="leftFrame"]').locator('input[name="temp_organisationNumber"]').fill('169750496110');
  await page3.frameLocator('frame[name="leftFrame"]').locator('input[name="contactId"]').click({
    modifiers: ['Control']
  });
  await page3.frameLocator('frame[name="leftFrame"]').locator('input[name="contactId"]').fill('194502198429');
  await page3.frameLocator('frame[name="leftFrame"]').getByRole('link').nth(1).click();
  await page3.frameLocator('frame[name="leftFrame"]').getByRole('link').nth(1).click();
  await page3.frameLocator('frame[name="leftFrame"]').locator('input[name="subscriptionType"]').first().check();
  await page3.frameLocator('frame[name="leftFrame"]').locator('#tariffPlan').selectOption('T03407');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#imei').click();
  await page3.frameLocator('frame[name="leftFrame"]').locator('#imei').press('Tab');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#mobile').selectOption('F02006');
  await page3.frameLocator('frame[name="leftFrame"]').getByRole('cell', { name: '3Trygg1 129kr Bolttech', exact: true }).getByRole('checkbox').check();
  await page3.frameLocator('frame[name="leftFrame"]').locator('#uiccid').click();
  await page3.frameLocator('frame[name="leftFrame"]').locator('#uiccid').fill('8946072206870169556');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#numberDisplayServices').selectOption('SP00002');
  await page3.frame({
    name: 'leftFrame'
  }).locator('#firstName').fill('q');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#firstName').press('Tab');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#lastName').fill('a');
  await page3.frameLocator('frame[name="leftFrame"]').locator('a:nth-child(4)').click();
  await page3.frameLocator('frame[name="leftFrame"]').locator('a').nth(4).click();
  await page3.frameLocator('frame[name="leftFrame"]').frameLocator('frame[name="bottomframe"]').locator('#printImage').click();
  await page3.frameLocator('frame[name="leftFrame"]').frameLocator('frame[name="bottomframe"]').getByRole('link').nth(3).click();
  await page3.frameLocator('frame[name="leftFrame"]').getByText('Din order har skapats, ditt order id är: 60b37150158911ee802e.').click();
  await page3.frameLocator('frame[name="leftFrame"]').getByRole('link').click();
  await page.goto('about:blank');
  await page.goto('chrome-error://chromewebdata/');
  await page.getByRole('button', { name: 'Advanced' }).click();
  await page.getByRole('link', { name: 'Proceed to x15729tzz.test.tre.se (unsafe)' }).click();
  await page.goto('https://x15729tzz.test.tre.se:44303/startpage_backup.php');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Registrera företagsabonnemang' }).first().click();
  const page1 = await page1Promise;
  await page1.frameLocator('frame[name="leftFrame"]').locator('select[name="proofOfIdentity"]').selectOption('NI');
  await page1.frameLocator('frame[name="leftFrame"]').locator('input[name="temp_organisationNumber"]').click();
  await page1.frameLocator('frame[name="leftFrame"]').locator('input[name="temp_organisationNumber"]').click();
  await page1.frameLocator('frame[name="leftFrame"]').locator('input[name="temp_organisationNumber"]').fill('169750496110');
  await page1.frameLocator('frame[name="leftFrame"]').locator('input[name="contactId"]').click();
  await page1.frameLocator('frame[name="leftFrame"]').locator('input[name="contactId"]').fill('194502198429');
  await page1.frameLocator('frame[name="leftFrame"]').getByRole('link').nth(1).click();
  await page1.frameLocator('frame[name="leftFrame"]').getByRole('link').nth(1).click();
  await page1.frameLocator('frame[name="leftFrame"]').locator('#accountNumber').selectOption('11803877445');
  await page1.frameLocator('frame[name="leftFrame"]').locator('input[name="subscriptionType"]').first().check();
  await page1.frameLocator('frame[name="leftFrame"]').locator('#tariffPlan').selectOption('T03407');
  await page1.frameLocator('frame[name="leftFrame"]').locator('#imei').click();
  await page1.frameLocator('frame[name="leftFrame"]').locator('#imei').click({
    modifiers: ['Control']
  });
  await page1.frameLocator('frame[name="leftFrame"]').locator('#imei').fill('354111111112000');
  await page1.frameLocator('frame[name="leftFrame"]').locator('#imei').press('Tab');
  await page1.frameLocator('frame[name="leftFrame"]').locator('#mobile').selectOption('F02026');
  await page1.frameLocator('frame[name="leftFrame"]').locator('#bindingPeriod').selectOption('S00018');
  page1.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page1.frame({
    name: 'leftFrame'
  }).getByRole('cell', { name: '3Trygg1 129kr Bolttech', exact: true }).getByRole('checkbox').check();
});