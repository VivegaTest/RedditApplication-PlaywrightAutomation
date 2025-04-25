import { BrowserContext, Page, expect, Locator } from "@playwright/test";
import { test } from '../CustomFixtures/RedditFixtures';
import { apiCredential } from '../constants/APIcredentials';


test('Select top post on Reddit Home after login', async ({ RedditHomePage, LoginPage }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Vivega S' },
        { type: 'Test Case', description: 'Select top post on Reddit Home after login - Scenario Two' }
    );

    await RedditHomePage.applyFilterToShow("Top");
    await RedditHomePage.verifyPageLoadedBasedOnFilterOption("top");
    await RedditHomePage.verifyTopPostIsLoadedAsExpected("top");
    await RedditHomePage.selectTopPostURLAndWaitsForLoad("top");
});

test('Join a new Community', async ({ RedditHomePage, LoginPage, accessToken }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Vivega S' },
        { type: 'Test Case', description: 'Join a new Community after login - Scenario Three' }
    );

    await RedditHomePage.verifyUserLoggedIntoRedditApplication(apiCredential.UserOne);
    await RedditHomePage.naviagteToCommunityPageAndVerify("r/Eyebleach");
    await RedditHomePage.jonCommunity('EyeBleach');

});