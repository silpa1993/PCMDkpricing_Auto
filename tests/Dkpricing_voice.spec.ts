import { Page, expect, test } from '@playwright/test';

import testdata from "../Input.json";
import * as function1 from "./Func1.spec";

const priceplan = [
  {
    id: testdata.priceplanid1,
    name: testdata.priceplanname1,
  },
  {
    id: testdata.priceplanid2,
    name: testdata.priceplanname2,
  },
  {
    id: testdata.priceplanid3,
    name: testdata.priceplanname3,
  },
  {
    id: testdata.priceplanid4,
    name: testdata.priceplanname4,
  },
  {
    id: testdata.priceplanid5,
    name: testdata.priceplanname5,
  },
  {
    id: testdata.priceplanid6,
    name: testdata.priceplanname6,
  },
  {
    id: testdata.priceplanid7,
    name: testdata.priceplanname7,
  },
  {
    id: testdata.priceplanid8,
    name: testdata.priceplanname8,
  },
  {
    id: testdata.priceplanid9,
    name: testdata.priceplanname9,
  },
  {
    id: testdata.priceplanid10,
    name: testdata.priceplanname10,
  },
  {
    id: testdata.priceplanid11,
    name: testdata.priceplanname11,
  },
  {
    id: testdata.priceplanid12,
    name: testdata.priceplanname12,
  },
  {
    id: testdata.priceplanid,
    name: testdata.priceplanname,
  },
];
priceplan.forEach((plan) => {
  
test('test'+plan.name,async ({browser }) =>{
  
    test.setTimeout(0);
    const context=await browser.newContext({
    httpCredentials:{
      
      username:testdata.username,
      password:testdata.password,
    }
    })
   
 //Oscar login 
 const oscarpage= await context.newPage();
 await oscarpage.goto('https://x15729tzz.test.tre.se:44302/login/login.html?req=/oscarAdmin/?');
 await oscarpage.waitForLoadState();
 await oscarpage.locator('input[name="httpd_username"]').click();
 await oscarpage.locator('input[name="httpd_username"]').fill('Silpa001');
 await oscarpage.locator('input[name="httpd_username"]').press('Tab');
 await oscarpage.locator('input[name="httpd_password"]').fill('Silpa001');
 await oscarpage.getByRole('button', { name: 'Sign in' }).click();

 //fetch device price from OSCAR
 await oscarpage.getByText('Device Price').click();
await oscarpage.waitForLoadState('networkidle');
await oscarpage.locator('input[name="EXTERNAL_ID1"]').fill(testdata.Deviceid);
await oscarpage.locator('input[name="EXTERNAL_ID1"]').press('Enter');
await oscarpage.waitForLoadState('networkidle');
const locator1= oscarpage.getByTitle(testdata.Deviceid).first();
await expect(locator1).toBeVisible();
await oscarpage.getByTitle('Review', { exact: true }).click();

const ppid = plan.id;

//fetch 0 mån device price from OSCAR
await oscarpage.waitForSelector('//div[@id="workarea"]/table[2]/tbody/tr[5]',{state: 'attached'});
const pricezero=(await oscarpage.locator("//table[@id='pricePlanPriceTable"+ppid+"']/tbody/tr[2]/td[1]").innerText());

console.log("0 month price "+pricezero);
//fetch 6 mån device price from OSCAR
const pricesix=(await oscarpage.locator("//table[@id='pricePlanPriceTable"+ppid+"']/tbody/tr[2]/td[2]").innerText());
console.log("6 month price "+pricesix);

//RW navigation 
const page = await context.newPage();
await page.goto("https://x15729tzz.test.tre.se:44304/startpage_backup.php");

const page1Promise = page.waitForEvent("popup");
await page.getByRole("row", {name: "Registrer privatabonnement Forlæng privatabonnement Registrer businessabonnement Forlæng businessabonnement"}).getByRole("link", { name: "Registrer privatabonnement" }).click();
const page1 = await page1Promise;

 await page1
    .frameLocator('frame[name="leftFrame"]')
    .locator('input[name="cprNumber"]')
    .click();
  await page1
    .frameLocator('frame[name="leftFrame"]')
    .locator('input[name="cprNumber"]')
    .fill(testdata.taxpayer);
  await page1
    .frameLocator('frame[name="leftFrame"]')
    .getByRole("link")
    .nth(2)
    .click();
  const locator = page1
    .frameLocator('frame[name="leftFrame"]')
    .getByRole("cell", {
      name: "Fornavn:* Efternavn:* E-mail:* Kontaktnummer:* C/O adresse CPR-adresse:* Postnummer:* By:* C/O adresse CPR-adresse:* Postnummer:* By:* Samtykke:* Version 2:Jeg giver samtykke til, at 3 må kontakte mig på e-mail, telefon, sms/mms og sociale medier for at blive holdt opdateret med nyheder, tilbud på produkter og tjenester samt konkurrencer fra 3. Kommunikationen kan vedrøre mit abonnement, hardware og tilhørende teleydelse samt tilbehør, som 3 tilbyder. Derudover giver jeg med mit samtykke lov til, at 3 må behandle mine forbrugs-, lokaliserings- og trafikdata til at give mig tilbud baseret på mit forbrug. Jeg kan til enhver tid tilbagekalde mit samtykke. Nej, jeg ønsker ikke at blive kontaktet af 3.",
    })
    .getByRole("img")
    .nth(1);
  await expect(locator).toBeVisible();
  

  await page1.frameLocator('frame[name="leftFrame"]').getByRole("link").nth(1).click();
 await page1.frameLocator('frame[name="leftFrame"]').locator('input[name="subscriptionType"]').first().check();
 //await page1.frameLocator('frame[name="leftFrame"]').locator('input[value="Voice"]').check();


  await page1.frameLocator('frame[name="leftFrame"]').locator("#tariffPlan").selectOption(ppid);

  
  expect(await page1.frameLocator('frame[name="leftFrame"]').locator("#mobile")).toBeAttached();
  
  await page1.frameLocator('frame[name="leftFrame"]').locator("#mobile").selectOption({ index: 1 });
    
 
  await page1.frameLocator('frame[name="leftFrame"]').locator("#mobile").selectOption(testdata.Deviceid);
    //RW screen-0 month device price check
  await page1.frameLocator('frame[name="leftFrame"]').locator("#bindingPeriod").selectOption(testdata.bindingperiod2);

  await expect( page1.frameLocator('frame[name="leftFrame"]').locator("#bindingPeriod")).toBeVisible();
  await page1.frameLocator('frame[name="leftFrame"]').locator("#simProduct").selectOption({ index: 1 });


  const devpricerw0 = await page1.frameLocator('frame[name="leftFrame"]').getByText("Hardware pris:").innerText();

  await expect(page1.frameLocator('frame[name="leftFrame"]').getByText("Hardware pris:")).toBeVisible();
  
  await expect(devpricerw0).toContain(pricezero);
  console.log("Combination" +testdata.bindingperiod2 +" Hardware price is " +pricezero +" verified");
  await page1.frameLocator('frame[name="leftFrame"]').locator("#bindingPeriod").selectOption(testdata.bindingperiod1);
  await page1.frameLocator('frame[name="leftFrame"]').locator("#simProduct").selectOption({ index: 1 });

  const devpricerw = await page1.frameLocator('frame[name="leftFrame"]').getByText("Hardware pris:").innerText();
 await expect(devpricerw).toContain(pricesix);
 console.log("Combination" +testdata.bindingperiod2 +" Hardware price is " +pricesix +" verified");

       //RW screen- 6 month device price check
  await page1.frameLocator('frame[name="leftFrame"]').locator("#bindingPeriod").selectOption(testdata.bindingperiod1);
  


const ic10:string[]=[];
const ic20:string[]=[];
const ic30:string[]=[];
const ic40:string[]=[];
let indexoscar=4;
let indexoscar2;
let indexoscar3;
let indexoscar4;
let indexaf;
if(testdata.Deviceid.includes('R')==true)
{
  indexaf=3
}
else
indexaf=4;
for (let m=0;m<indexaf;m++)
{
  ic10[m]= await oscarpage.locator("//table[@id='pricePlanPriceTable"+ppid+"']/tbody/tr[2]/td["+indexoscar+"]").innerText();
  indexoscar2=indexoscar+1;
  ic20[m]= await oscarpage.locator("//table[@id='pricePlanPriceTable"+ppid+"']/tbody/tr[2]/td["+indexoscar2+"]").innerText();
  indexoscar3=indexoscar+2;
  ic30[m]= await oscarpage.locator("//table[@id='pricePlanPriceTable"+ppid+"']/tbody/tr[2]/td["+indexoscar3+"]").innerText();
  indexoscar4=indexoscar+3;
  ic40[m]= await oscarpage.locator("//table[@id='pricePlanPriceTable"+ppid+"']/tbody/tr[2]/td["+indexoscar4+"]").innerText();
  indexoscar=indexoscar+5;
}
await expect(page1.frameLocator('frame[name="leftFrame"]').locator("#addition")).toBeAttached();
//await expect(page1.frameLocator('frame[name="leftFrame"]').locator("#miProductCost")).toBeAttached();
await page1.frameLocator('frame[name="leftFrame"]').locator("#addition").selectOption({index:1});

let option;

 for(let k=0;k<5;k++)
 {
  
     switch (k) {
                  case 0: 
                         option='MI4002';
                          console.log("Oscar values"+ic10);
                         await function1.funct1(page1,ic10,option,indexaf);                   

                 break;
                 case 1: 
                          option='MI4004';
                          console.log("Oscar values"+ic20);
                         await function1.funct1(page1,ic20,option,indexaf);                   

                 break;
                 case 3: 
                        option='MI4006';
                        console.log("Oscar values"+ic30);
                        await function1.funct1(page1,ic30,option,indexaf);                   

                 break;
                 case 4:
                        option='MI4013'; 
                        console.log("Oscar values"+ic40);
                        await function1.funct1(page1,ic40,option,indexaf);                   

                 break;
                }

  }
  
 
await page1.close();
await oscarpage.close();
  await page.close();
  
});




});
