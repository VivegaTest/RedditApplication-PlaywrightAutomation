import { BrowserContext, Page, expect, Locator } from "@playwright/test";
import { test } from '../CustomFixtures/RedditFixtures';
import { URLConstants } from "../constants/URLConstants";
import { credentialConstants } from '../constants/credentialConstants';


test('Select top post on Reddit Home after login', async ({ RedditHomePage, LoginPage }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Vivega S' },
        { type: 'Test Case', description: 'Select top post on Reddit Home after login - Scenario Two' }
    );

    await RedditHomePage.applyFilterToShow("Top");
    await RedditHomePage.verifyPageLoadedasFiltered("top");
    await RedditHomePage.selectingPostByOrder("1");
    await RedditHomePage.verifySelectedPostIsLoaded();
});




test('Join a new Community', async ({ RedditHomePage, LoginPage }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Vivega S' },
        { type: 'Test Case', description: 'Join a new Community after login - Scenario Three' }
    );

    await RedditHomePage.verifyUserLoggedIntoRedditApplication(credentialConstants.USERNAME);
    await RedditHomePage.naviagteToCommunityPageandVerify("r/Eyebleach");
    await RedditHomePage.jonCommunity('EyeBleach');

});