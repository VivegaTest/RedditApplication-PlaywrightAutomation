import { test as baseTest, Page, chromium, BrowserContext } from '@playwright/test';

import { RegisterAccount } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { credentialConstants } from "../constants/credentialConstants";
import { URLConstants } from '../constants/URLConstants';
import { aiFixture } from '@zerostep/playwright';
import { RedditHomePage } from '../pages/HomePage';
import { apiCredential } from '../constants/APIcredentials';
import { homedir } from 'os';

export const test = baseTest.extend<{
    RegisterNewAccount: RegisterAccount;
    LoginPage: LoginPage;
    RedditHomePage: RedditHomePage;
    APILoginPage: LoginPage;
    accessToken: string;
}>({
    accessToken: async ({ }, use) => {
        const basehUrl = URLConstants.NaviagationURL;
        const accessTokenUrl = `${basehUrl}api/v1/access_token`;

        const body = new URLSearchParams();
        body.append('grant_type', 'password');
        body.append('username', apiCredential.UserOne);
        body.append('password', apiCredential.pwd);

        const auth = Buffer.from(`${apiCredential.REDDIT_CLIENT_ID}:${apiCredential.REDDIT_CLIENT_SECRET}`).toString('base64');

        const tokenResponse = await fetch(accessTokenUrl, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });

        if (!tokenResponse.ok) {
            throw new Error(`Failed to get access token: ${tokenResponse.statusText}`);
        }

        const tokenData = await tokenResponse.json();
        console.log("Access Token: ", tokenData.access_token);
        await use(tokenData.access_token);
    },
    LoginPage: async ({ page, context, accessToken }, use) => {
        const loginPage = new LoginPage(page, context, accessToken);
        console.log("RedditLogin fixture is being invoked");
        const homeURL = URLConstants.NaviagationURL;

        await loginPage.userNaviagtesToLoginPage(URLConstants.BaseURL);
        await loginPage.fillData(apiCredential.UserOne, apiCredential.pwd);
        await loginPage.ClickOnLoginButton();
        await loginPage.waitForPageLoad(homeURL);
        await use(loginPage);
    },

    RegisterNewAccount: async ({ page, context }, use) => {
        const registerDialog = new RegisterAccount(page, context);
        await use(registerDialog);
    },

    RedditHomePage: async ({ page, context, accessToken }, use) => {
        console.log("RedditHomePage fixture is being invoked");
        const redditHome = new RedditHomePage(page, context, accessToken);
        await use(redditHome);
    },
    ...aiFixture(baseTest)
});
