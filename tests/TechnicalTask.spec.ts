import{BrowserContext,Page, test, expect,Locator}  from "@playwright/test";
import { randomBytes } from 'crypto';
import dotenv from 'dotenv';



// dotenv.config({ path: './login.env' });


// // test('Register new Account', async ({page}) => {

// //    function getRandomString() {
// //       return randomBytes(4).toString('hex').slice(0, 4);
// //     }
// //    const randomUser = `test_${getRandomString()}`;
// //    const randompassword = `test@_${getRandomString()}`;
// //    const randomEmail = `${getRandomString()}@gmail.com`;

// //     await page.goto("https://www.reddit.com/login/");
// //     const acceptCookiesButton = page.getByRole('button', { name: 'Accept all' });
// //   if (await acceptCookiesButton.isVisible()) {
// //     await acceptCookiesButton.click({ force: true });
// //   }
// //     await expect(page.getByText('Sign Up')).toBeVisible();
// //     await page.getByText('Sign Up').click();
// //     //await page.click("//auth-flow-link[@step='register']");       
    
// //     await page.waitForSelector("#register-email", { state: 'visible' });
// //     await page.click("#register-email");
// //     const alert = await page.locator('alert-controller >> toaster-lite');
// //     if(await alert.isVisible()){
// //         await page.locator('alert-controller >> toaster-lite button').click();
// //     }
// //     await page.isDisabled("faceplate-tabpanel > auth-flow-modal:nth-child(1) > div > faceplate-tracker > button");
// //     console.log(await page.isDisabled("faceplate-tabpanel > auth-flow-modal:nth-child(1) > div > faceplate-tracker > button"));
// //     await page.fill("input[name='email']",randomEmail);   
// //     await page.keyboard.press('Tab');
// //     await page.waitForSelector('text=Email sent.',{state:'detached',timeout:5000});

// //     const targetModal = page.locator('auth-flow-modal:has-text("Continue")');
// //     await targetModal.locator('faceplate-tracker >> button').filter({ hasText: 'Continue' }).first().click();

// //     const emilaCheckmarkLocator = await page.locator('faceplate-text-input#register-email >> label>div>span>span:nth-child(3) [icon-name="checkmark-fill"]');
// //     console.log(emilaCheckmarkLocator);
// //     await expect(emilaCheckmarkLocator).toBeVisible();
// //    await page.click("faceplate-tabpanel > auth-flow-modal:nth-child(1) > div > faceplate-tracker > button");  
// //    await page.click("#email-verify > auth-flow-modal > faceplate-tracker:nth-child(2) > button");
// //    await page.waitForSelector("auth-flow-modal[slot='register_username_and_password']");
// //    await page.getByRole('textbox', { name: 'Username *' }).fill('');
// //    await page.getByRole('textbox', { name: 'Username *' }).fill(randomUser);
// //    await page.getByRole('textbox', { name: 'Password *' }).fill(randompassword);
// //    const userNameCheckmarkLocator = await page.locator('auth-flow-manager>span[slot="register"] faceplate-partial faceplate-tabpanel #register-username >> label>div>span>span:nth-child(3) [icon-name="checkmark-fill"]');
// //    await expect(userNameCheckmarkLocator).toBeVisible();

// //    await page.click("#register > faceplate-tabpanel > auth-flow-modal:nth-child(3) > div > faceplate-tracker > button");

// //    const passwordCheckmarkLocator = await page.locator('auth-flow-manager>span[slot="register"] faceplate-partial faceplate-tabpanel #register-password >> label>div>span>span:nth-child(3) [icon-name="checkmark-fill"]');
// //    await expect(passwordCheckmarkLocator).toBeVisible();

   
// // //    const bannertext = page.locator("#banner-text").innerText();
// // //    console.log(bannertext);
 
// // //    if(await bannertext.isVisible){
// // //     const val = bannertext.inputValue();
// // //     console.log(val);
// // //     await page.reload();
// // //    }
// //    await page.waitForTimeout(3000);
// //    await page.getByRole('button', { name: 'Woman' }).click();
// //   //await page.click("button[value='FEMALE']");
// //   const select_Interest = await page.locator('shreddit-slotter >> #topics [data-section-name="_special_popular"]>div:nth-child(2)');
// //   const button = await select_Interest.locator('button', { hasText: 'Am I the A**hole' });
// //   console.log(await button.textContent());
// //   await button.click();
// //   await expect(button).toBeChecked(); 
// //   await page.waitForTimeout(6000);  
// //   await page.locator('shreddit-slotter >> [type="submit"]').click();
// //   await page.waitForTimeout(6000); 
 
  
// // });


// test('Login into Reddit', async ({page}) => {
// //    const username: string | undefined = process.env.user;
// //    const password: string | undefined = process.env.password;
// //   if (!username || !password) {
// //    throw new Error('Username or password is not defined');
// //  }password=Vive@12345

//     await page.goto("https://www.reddit.com/login/");
//     await page.fill("input[name='username']", "Vive001");
//     await page.fill("input[name='password']", "Vive@12345");
//      const cookieBanner = page.locator(".cookie-banner-dialog");
//     const dismissButton = page.locator("#reject-nonessential-cookies-button > button");
//     if(await dismissButton.isVisible()){
//         await dismissButton.click({ force: true });
//         await expect(cookieBanner).toHaveCount(0);
//       //  await page.waitForSelector(".cookie-banner-dialog", { state: 'hidden' });

//     }
//     await page.waitForTimeout(3000);



//     const userName_Validation = await page.locator('faceplate-text-input#login-username >> label>div>span>span:nth-child(3) [icon-name="checkmark-fill"]');
//     await expect(userName_Validation).toBeVisible();
//     const password_Validation = await page.locator('faceplate-text-input#login-password >> label>div>span>span:nth-child(3) [icon-name="checkmark-fill"]');
//     await expect(password_Validation).toBeVisible();
//     await page.waitForTimeout(3000);
//     const captchaElements = await page.locator('[id*="captcha"]').all();
//     let captchaVisible = false;
//   for (const element of captchaElements) {
//     if (await element.isVisible()) {
//       captchaVisible = true;
//       break;
//     }
//   }

//   if (captchaVisible) {
//     console.warn('CAPTCHA detected. Skipping login.');
//     return;
//   }
//     const loginButton = await page.getByRole('button', { name: 'Log In' });
//     await loginButton.waitFor({state:'visible'});
//     await expect(loginButton).toBeEnabled();
//     await loginButton.click();

//     //await page.click("#login > auth-flow-modal > div> faceplate-tracker > button");

//     //await page.waitForTimeout(3000);

//     await page.waitForURL('https://www.reddit.com/*');
//     await page.waitForLoadState('load');
//     await page.waitForSelector('#main-content:nth-child(1)', { state: 'visible' });

//     await page.waitForSelector("shreddit-sort-dropdown >> faceplate-dropdown-menu > faceplate-tooltip > faceplate-tracker > button",{ state: 'visible' });
   
//    await page.locator('shreddit-sort-dropdown >> faceplate-dropdown-menu > faceplate-tooltip > faceplate-tracker > button').first().click({ force: true });
//    await page.getByText("Top", { exact: true }).click();
//    //await page.click("//span[contains(text(),'Top')]");


//   const value = await page.locator('shreddit-sort-dropdown >> faceplate-dropdown-menu > faceplate-tooltip > faceplate-tracker > button').first().innerText();

//   await expect(value).toBe("Top");
//   await page.waitForTimeout(3000);

// const title = await page.locator("#subgrid-container .main-container shreddit-feed >article:nth-child(1) [slot='title']").textContent();

// console.log(title);

// const url = await page.locator("shreddit-feed > article:nth-child(1) [slot='title']").getAttribute('href');

// if (url) {
//    console.log("Navigating to post:", "https://www.reddit.com" + url);
//    await page.goto("https://www.reddit.com" + url, { timeout: 15000 }); // add timeout here
//  } else {
//    console.log("No post URL found.");
//  }

// await page.waitForSelector("shreddit-post >h1", { state: 'visible' });
// const actual = await page.locator("shreddit-post >h1").textContent();
// await expect(actual?.trim()).toBe(title?.trim());

// })


// test('Join a new Community', async ({page}) => {
//    const username: string | undefined = process.env.user;
//    const password: string | undefined = process.env.password;
//   if (!username || !password) {
//    throw new Error('Username or password is not defined');
//  }
//     await page.goto("https://www.reddit.com/login/");
//     await page.fill("input[name='username']", username);
//     await page.fill("input[name='password']", password);

//     const dismissButton = page.locator("#reject-nonessential-cookies-button > button");
//     if(await dismissButton.isVisible()){
//         await dismissButton.click({ force: true });
//         await page.waitForSelector(".cookie-banner-dialog", { state: 'hidden' });
//     }
//     await page.click("#login > auth-flow-modal > div> faceplate-tracker > button");
//     await page.click("#expand-user-drawer-button");
//     const profileLocator = await page.locator("#user-drawer-content >ul [noun='profile'] .text-secondary-weak");
//     const userNametext = await profileLocator.innerText();
//     await expect(userNametext).toBe("u/"+username);

//     await page.goto("https://www.reddit.com/r/Eyebleach/");
//     await page.waitForSelector("#subgrid-container .masthead .flex >div .flex-col >h1", { state: 'visible' });
//     const title = await page.locator("#subgrid-container .masthead .flex >div .flex-col >h1").innerText();
//     await expect(title.trim()).toBe("r/Eyebleach");
//    const joinButtonLocator = await page.locator("#subgrid-container .masthead .flex >div shreddit-subreddit-header-buttons >> faceplate-tracker shreddit-join-button >> button");
//    const joinStatus = (await joinButtonLocator.innerText()).trim();
//    if(joinStatus=="Join"){
//     await page.locator("#subgrid-container .masthead .flex >div shreddit-subreddit-header-buttons >> faceplate-tracker shreddit-join-button >> button").click();
//    }
//    else if(joinStatus=="Joined"){
//       console.log("Already a member of the community.");
//    }  
//    else{
//       console.warn(`Unexpected Status: ${joinStatus}`);
//    }  
// })

