import{BrowserContext,Page, expect,Locator}  from "@playwright/test";
import {test} from '../CustomFixtures/RedditFixtures';
import {URLConstants} from "../constants/URLConstants";


test('Select top post on Reddit Home after login', async ({RedditHomePage,LoginPage}) => {   
    test.info().annotations.push(
        {type: 'Author', description:'Vivega S'},
        {type: 'Test Case', description:'Select top post on Reddit Home after login - Scenario Two'}
    );

    await RedditHomePage.applyFilterToShow("Top");
    await RedditHomePage.verifyPageLoadedasFiltered("top");
    await RedditHomePage.selectingPostByOrder("1");
    await RedditHomePage.verifySelectedPostIsLoaded();
  });
 



test('Join a new Community', async ({RedditHomePage,LoginPage}) => {
    test.info().annotations.push(
        {type: 'Author', description:'Vivega S'},
        {type: 'Test Case', description:'Join a new Community after login - Scenario Three'}
    );

    await RedditHomePage.verifyUserLoggedIntoRedditApplication();
    await RedditHomePage.naviagteToCommunityPageandVerify("r/Eyebleach");

 });
   

    
    
//    const joinButtonLocator = await page.locator("#subgrid-container .masthead .flex >div shreddit-subreddit-header-buttons >> faceplate-tracker shreddit-join-button >> button");
//    const joinStatus = (await joinButtonLocator.innerText()).trim();
//    if(joinStatus=="Join"){
//     await page.locator("#subgrid-container .masthead .flex >div shreddit-subreddit-header-buttons >> faceplate-tracker shreddit-join-button >> button").click();
//    }
//    else if(joinStatus=="Joined"){
//       console.log("Already a member of the community.");
//    }  
//    else{
//      console.warn(`Unexpected Status: ${joinStatus}`);

    
