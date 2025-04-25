import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { URLConstants } from '../constants/URLConstants';
import { Wrapper } from "../Utils/WrapperMethods";
import { Selectors } from "../Selectors/Selectors";
import { LoginPage } from "./LoginPage";


export class RedditHomePage extends Wrapper {
    private selectedPostTitle: string = '';
    static url = URLConstants.BaseURL;

    constructor(page: Page, context: BrowserContext, accessToken: string) {
        super(page, context, accessToken);
    }

    /**Steps to filter the post from the dropdown list
     * @param value
     * e.x -> top, Best
     */
    public async applyFilterToShow(value: string) {
        this.waitForElement(Selectors.pageLoad);
        this.waitForElement(Selectors.filterOption);
        this.page.locator(Selectors.filterOption).first().click({ force: true });
        await this.page.getByText(value, { exact: true }).click(); // or -> await this.page.locator(Selectors.dropdownList).filter({ hasText: value }).click();
        await this.page.locator(Selectors.label.replace("{0}", value)).scrollIntoViewIfNeeded();
        await this.page.locator(Selectors.pageLoad).waitFor({ state: 'visible' });
    }

    /**Steps to verify the selected filter option is visible on Home Page
     * @param option
     *    e.x -> top, Best  
     */
    public async verifyPageLoadedBasedOnFilterOption(option: string) {
        await this.page.waitForURL(`https://www.reddit.com/${option}/?feed=home`);
        await this.page.waitForLoadState();
        this.waitForElement(Selectors.pageLoad);
        await this.waitForElement(Selectors.filterOption);
        const filteredValue = await this.page.locator(Selectors.filterOption).first().innerText();
        await expect(filteredValue.toLowerCase()).toBe(option.toLocaleLowerCase());

    }

    /**Steps to select the top post and waits for load */
    public async selectTopPostURLAndWaitsForLoad(option: string) {
        this.waitForElement(Selectors.openedPostTitle);
        const url = await this.getAttributeValue(Selectors.topPostHref, 'href');
        try {
            if (url) {
                await this.loadApp(LoginPage.homeUrl + url);
                await this.page.waitForLoadState();
                await this.page.waitForURL(LoginPage.homeUrl + url);
                this.waitForElement(Selectors.openedPostTitle);
                const actualTitle = await this.getText(Selectors.openedPostTitle);
                if (!actualTitle) {
                    throw new Error("Title was not found");
                }
                const expectedTitle = await this.getTopPostTitle(option);
                await expect(actualTitle.trim()).toBe(expectedTitle.trim());

            } else {
                console.log("Could not select the post");
            }
        }
        catch (error) {
            console.log(`The Top post loaded incorrect ${error}`);
            throw error;
        }
    }

    /** Steps to retrive the top post title from api and compare on UI after filter selected */
    public async verifyTopPostIsLoadedAsExpected(option: string) {
        const topPostTitleViaAPI = await this.getTopPostTitle(option);
        this.waitForElement(Selectors.openedPostTitle);
        const element = await this.page.locator(Selectors.topPost);
        await element.waitFor({ timeout: 3000 });
        await this.page.waitForLoadState();
        const title = await this.getText(Selectors.topPost);
        console.log(`Selected Post Title: ${title}`);
        if (!title) {
            throw new Error("Title was not found");
        }
        try {
            await expect(title.trim()).toContain(topPostTitleViaAPI.trim());

        } catch (error) {
            console.log(`The Top post loaded incorrect ${error}`);
            throw error;
        }

    }

    /** Steps to naviagte to user profile and verify the expected user name display in the profile section
     * @param userName
     *   Currently logged in user name
     */
    public async verifyUserLoggedIntoRedditApplication(userName: string) {
        await this.page.waitForLoadState();
        await this.waitForElement(Selectors.userProfileIcon);
        await this.click(Selectors.userProfileIcon);
        try {
            await this.waitForElement(Selectors.userNameOnProfile);
            const actualLoginUser = await this.getInnerText(Selectors.userNameOnProfile);
            console.log(actualLoginUser);
            await expect(actualLoginUser).toBe('u/' + userName);
        } catch (error) {
            throw new Error(` Expected user is not Logged in`);
        }

    }

    /** Setps to navigate to communnity page by url
     * @param communityName
     *     community name to navigate the url
    */
    public async naviagteToCommunityPageAndVerify(communityName: string) {
        await this.loadApp(URLConstants.HomeURL + "/" + communityName);
        await this.waitForElement(Selectors.communityHeader);
        const actualCommunityTitle = await this.getInnerText(Selectors.communityHeader);
        await expect(actualCommunityTitle).toBe(communityName);
    }

    /** Steps join the community if user is not already joined
     * @param communityName
     *      Enter community name to join
     */
    public async jonCommunity(communityName: string) {
        try {
            await this.waitForElement(Selectors.joinCommunityStatus);
            const status = await this.userCommunitySuscribeStatusViaAPI(communityName);
            if (status == false) {
                await this.click(Selectors.joinCommunityStatus);
                await this.page.waitForTimeout(6000);
                await this.page.reload();
                const getLatestStatus = await this.userCommunitySuscribeStatusViaAPI(communityName);
                console.log(`User joined Community? ${getLatestStatus}`);
                // const joined = await this.getText(Selectors.joinCommunityStatus); - Added ui step
                await expect(getLatestStatus).toBe(true);
                console.log(`Successfully joined the community: ${communityName}`);
            }
            else if (status == true) {
                {
                    console.warn("Already a member of the community.");
                }
            }
        }
        catch (error) {
            console.error(`Failed to join community ${communityName}: `, error);
        }
    }

    public async logOut() {
        if (await this.page.locator(Selectors.logOffButton).isHidden()) {
            await this.waitForElement(Selectors.userProfileIcon);
            await this.click(Selectors.userProfileIcon);
        }
        await this.waitForElement(Selectors.logOffButton);
        await this.click(Selectors.logOffButton);
        await this.page.waitForSelector(Selectors.logIn);
    }
}