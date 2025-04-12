import { BrowserContext, Page, expect, Locator } from "@playwright/test";
import { test } from '../CustomFixtures/RedditFixtures';
import { URLConstants } from "../constants/URLConstants";
import { apiCredential } from '../constants/APIcredentials';
import { Selectors } from '../Selectors/Selectors'
import { LOADIPHLPAPI } from "dns";
import { Wrapper } from '../Utils/WrapperMethods'

test('Join a New Reddit community', async ({ RedditHomePage, context, page, APILoginPage }) => {

    const basehUrl = URLConstants.NaviagationURL;
    const oauthUrl = URLConstants.oauthURL;
    const accessTokenUrl = `${basehUrl}api/v1/access_token`;
    const body = new URLSearchParams();
    body.append('grant_type', 'password');
    body.append('username', apiCredential.UserOne)
    body.append('password', apiCredential.pwd);
    const auth = Buffer.from(`${apiCredential.REDDIT_CLIENT_ID}:${apiCredential.REDDIT_CLIENT_SECRET}`).toString('base64');

    // Step 1: Get the Access Token
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
    console.log(tokenData);
    const accessToken = tokenData.access_token;

    // Step 2: Fetch the Reddit API Data
    const apiUrl = `${oauthUrl}/r/EyeBleach/about`;
    const apiResponse = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    if (!apiResponse.ok) {
        throw new Error(`Failed to get access token: ${tokenResponse.statusText}`);
    }

    const apiData = await apiResponse.json();
    const userIsSubscriber = apiData.data.user_is_subscriber;
    console.log('User is subscriber:', userIsSubscriber);

    if (userIsSubscriber == false) {
        await APILoginPage.userNaviagtesToLoginPage(URLConstants.BaseURL);
        await APILoginPage.fillData(apiCredential.UserOne, apiCredential.pwd);
        await APILoginPage.ClickOnLoginButton();
        await RedditHomePage.naviagteToCommunityPageandVerify("r/Eyebleach");
        await RedditHomePage.jonCommunity('EyeBleach');
    }
    else if (userIsSubscriber == true) {
        console.log("User is already joined to this Community")
    }
}
);