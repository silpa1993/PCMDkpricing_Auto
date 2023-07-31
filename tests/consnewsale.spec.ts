import { test, expect } from '@playwright/test';
import { once, EventEmitter } from 'node:events';
import process from 'node:process';

test('test', async ({ browser }) => {
  test.setTimeout(0);
  const context=await browser.newContext({
    httpCredentials:{
      
      username:"Moller005",
      password:"Moller005",
    }
  })

 const page= await context.newPage();
  await page.goto("https://x15729tzz.test.tre.se:44303/startpage_backup.php");

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
  //expect( await page3.locator('input[name="companyName"]')).toBeVisible();
  // await page3.waitForLoadState('networkidle');
 expect( await page3.frameLocator('frame[name="leftFrame"]').locator('input[name="companyName"]')).toBeVisible();
 await page3.frameLocator('frame[name="leftFrame"]').getByRole('link').nth(1).click();
 //await page.locator('button').locator('visible=true').click();
  //await page3.frameLocator('frame[name="leftFrame"]').locator('button').locator('visible=true').getByRole('link').nth(1).click();
  //await page3.waitForLoadState('networkidle');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#accountNumber').selectOption('11814947146');

  await page3.frameLocator('frame[name="leftFrame"]').locator('input[name="subscriptionType"]').first().click();

  await page3.frameLocator('frame[name="leftFrame"]').locator('#tariffPlan').selectOption('T03407');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#imei').fill('358456544571000');


  await page3.frameLocator('frame[name="leftFrame"]').locator('#imei').press('Tab');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#mobile').selectOption('F02006');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#bindingPeriod').selectOption('S00018');
  
  await page3.frameLocator('frame[name="leftFrame"]').getByRole('cell', { name: '3Trygg1 129kr Bolttech', exact: true }).getByRole('checkbox').check();
  await page3.frameLocator('frame[name="leftFrame"]').locator('#uiccid').click();
  await page3.frameLocator('frame[name="leftFrame"]').locator('#uiccid').fill('8946072206870053669');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#numberDisplayServices').selectOption('SP00002');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#firstName').fill('q');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#firstName').press('Tab');
  await page3.frameLocator('frame[name="leftFrame"]').locator('#lastName').fill('a');
  await page3.frameLocator('frame[name="leftFrame"]').locator('a:nth-child(4)').click();
  await page3.frameLocator('frame[name="leftFrame"]').locator('a').nth(4).click();
  await page3.frameLocator('frame[name="leftFrame"]').frameLocator('frame[name="bottomframe"]').locator('#printImage').click();
  await page3.frameLocator('frame[name="leftFrame"]').frameLocator('frame[name="bottomframe"]').getByRole('link').nth(3).click();
 
  
})
