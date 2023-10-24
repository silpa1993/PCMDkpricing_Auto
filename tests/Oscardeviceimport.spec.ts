
import { expect, selectors, test } from '@playwright/test';
import testdata from "..//Input.json";
test('test', async ({ page }) => {
    test.setTimeout(0);
    await page.goto('https://x15729tzz.test.tre.se:44302/login/login.html?req=/oscarAdmin/?');

    await page.waitForLoadState();
    await page.locator('input[name="httpd_username"]').click();
    await page.locator('input[name="httpd_username"]').fill('Silpa001');
    await page.locator('input[name="httpd_username"]').press('Tab');
    await page.locator('input[name="httpd_password"]').fill('Silpa001');
   
    await page.getByRole('button', { name: 'Sign in' }).click();
  
    
    await page.getByText('Device Price').click();
    
    await page.waitForLoadState('networkidle');

   await page.locator('input[name="EXTERNAL_ID1"]').fill(testdata.Deviceid);
  
 
    await page.locator('input[name="EXTERNAL_ID1"]').press('Enter');
    await page.waitForLoadState('networkidle');
   

   
   const locator= page.getByTitle(testdata.Devicename).first();
   await expect(locator).toBeVisible();


   await page.getByTitle('Review', { exact: true }).click();

   
   //fetch values from OSCAR table 


  await page.waitForSelector('//div[@id="workarea"]/table[2]/tbody/tr[5]',{state: 'attached'});
   const pricezero=(await page.locator("//table[@id='pricePlanPriceTable"+testdata.priceplanid1+"']/tbody/tr[2]/td[1]").innerText());
   console.log("0 month price "+pricezero);

  const pricesix=(await page.locator("//table[@id='pricePlanPriceTable"+testdata.priceplanid1+"']/tbody/tr[2]/td[2]").innerText());
  console.log("6 month price "+pricesix);
 // console.log(await page.locator("//table[@id='pricePlanPriceTableT41769']/tbody/tr[2]/td[4]").innerText());
  //console.log(test1);
 const ic1:string[]=[];
 for(let i=4;i<8;i++)
 {
  ic1[i]= await page.locator("//table[@id='pricePlanPriceTable"+testdata.priceplanid1+"']/tbody/tr[2]/td["+i+"]").innerText();
  console.log(ic1[i]);
 }
 const ic2:string[]=[];
 for(let i=9;i<13;i++)
 {
  ic2[i]= await page.locator("//table[@id='pricePlanPriceTable"+testdata.priceplanid1+"']/tbody/tr[2]/td["+i+"]").innerText();
  console.log(ic2[i]);
 }
 const ic5:string[]=[];
 for(let i=14;i<18;i++)
 {
  ic5[i]= await page.locator("//table[@id='pricePlanPriceTable"+testdata.priceplanid1+"']/tbody/tr[2]/td["+i+"]").innerText();
  console.log(ic5[i]);
 }
 /*const ic6:string[]=[];
 for(let i=19;i<23;i++)
 {
  ic6[i]= await page.locator("//table[@id='pricePlanPriceTable"+testdata.priceplanid1+"']/tbody/tr[2]/td["+i+"]").innerText();
  console.log(ic6[i]);
 }*/
let NA="N/A";
let index1=4;
//10 mån NA check
if(ic1[4]&&ic2[9]&&ic5[14]==NA)
{
    console.log("10 m=NA");
    index1=index1-1;
}
else if(ic1[5]&&ic2[10]&&ic5[15]==NA)
{
    console.log("NA");
    index1=index1-1;
}
else if(ic1[6]&&ic2[11]&&ic5[16]==NA)
{
    console.log("NA");
    index1=index1-1;
}
else if(ic1[7]&&ic2[12]&&ic5[13]==NA)
{
    console.log("NA");
    index1=index1-1;
}
console.log(index1);
if(index1==0)
{
    console.log("All values are N/A");
}
});



