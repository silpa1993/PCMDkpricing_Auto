
import { expect, test } from '@playwright/test';
import testdata from "..//Input.json";
test('test', async ({ page }) => {
    test.setTimeout(0);
    await page.goto('https://x15729tzz.test.tre.se:44302/login/login.html?req=/oscarAdmin/?');

    await page.waitForLoadState();
    await page.locator('input[name="httpd_username"]').click();
    await page.locator('input[name="httpd_username"]').fill('cftest1');
    await page.locator('input[name="httpd_username"]').press('Tab');
    await page.locator('input[name="httpd_password"]').fill('cftest1');
   
    await page.getByRole('button', { name: 'Sign in' }).click();
  
    await page.locator('xpath=//div/a[9]').click();
    
    await page.waitForLoadState('networkidle');

   await page.locator('input[name="EXTERNAL_ID1"]').fill(testdata.Deviceid);
  
 
    await page.locator('input[name="EXTERNAL_ID1"]').press('Enter');
    await page.waitForLoadState('networkidle');
   

   
   const locator= page.getByTitle(testdata.Devicename);
   await expect(locator).toBeVisible();


   await page.getByTitle('Review', { exact: true }).click();
   
   //fetch values from OSCAR table 

  // const table= page.locator("table#productIndirectPricelist tr");
  await page.waitForSelector('//div[@id="workarea"]/table[2]/tbody/tr[5]',{state: 'attached'});
  console.log((await page.locator('//div[@id="workarea"]/table[2]/tbody/tr[5]').innerText()).toString());
    await page.waitForSelector('//table[@id="productIndirectPricelist"]/tbody/tr',{state: "attached"});
   const rows= page.locator('//table[@id="productIndirectPricelist"]/tbody/tr');
  
   console.log((await rows.count()).toString());
    //console.log("Row count"+ rows.count());
   const value= page.getByRole('row',{name:'15Timer 15GB (U.Roaming) 100kr -- -- 6 måneders bindingsperiode'}).first().locator('td').nth(3);
   
   const pricedev=(await value.innerText());
   console.log((pricedev));


});