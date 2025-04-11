import {test as baseTest, Page, chromium,BrowserContext} from '@playwright/test';

import {RegisterAccount} from '../pages/RegisterPage';
import{LoginPage} from '../pages/LoginPage';
import {credentialConstants} from "../constants/credentialConstants";
import{URLConstants} from '../constants/URLConstants';
import {aiFixture, type AiFixture} from '@zerostep/playwright';
import dotenv from 'dotenv';
import { RedditHomePage } from '../pages/HomePage';


export const test = baseTest.extend<{
    RegisterNewAccount : RegisterAccount;
    LoginPage : LoginPage;
    RedditHomePage : RedditHomePage;
}>({
    LoginPage: async ({page, context}, use)=>{  
        const loginPage = new LoginPage(page,context);
        console.log("RedditLogin fixture is being invoked");
            const homeURL = URLConstants.NaviagationURL;
        
            await loginPage.userNaviagtesToLoginPage(URLConstants.BaseURL);
            await loginPage.fillData(credentialConstants.USERNAME,credentialConstants.PASSWORD);
            await loginPage.ClickOnLoginButton();
            await loginPage.waitForPageLoad(homeURL);        
            await use(loginPage);
    },

    RegisterNewAccount: async ({page, context}, use)=>{
        const registerDialog = new RegisterAccount(page,context);
        await use(registerDialog);
    },

    RedditHomePage: async ({page, context},use)=>{
        console.log("RedditHomePage fixture is being invoked");
        const redditHome = new RedditHomePage(page,context);
        await use(redditHome);
    },
    ...aiFixture(baseTest)
})
