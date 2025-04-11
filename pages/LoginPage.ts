import{BrowserContext, expect, Locator, Page} from "@playwright/test";
import{URLConstants} from '../constants/URLConstants';
import { Wrapper } from "../Utils/WrapperMethods";
import {Selectors} from "../Selectors/Selectors";
import {credentialConstants} from "../constants/credentialConstants";

export class LoginPage extends Wrapper{
    static url = URLConstants.BaseURL;
    static homeUrl = URLConstants.HomeURL;
    private selectedPostTitle: string = '';

    constructor(page:Page, context:BrowserContext){
        super(page,context);
     }    

    public async userNaviagtesToLoginPage(url:string){
        await this.loadApp(url); 
        await this.hanldeCaptcha();
        await this.handleCookies();
        await this.handleAlert();        
    }

    public async fillData(username:string,password:string){
        await this.typeAndEnter(Selectors.textInputField.replace("{0}","username"), credentialConstants.USERNAME);
        await this.typeAndEnter(Selectors.textInputField.replace("{0}","password"), credentialConstants.PASSWORD);  
    }
           
 public async ClickOnLoginButton(){
    const loginButton = await this.page.getByRole('button', { name: 'Log In' });
    await loginButton.waitFor({state:'visible'});
    await expect(loginButton).toBeEnabled();    
    await loginButton.click();  
    }

  public async waitForPageLoad(url:string){
    await this.page.waitForURL(url);  
    await this.page.waitForLoadState();
  }   

    public async verifyValidDataEnteredCheckMark(selector:string, action: 'visible' | 'disabled'){
        await this.verifyElementStatus(selector,action);
       }
}
