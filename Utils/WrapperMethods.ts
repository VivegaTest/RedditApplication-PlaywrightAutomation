import { Page, BrowserContext, test, expect, Locator } from '@playwright/test';
import { randomBytes } from 'crypto';
import { Selectors } from "../Selectors/Selectors";
import { URLConstants } from '../constants/URLConstants';
import { LOADIPHLPAPI } from "dns";


export abstract class Wrapper {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly accessToken: string;


    constructor(page: Page, context: BrowserContext, accessToken: string) {
        this.page = page;
        this.context = context;
        this.accessToken = accessToken;
    }

    async waitForElement(locator: string) {
        try {
            await this.page.waitForSelector(locator, { state: "visible" });
        } catch (error) {
            console.error(`Element with locator "${locator}" not found or not visible after waiting for`);
            throw error;
        }
    }

    async validateElementVisibility(locator: any) {
        const element = locator;
        console.log("element:" + element);
        await this.page.waitForLoadState('load');
        try {
            await expect(element).toBeVisible();
        }
        catch (error) {
            console.error(`${element} is not visible: ${error}.`);
        }
    }


    async click(locator: string) {
        try {
            await this.page.locator(locator).click();
        }
        catch (error) {
            throw new Error(`Failed to click on element: ${locator}`, error);
        }
    }

    async typeAndEnter(locator: string, testData: string) {
        this.waitForElement(locator);
        console.log("testData" + testData);
        await this.page.locator(locator).fill('');
        await this.page.locator(locator).fill(testData);

        await this.page.keyboard.press('Tab');
    }

    async fillValueByRole(role: string, name: string, testData: string) {
        await this.page.getByRole(role as any, { name: `${name}` }).click();
        await this.page.getByRole(role as any, { name: `${name}` }).fill('');
        await this.page.getByRole(role as any, { name: `${name}` }).fill(testData);
        await this.page.keyboard.press('Tab');
    }

    async loadApp(url: string) {
        await this.page.goto(url, { waitUntil: 'load', timeout: 15000 });
        console.log(`Navigated to: ${url}`);
    }

    async getInnerText(locator: string): Promise<string> {
        await this.waitForElement(locator);
        return await this.page.locator(locator).first().innerText();
    }

    async getText(locator: string) {
        await this.waitForElement(locator);
        return await this.page.locator(locator).textContent();
    }

    async getTitle() {
        try {
            const pageTitle = await this.page.title();
            console.log("this.getTitle()" + pageTitle);
            return pageTitle
        } catch (error) {
            if (error instanceof Error && error.message.includes('Execution context was destroyed')) {
                console.error('Error: Execution context was destroyed. Retrying...');
                await this.page.waitForLoadState('load');
                return await this.page.title();
            } else {
                console.error('An unexpected error occurred:', error);
                throw error;
            }
        }
    }

    public async getRandomString(): Promise<string> {
        return randomBytes(4).toString('hex').slice(0, 4);
    }

    async handleCookies() {
        const acceptCookiesButton = this.page.getByRole('button', { name: 'Accept all' });
        if (await acceptCookiesButton.isVisible()) {
            await acceptCookiesButton.click({ force: true });
        }
        const cookieBanner = this.page.locator(".cookie-banner-dialog");
        const dismissButton = this.page.locator("#reject-nonessential-cookies-button > button");
        if (await dismissButton.isVisible()) {
            await dismissButton.click({ force: true });
            await expect(cookieBanner).toHaveCount(0);
        }
    }

    async handleAlert() {
        const alert = await this.page.locator('alert-controller >> toaster-lite');
        if (await alert.isVisible()) {
            await this.page.locator('alert-controller >> toaster-lite button').click();
        }
    }


    async isDisabled(locator: string): Promise<boolean> {
        try {
            return await this.page.isDisabled(locator);
        }
        catch (error) {
            console.log(`The expected ${locator} is not in disable state: ${error}`);
            return error;
        }
    }

    async elementChecked(element: Locator) {
        await expect(element).toBeChecked();
    }

    async verifyElementStatus(selector: string, action: 'visible' | 'disabled') {
        const ele = await this.page.locator(selector);
        try {
            if (action == 'visible') {
                await expect(ele).toBeVisible();
            }
            else if (action == 'disabled') {
                await expect(ele).toBeDisabled();
            }
            else {
                throw new Error(`Unsupported action: ${action}`);
            }
        }
        catch (error) {
            let helpText = "No help text found";
            try {
                helpText = await this.page.locator(Selectors.emailFieldHelpText).innerText();
            } catch (innerError) {
                console.log(`Failed to capture hellp text ${innerError}`);
            }
            console.error(`Verification failed for action : ${helpText}`);
            throw error;
        }
    }

    async hanldeCaptcha() {
        const captchaElements = await this.page.locator('[id*="captcha"]').all();
        let captchaVisible = false;
        for (const element of captchaElements) {
            if (await element.isVisible()) {
                captchaVisible = true;
                break;
            }
        }
        if (captchaVisible) {
            console.warn('CAPTCHA detected.');
            return;
        }
    }

    async clickOnRoleBy(role: string, name: string) {
        const button = await this.page.getByRole(role as any, { name: `${name}` })
        await button.waitFor({ state: 'visible' });
        await expect(button).toBeEnabled();
        button.click();

    }

    async clickOnTextBy(name: string) {
        await this.page.getByText(name, { exact: true }).click();
    }

    async waitForLoadUrl(url: string) {
        await this.page.waitForURL(url);
        await this.page.waitForLoadState('load');
    }

    async getAttributeValue(locator: string, val: string) {
        return await this.page.locator(locator).getAttribute(val);
    }

    async userCommunitySuscribeStatusViaAPI() {
        const response = await fetch(URLConstants.getCommunityEndpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to get access token`);
        }
        const apiData = await response.json();
        const userIsSubscriber = apiData.data.user_is_subscriber;
        console.log('User is subscriber:', userIsSubscriber);
        return userIsSubscriber;
    }

    async getTopPostTitle() {
        const response = await fetch(URLConstants.getTopPostEndpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to get access token`);
        }
        const apiData = await response.json();
        const topPostTitle = apiData.data.children[0].data.title;
        console.log('Top Post title is:', topPostTitle);
        return topPostTitle;
    }
}