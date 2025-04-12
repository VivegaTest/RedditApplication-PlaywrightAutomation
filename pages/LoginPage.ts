import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { URLConstants } from '../constants/URLConstants';
import { Wrapper } from "../Utils/WrapperMethods";
import { Selectors } from "../Selectors/Selectors";

export class LoginPage extends Wrapper {
  static url = URLConstants.BaseURL;
  static homeUrl = URLConstants.HomeURL;

  /** Navigate to the login page by clicking url and handle any exception
   * @param url
   *  login url
   */
  public async userNaviagtesToLoginPage(url: string) {
    await this.loadApp(url);
    await this.hanldeCaptcha();
    await this.handleCookies();
    await this.handleAlert();
  }

  /**
   * Steps to fill data on login page
   * @param username - enter valid username
   * @param password  - enter valid password
   */
  public async fillData(username: string, password: string) {
    await this.typeAndEnter(Selectors.textInputField.replace("{0}", "username"), username);
    await this.typeAndEnter(Selectors.textInputField.replace("{0}", "password"), password);
  }

  /**
   * steps to click on Login Button and handle any exception
   */
  public async ClickOnLoginButton() {
    const loginButton = this.page.getByRole('button', { name: 'Log In' });
    const banner = this.page.locator(Selectors.handleBannerAfterFirstClickContinueButton);
    await this.handleAnyTempAlert();
    await loginButton.waitFor({ state: 'visible', timeout: 60000 });
    await expect(loginButton).toBeEnabled();
    await loginButton.click({ force: true });
    if (await loginButton.isVisible()) {
      await this.page.waitForTimeout(3000);
      if (await banner.isVisible()) {
        const bannerText = await banner.textContent();
        throw new Error(`Test execution stopped due to banner : ${bannerText}`);
      }
    } else {
      console.log("No banner detected. Continuing with the test.");
    }
  }

  /**
   * Steps to waits for expected url to load
   * @param expectedUrl - enter url to load
   */
  public async waitForPageLoad(expectedUrl: string): Promise<void> {
    try {
      await this.page.waitForURL((url) => url.toString().includes(expectedUrl), { timeout: 10000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Failed to load URL: ${expectedUrl}, actual: ${this.page.url()}`);
      throw error;
    }
  }

  /**
   * Steps to verify the entered data is valid or not in the Login Page
  * @param selector - Specific field
  * @param action - expected result
  */
  public async verifyValidDataEnteredCheckMark(selector: string, action: 'visible' | 'disabled') {
    await this.verifyElementStatus(selector, action);
  }
}
