import { expect, test } from "@playwright/test";

import testdata from "../Input.json";
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
];
priceplan.forEach((plan) => {
  test("test" + plan.name, async ({ browser }) => {
    test.setTimeout(0);
    const context = await browser.newContext({
      httpCredentials: {
        username: testdata.username,
        password: testdata.password,
      },
    });

    //let arr:string[] = new Array("T41769","15Timer 15GB (U.Roaming) 100kr", "T41914","3Family - Ekstra Bruger 110kr", "T41830","3Family - Fri Tale 10GB 125kr");
    //Oscar login
    const oscarpage = await context.newPage();
    await oscarpage.goto(
      "https://x15729tzz.test.tre.se:44302/login/login.html?req=/oscarAdmin/?"
    );

    await oscarpage.waitForLoadState();
    await oscarpage.locator('input[name="httpd_username"]').click();
    await oscarpage.locator('input[name="httpd_username"]').fill("cftest1");
    await oscarpage.locator('input[name="httpd_username"]').press("Tab");
    await oscarpage.locator('input[name="httpd_password"]').fill("cftest1");
    await oscarpage.getByRole("button", { name: "Sign in" }).click();
    await oscarpage.locator("xpath=//div/a[9]").click();
    await oscarpage.waitForLoadState("networkidle");
    await oscarpage.locator('input[name="EXTERNAL_ID1"]').fill(testdata.Deviceid);
    await oscarpage.locator('input[name="EXTERNAL_ID1"]').press("Enter");
    await oscarpage.waitForLoadState("networkidle");
    const devname = oscarpage.getByTitle(testdata.Devicename);
    await expect(devname).toBeVisible();
    await oscarpage.getByTitle("Review", { exact: true }).click();

    const ppid = plan.id;
    const ppname = plan.name;

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

    await page1
      .frameLocator('frame[name="leftFrame"]')
      .getByRole("link")
      .nth(1)
      .click();
    await page1
      .frameLocator('frame[name="leftFrame"]')
      .locator('input[name="subscriptionType"]')
      .first()
      .check();

    //RW screen
    await page1
      .frameLocator('frame[name="leftFrame"]')
      .locator("#tariffPlan")
      .selectOption(ppid);
    await page1
      .frameLocator('frame[name="leftFrame"]')
      .locator("#mobile")
      .selectOption({ index: 2 });
    await page1
      .frameLocator('frame[name="leftFrame"]')
      .locator("#mobile")
      .selectOption(testdata.Deviceid);
    await page1
      .frameLocator('frame[name="leftFrame"]')
      .locator("#bindingPeriod")
      .selectOption(testdata.bindingperiod1);

    //fetch values from OSCAR table

    const rows = oscarpage.locator(
      '//table[@id="productIndirectPricelist"]/tbody/tr'
    );

    const value = oscarpage
      .getByRole("row", { name: ppname + " -- -- " + testdata.bindingperiod1 })
      .first()
      .locator("td")
      .nth(3);
    const pricedev = await value.innerText();
    console.log("Expected device price=" + pricedev);

    //navigate back to RW for verification of device price
    const devpricerw = await page1
      .frameLocator('frame[name="leftFrame"]')
      .getByText("Hardware pris:")
      .innerText();
    if (devpricerw.includes(pricedev) == true) {
      console.log(
        "Combination" +
          testdata.bindingperiod1 +
          " Hardware price is " +
          pricedev +
          " verified"
      );

      await page1
        .frameLocator('frame[name="leftFrame"]')
        .locator("#addition")
        .selectOption({ index: 1 });
      let upfront0kr;
      let upfront600kr;
      let upfront1500kr;
      let upfront2400kr;

      //for loop for 3Afbetalning
      for (let j = 0; j < 4; j++) {
        await page1.waitForTimeout(1000);
        const Afbetaling = (await page1.frameLocator('frame[name="leftFrame"]').locator("#addition").selectOption({ index: j })).toString();
        await expect(
          page1
            .frameLocator('frame[name="leftFrame"]')
            .locator("#miProductCost")
        ).toBeAttached();

        console.log(
          "Verification is done for-" +
            ppname +
            " - " +
            testdata.Devicename +
            " - "
        );
        //for loop for upfront
        for (let i = 1; i < 5; i++) {
          switch (j) {
            case 0:
              {
                upfront0kr = parseFloat(pricedev) / 10;
                upfront600kr = (parseFloat(pricedev) - 600) / 10;
                upfront1500kr = (parseFloat(pricedev) - 1500) / 10;
                upfront2400kr = (parseFloat(pricedev) - 2400) / 10;
              }
              break;
            case 1:
              {
                upfront0kr = parseFloat(pricedev) / 20;
                upfront600kr = (parseFloat(pricedev) - 600) / 20;
                upfront1500kr = (parseFloat(pricedev) - 1500) / 20;
                upfront2400kr = (parseFloat(pricedev) - 2400) / 20;
              }
              break;
            case 2:
              {
                upfront0kr = parseFloat(pricedev) / 30;
                upfront600kr = (parseFloat(pricedev) - 600) / 30;
                upfront1500kr = (parseFloat(pricedev) - 1500) / 30;
                upfront2400kr = (parseFloat(pricedev) - 2400) / 30;
              }
              break;
            case 3:
              {
                upfront0kr = parseFloat(pricedev) / 40;
                upfront600kr = (parseFloat(pricedev) - 600) / 40;
                upfront1500kr = (parseFloat(pricedev) - 1500) / 40;
                upfront2400kr = (parseFloat(pricedev) - 2400) / 40;
              }
              break;

            default:
              break;
          }

          const selectddtext = (
            await page1
              .frameLocator('frame[name="leftFrame"]')
              .locator("#miProductCost")
              .selectOption({ index: i })
          ).toString();

          if (
            selectddtext.includes(
              "0-" + upfront0kr.toString().replace(".", ",")
            ) == true
          ) {
            console.log(
              testdata.bindingperiod1 +
                " - " +
                Afbetaling +
                " - Intial cost 0 kr -" +
                upfront0kr
            );
          } else if (
            selectddtext.includes(
              "600-" + upfront600kr.toString().replace(".", ",")
            ) == true
          ) {
            console.log(
              testdata.bindingperiod1 +
                " - " +
                Afbetaling +
                " - Intial cost 600 kr -" +
                upfront600kr
            );
          } else if (
            selectddtext.includes(
              "1500-" + upfront1500kr.toString().replace(".", ",")
            ) == true
          ) {
            console.log(
              testdata.bindingperiod1 +
                " - " +
                Afbetaling +
                " -  Intial cost 1500 kr -" +
                upfront1500kr
            );
          } else if (
            selectddtext.includes(
              "2400-" + upfront2400kr.toString().replace(".", ",")
            ) == true
          ) {
            console.log(
              testdata.bindingperiod1 +
                " - " +
                Afbetaling +
                " -Intial cost 2400 kr - " +
                upfront2400kr
            );
          }
        }
      }
    } else {
      console.log("No matching device price");
    }
  });
});
