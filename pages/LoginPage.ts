import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { URLConstants } from '../constants/URLConstants';
import { Wrapper } from "../Utils/WrapperMethods";
import { Selectors } from "../Selectors/Selectors";
import { credentialConstants } from "../constants/credentialConstants";

export class LoginPage extends Wrapper {
  static url = URLConstants.BaseURL;
  static homeUrl = URLConstants.HomeURL;
  private selectedPostTitle: string = '';

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  public async userNaviagtesToLoginPage(url: string) {
    await this.loadApp(url);
    await this.hanldeCaptcha();
    await this.handleCookies();
    await this.handleAlert();
  }

  public async fillData(username: string, password: string) {
    await this.typeAndEnter(Selectors.textInputField.replace("{0}", "username"), username);
    await this.typeAndEnter(Selectors.textInputField.replace("{0}", "password"), password);
  }

  public async ClickOnLoginButton() {
    const loginButton = await this.page.getByRole('button', { name: 'Log In' });
    await loginButton.waitFor({ state: 'visible', timeout: 60000 });
    await expect(loginButton).toBeEnabled();
    await this.page.waitForLoadState();

    await loginButton.click();
    const banner = await this.page.locator(Selectors.handleBannerAfterFirstClickContinueButton);
    if (await loginButton.isVisible()) {
      await loginButton.click();
      await this.page.waitForTimeout(1000);
      if (await banner.isVisible()) {
        const bannerText = await banner.textContent();
        throw new Error(`Test execution stopped due to banner : ${bannerText}`);
      }
    } else {
      console.log("No banner detected. Continuing with the test.");
    }
  }

  public async waitForPageLoad(expectedUrl: string): Promise<void> {
    try {
      await this.page.waitForURL((url) => url.toString().includes(expectedUrl), { timeout: 10000 });
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Failed to load URL: ${expectedUrl}, actual: ${this.page.url()}`);
      throw error;
    }
  }

  public async verifyValidDataEnteredCheckMark(selector: string, action: 'visible' | 'disabled') {
    await this.verifyElementStatus(selector, action);
  }
}
