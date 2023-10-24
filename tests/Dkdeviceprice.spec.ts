
import { expect, test } from '@playwright/test';

import testdata from "..//Input.json";

test('test',async ({browser }) =>{
    test.setTimeout(0);
    const context=await browser.newContext({
    httpCredentials:{
      
      username:testdata.username,
      password:testdata.password,
    }
    })

  let arr:string[] = new Array("T41769","15Timer 15GB (U.Roaming) 100kr", "T41914","3Family - Ekstra Bruger 110kr", "T41830","3Family - Fri Tale 10GB 125kr");   
  //Oscar login 
  const oscarpage= await context.newPage();
  await oscarpage.goto('https://x15729tzz.test.tre.se:44302/login/login.html?req=/oscarAdmin/?');

  await oscarpage.waitForLoadState();
    await oscarpage.locator('input[name="httpd_username"]').click();
    await oscarpage.locator('input[name="httpd_username"]').fill('Silpa001');
    await oscarpage.locator('input[name="httpd_username"]').press('Tab');
    await oscarpage.locator('input[name="httpd_password"]').fill('Silpa001');
    await oscarpage.getByRole('button', { name: 'Sign in' }).click();
    await oscarpage.getByText('Device Price').click();
    await oscarpage.waitForLoadState('networkidle');
    await oscarpage.locator('input[name="EXTERNAL_ID1"]').fill(testdata.Deviceid);
    await oscarpage.locator('input[name="EXTERNAL_ID1"]').press('Enter');
    await oscarpage.waitForLoadState('networkidle');
    const devname= oscarpage.getByTitle(testdata.Devicename);
    await expect(devname).toBeVisible();
    await oscarpage.getByTitle('Review', { exact: true }).click();

   
   //fetch values from OSCAR table 


  await oscarpage.waitForSelector('//div[@id="workarea"]/table[2]/tbody/tr[5]',{state: 'attached'});
   const pricezero=(await oscarpage.locator("//table[@id='pricePlanPriceTable"+testdata.priceplanid1+"']/tbody/tr[2]/td[1]").innerText());
   console.log("0 month price "+pricezero);

  const pricesix=(await oscarpage.locator("//table[@id='pricePlanPriceTableT41769']/tbody/tr[2]/td[2]").innerText());
  console.log("6 month price "+pricesix);
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


  await page1.frameLocator('frame[name="leftFrame"]').locator("#tariffPlan").selectOption(testdata.priceplanid1);
  await page1.frameLocator('frame[name="leftFrame"]').locator("#mobile").selectOption({ index: 1 });
  await page1.frameLocator('frame[name="leftFrame"]').locator("#mobile").selectOption(testdata.Deviceid);
    //RW screen-0 month device price check
  await page1.frameLocator('frame[name="leftFrame"]').locator("#bindingPeriod").selectOption(testdata.bindingperiod2);
  const devpricerw0 = await page1.frameLocator('frame[name="leftFrame"]').getByText("Hardware pris:").innerText();
  if (devpricerw0.includes(pricezero) == true) {
    console.log("Combination" +testdata.bindingperiod2 +" Hardware price is " +pricezero +" verified");
  
  }

  //RW screen- 6 month device price check
  await page1.frameLocator('frame[name="leftFrame"]').locator("#bindingPeriod").selectOption(testdata.bindingperiod1);
  
 
  //navigate back to RW for verification of device price
  const devpricerw = await page1.frameLocator('frame[name="leftFrame"]').getByText("Hardware pris:").innerText();
  if (devpricerw.includes(pricesix) == true) {
    console.log("Combination" +testdata.bindingperiod1 +" Hardware price is " +pricesix +" verified");
  
  }
 //console.log(document.getElementById("#addition").options.length);
  //await page1.frameLocator('frame[name="leftFrame"]').locator('#addition').selectOption({index:1});
  var lengthOfListOptions = page1.locator("#addition > option").count();
  console.log("The length is=" + lengthOfListOptions);
 
  /*
   for(let k = 0;k<arr.length;k++)
    {   
     
        console.log(arr[k]); 
        console.log(arr[k+1]); 
        const ppid=arr[k];
        const ppname=arr[k+1];
        k=k+1;
       
    
 


 let upfront0kr;
 let upfront600kr;
let upfront1500kr;
let upfront2400kr;

//for loop for 3Afbetalning
 for(let j=0;j<4;j++)
 {
      await page1.waitForTimeout(1000);
      const Afbetaling= ((await page1.frameLocator('frame[name="leftFrame"]').locator('#addition').selectOption({index:j})).toString());
      await expect(page1.frameLocator('frame[name="leftFrame"]').locator('#miProductCost')).toBeAttached();
     
        
      console.log("Verification is done for-"+ppname+" - "+ testdata.Devicename+" - " );
//for loop for upfront
      for(let i=1;i<5;i++)
      {
        
       switch (j) {
            case 0:
            {
                upfront0kr=(parseFloat(pricedev)/10);
                /*if((upfront0kr.toString()).includes(".")==true)
                {
                  upfront0kr= upfront0kr.toString().replace(".",","); 
                }*/
             /*    upfront600kr=((parseFloat(pricedev)-600)/10);
                 /*if((upfront600kr.toString()).includes(".")==true)
                {
                  upfront600kr= upfront600kr.toString().replace(".",","); 
                }*/
               /*  upfront1500kr=((parseFloat(pricedev)-1500)/10);
                 /*if((upfront1500kr.toString()).includes(".")==true)
                {
                  upfront1500kr= upfront1500kr.toString().replace(".",","); 
                }*/
               /*  upfront2400kr=((parseFloat(pricedev)-2400)/10);
                 /*if((upfront2400kr.toString()).includes(".")==true)
                {
                  upfront2400kr= upfront2400kr.toString().replace(".",","); 
                }*/
          /*   }
             break;
             case 1:
             {
                upfront0kr=(parseFloat(pricedev)/20);
                 /*if((upfront0kr.toString()).includes(".")==true)
                {
                  upfront0kr= upfront0kr.toString().replace(".",","); 
                }*/
               /*  upfront600kr=((parseFloat(pricedev)-600)/20);
                 /*if((upfront600kr.toString()).includes(".")==true)
                {
                  upfront600kr= upfront600kr.toString().replace(".",","); 
                }*/
              /*   upfront1500kr=((parseFloat(pricedev)-1500)/20);
                 /*if((upfront1500kr.toString()).includes(".")==true)
                {
                  upfront1500kr= upfront1500kr.toString().replace(".",","); 
                }*/
               /*  upfront2400kr=((parseFloat(pricedev)-2400)/20);
                 /*if((upfront2400kr.toString()).includes(".")==true)
                {
                  upfront2400kr= upfront2400kr.toString().replace(".",","); 
                }*/
              /* }
              break;
              case 2:
             {
              upfront0kr=(parseFloat(pricedev)/30);
               /*if((upfront0kr.toString()).includes(".")==true)
                {
                  upfront0kr= upfront0kr.toString().replace(".",","); 
                }*/
             /*  upfront600kr=((parseFloat(pricedev)-600)/30);
               /*if((upfront600kr.toString()).includes(".")==true)
                {
                  upfront600kr= upfront600kr.toString().replace(".",","); 
                }*/
              /* upfront1500kr=((parseFloat(pricedev)-1500)/30);
               /*if((upfront1500kr.toString()).includes(".")==true)
              {
                upfront1500kr= upfront1500kr.toString().replace(".",","); 
              }*/
              /* upfront2400kr=((parseFloat(pricedev)-2400)/30);
               /*if((upfront2400kr.toString()).includes(".")==true)
                {
                  upfront2400kr= upfront2400kr.toString().replace(".",","); 
                }*/
           /*   }
            break;
            case 3:
            {             
                upfront0kr=(parseFloat(pricedev)/40);
                 /*if((upfront0kr.toString()).includes(".")==true)
                {
                  upfront0kr= upfront0kr.toString().replace(".",","); 
                }*/
                
                /* upfront600kr=((parseFloat(pricedev)-600)/40);
                 /*if((upfront600kr.toString()).includes(".")==true)
                {
                  upfront600kr= upfront600kr.toString().replace(".",","); 
                }*/
              /*   upfront1500kr=((parseFloat(pricedev)-1500)/40);
                /* if((upfront1500kr.toString()).includes(".")==true)
                {
                  upfront1500kr= upfront1500kr.toString().replace(".",","); 
                }*/
               /*  upfront2400kr=((parseFloat(pricedev)-2400)/40);
                 /*if((upfront2400kr.toString()).includes(".")==true)
                {
                  upfront2400kr= upfront2400kr.toString().replace(".",","); 
                }*/
                                                          
           /*  }
            break;
        
          default:
          break;
         }
         
          if((upfront0kr.toString()).includes(".")==true)
           {
                  upfront0kr= upfront0kr.toString().replace(".",","); 
            }
          else if((upfront600kr.toString()).includes(".")==true)
            {
              upfront600kr= upfront600kr.toString().replace(".",","); 
            }
          else if((upfront1500kr.toString()).includes(".")==true)
          {
            upfront1500kr= upfront1500kr.toString().replace(".",","); 
          }
          else if((upfront2400kr.toString()).includes(".")==true)
          {
            upfront2400kr= upfront2400kr.toString().replace(".",","); 
          }
         
          const selectddtext= (await page1.frameLocator('frame[name="leftFrame"]').locator('#miProductCost').selectOption({index:i})).toString();
        
         //page1.waitForLoadState('networkidle');
          
        if(selectddtext.includes("0-"+upfront0kr)==true)
         {
             console.log(testdata.bindingperiod1+" - " +Afbetaling+" - Intial cost 0 kr -"  +upfront0kr);
  
         }
  
        else if((selectddtext.includes("600-"+upfront600kr)==true))
        {
            console.log(testdata.bindingperiod1+" - " +Afbetaling+" - Intial cost 600 kr -" +upfront600kr);
   
        }
 
        else  if(selectddtext.includes("1500-"+upfront1500kr)==true)
        {
           console.log(testdata.bindingperiod1+" - " +Afbetaling+" -  Intial cost 1500 kr -" +upfront1500kr);
        }
        else if((selectddtext.includes("2400-"+upfront2400kr)==true))
        {
            console.log(testdata.bindingperiod1+" - " +Afbetaling+" -Intial cost 2400 kr - " +upfront2400kr);
        }
       else
        {
          console.log("No matching value at "+Afbetaling.toString()+selectddtext);
        }
      }
    }
  }
  else
  {
    console.log("No matching device price");
  }
}
 } ); 
await page1.frameLocator('frame[name="leftFrame"]').locator('#miProductCost').selectOption('2400-132|105,60');
await page1.frameLocator('frame[name="leftFrame"]').locator('#miProductCost').selectOption('600-177|141,60');
await page1.frameLocator('frame[name="leftFrame"]').locator('#miProductCost').selectOption('1500-154,50|123,60');
await page1.frameLocator('frame[name="leftFrame"]').locator('#miProductCost').selectOption('0-192|153,60');*/
  
});