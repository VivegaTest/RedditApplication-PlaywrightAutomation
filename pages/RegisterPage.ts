import{BrowserContext, expect, Locator, Page} from "@playwright/test";
import { Wrapper } from "../Utils/WrapperMethods";
import {RegisterStep} from "../Enum/RegisterStep";
import {Selectors} from "../Selectors/Selectors";
import{LoginPage} from "../pages/LoginPage";
import {URLConstants} from "../constants/URLConstants";
import { copyFileSync } from "fs";


export class RegisterAccount extends Wrapper{
    static url = URLConstants.BaseURL; 

    public async generateRandomString(): Promise<string> {
        return await this.getRandomString();
      }

    constructor(page:Page, context:BrowserContext){
        super(page,context);       
    }


    public async clickOnSignUpLink(){
        await this.loadApp(RegisterAccount.url);  
        await this.waitForElement(Selectors.signUp); 
        await this.handleCookies();
        await this.handleAlert();
        await this.hanldeCaptcha();
         await this.page.getByText('Sign Up').click()
        await this.waitForElement("#register-email");   
    }

    public async fillData(type:RegisterStep, value:string): Promise<void>{
        switch(type){
            case RegisterStep.Email:
                await this.typeAndEnter(Selectors.userEmailInput, value);
                break;
            
            case RegisterStep.Username:
                await this.fillValueByRole(Selectors.userNameTextboxRole.role,Selectors.userNameTextboxRole.name,value);
                break;

            case RegisterStep.Password:
                await this.fillValueByRole(Selectors.passwordTextboxRole.role,Selectors.passwordTextboxRole.name,value);
                break;
            }
    }

    public async clickContinueButton(locator:string){    
               
        try{
            await this.waitForElement(locator);
            await this.click(locator);
        } catch(error){
            const banner = await this.page.locator(Selectors.handleBannerAfterFirstClickContinueButton);
            if(await banner.isVisible()){
            try{
                const text = await banner.innerText();
                  console.log(`Could not successfully continue. Banner text: ${text}`); 
                  throw new Error(`Error during continue button click: ${text}`);
             }
             catch(innerError){
                throw new Error('Error while handling the banner after continue button click');
             }
            } else{
                throw error;
            }
        }
    }               
                                     
    public async ClickOnSubmitButton(ele:string){
        const continueBtn = await this.page.locator(ele);
            await this.waitForElement(ele);
            await this.click(ele);  
        const banner = await this.page.locator(Selectors.handleBannerAfterFirstClickContinueButton);
        if(await continueBtn.isVisible()){
            await this.click(ele);  
            await this.page.waitForTimeout(1000);
            if(await banner.isVisible()){
                const bannerText = await banner.textContent();
                throw new Error(`Test execution stopped due to banner : ${bannerText}`);
            }            
        } else{
            console.log("No banner detected. Continuing with the test.");
        }        
  }

    public async waitForPageLoad(text:string){
        await this.waitForElement(Selectors.verifyPage.replace("{0}",text));
    }
                     
    public async verifyValidDataEnteredCheckMark(selector:string, action: 'visible' | 'disabled'){
         await this.verifyElementStatus(selector,action);
        }

    public async selectOption(quest:string, option:string){
        switch(quest){
         case "How do you identify?":
            console.log(" await this.page.getByRole('button', { name: `${option}` }):" + await this.page.getByRole('button', { name: `${option}` }));
            await this.page.getByRole('button', { name: `${option}` }).click();
             break;
           
         case "special_popular":
            const select_Interest = this.page.locator(Selectors.selectInterest.replace("{0}",quest));
            console.log("select_Interest :"+ select_Interest);
            const button = await select_Interest.locator('button', { hasText: `${option}` });
            console.log(await button.textContent()); 
            await button.click();
            break;

          default :
           console.log(` No expected question avaiable ${quest}`);  
         }
     }   

    public async verifyContinueButtonIsDisabled(locator:string,expected:boolean){
        const result = await this.isDisabled(locator);
        await expect(result).toBe(expected);
    }

    public async SkipEmailVerification(){
            await this.waitForElement(Selectors.skipEmail);
            await this.click(Selectors.skipEmail);
        }
   
    public async handleAlerts(locator: string, timeout:number = 3000) {
        const alertMessage = this.page.locator(locator);
        if(await alertMessage.isVisible()){
            await alertMessage.waitFor({ state: 'hidden', timeout: 3000 });
        }else{
            console.log("No alert displayed");
        }   
    } 

    public async verifyTitle(title:string){
        const actualText = this.getTitle();
        await expect(actualText).toBe(title);
    }    
    
}