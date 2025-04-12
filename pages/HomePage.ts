import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { URLConstants } from '../constants/URLConstants';
import { Wrapper } from "../Utils/WrapperMethods";
import { Selectors } from "../Selectors/Selectors";
import { setTimeout } from "timers";
import { publicDecrypt } from "crypto";
import dotenv from 'dotenv';
import { LoginStep } from "../Enum/LoginStep";
import { credentialConstants } from "../constants/credentialConstants";
import { RegisterAccount } from '../pages/RegisterPage';
import { LoginPage } from "./LoginPage";



export class RedditHomePage extends Wrapper {
    private selectedPostTitle: string = '';
    static url = URLConstants.BaseURL;
    public async applyFilterToShow(value: string) {
        this.waitForElement(Selectors.pageLoad);
        this.waitForElement(Selectors.filterOption);
        this.page.locator(Selectors.filterOption).first().click({ force: true });
        await this.page.getByText("Top", { exact: true }).click();
        await this.page.waitForSelector(Selectors.label);
    }

    public async verifyPageLoadedasFiltered(option: string) {
        await this.page.waitForURL(`https://www.reddit.com/${option}/?feed=home`);
        await this.page.waitForLoadState();
        this.waitForElement(Selectors.pageLoad);
        await this.waitForElement(Selectors.filterOption);
        const filteredValue = await this.page.locator(Selectors.filterOption).first().innerText();
        await expect(filteredValue.toLowerCase()).toBe(option.toLocaleLowerCase());

    }

    public async selectingPostByOrder(input: string): Promise<string> {
        const title = await this.getText(Selectors.topPost.replace("{0}", input));
        console.log(`Selected Post Title: ${title}`);
        if (!title) {
            throw new Error("Title was not found");
        }
        this.selectedPostTitle = title;
        const url = await this.getAttributeValue(Selectors.topPostHref, 'href');

        if (url) {
            await this.loadApp(LoginPage.homeUrl + url);
            await this.page.waitForLoadState();
            await this.page.waitForURL(LoginPage.homeUrl + url);
            this.waitForElement(Selectors.openedPostTitle);
        } else {
            console.log("Could not select the post");
        }
        return title;
    }

    public async verifySelectedPostIsLoaded() {
        try {
            this.waitForElement(Selectors.openedPostTitle);
            const actualTitle = await this.getText(Selectors.openedPostTitle);
            await expect(actualTitle?.trim()).toBe(this.selectedPostTitle?.trim());
        } catch (error) {
            console.log(`The opened post was incorrect ${error}`);
            throw error;
        }

    }

    public async verifyUserLoggedIntoRedditApplication(userName: string) {
        await this.page.waitForLoadState();
        await this.waitForElement(Selectors.userProfileIcon);
        //await this.page.waitForSelector(Selectors.userProfileIcon);
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

    public async naviagteToCommunityPageandVerify(communityName: string) {
        await this.loadApp(URLConstants.HomeURL + "/" + communityName);
        await this.waitForElement(Selectors.communityHeader);
        const actualCommunityTitle = await this.getInnerText(Selectors.communityHeader);
        await expect(actualCommunityTitle).toBe(communityName);
    }

    public async jonCommunity(communityName: string) {
        try {
            await this.waitForElement(Selectors.joinCommunityStatus);
            const joinStatus = await this.getInnerText(Selectors.joinCommunityStatus);
            console.log(joinStatus);
            if (joinStatus?.trim() == "Join") {
                await this.click(Selectors.joinCommunityStatus);
                await this.page.waitForTimeout(6000);
                await this.page.reload();
                const joined = await this.getText(Selectors.joinCommunityStatus);
                console.log(joinStatus);
                await expect(joined?.trim()).toBe('Joined');
                console.log(`Successfully joined the community: ${communityName}`);
            }
            else if (joinStatus == "Joined") {
                console.log("Already a member of the community.");
            }
            else {
                console.warn(`Unexpected Status: ${joinStatus}`);
            }
        } catch (error) {
            console.error(`Failed to join community ${communityName}: `, error);
        }
    }
}

