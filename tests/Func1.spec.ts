
import { Page, expect, test } from '@playwright/test';
export const funct1=async(page1:Page,oscarfetch:string[],aindex:string,indexaf:number)=>{
    let index1=0;
    let NA="N/A";
                            for(let n=0;n<indexaf;n++)
                            {
                              if(oscarfetch[n]!=NA)
                                index1=index1+1;
                            }
                          if(index1==0)
                          {
        
                             console.log("Afbetalning -NA value")
                          }
                          else
                         {
                                      
                         const Afbetaling = (await page1.frameLocator('frame[name="leftFrame"]').locator("#addition").selectOption(aindex)).toString();
                      
                      for(let j=0;j<indexaf;j++)
                     {    
                      let val=0;
        if(oscarfetch[j]!=NA && Afbetaling!="Kontantbetaling")
        {
          
          let upfront=oscarfetch[j];
          for (let i=index1; i>0; i--)
          {
                const selectddtext = (await page1.frameLocator('frame[name="leftFrame"]').locator("#miProductCost").selectOption({index:i})).toString();
                var selectddtext1=selectddtext.substring(selectddtext.indexOf("-")+1,selectddtext.indexOf("|"));
               // console.log(selectddtext1);
              if (selectddtext1.includes(upfront.toString())== true) 
              {
                console.log("validation done for"+Afbetaling+"-"+(selectddtext.slice(0,selectddtext.indexOf("|"))));
                i=0;
                val=0;
            
              }
              else
              {
                val=val+1;
              }
             
            }
          }
            else
            {
              console.log("NA value-upfront product");
              
            }
          
         
  
         if(val==0)
          {
          console.log("Validation correct for"+Afbetaling);
          }
          else
          {
             console.log("\x1b[31m Validation failed in "+Afbetaling+"\x1b[0m");
             expect(val).toEqual(0);

          }
      }  
    }
    
  };