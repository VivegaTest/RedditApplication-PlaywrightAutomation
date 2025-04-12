import { BrowserContext, Page, expect, Locator, selectors } from "@playwright/test";
import { randomBytes } from 'crypto';
import { test } from '../CustomFixtures/RedditFixtures';
import { RegisterStep } from '../Enum/RegisterStep';
import { Selectors } from "../Selectors/Selectors";


test('Register a new Account', async ({ RegisterNewAccount, RedditHomePage }) => { 
    test.info().annotations.push(
        { type: 'Author', description: 'Vivega S' },
        { type: 'Test Case', description: 'Register new Account - Scenario One' }
    );

    function getRandomString() {
        return randomBytes(4).toString('hex').slice(0, 4);
    }
    const user = `test_${getRandomString()}`;
    const password = `test@_${getRandomString()}`;
    const Email = `${getRandomString()}@gmail.com`;

    await RegisterNewAccount.clickOnSignUpLink();
    await RegisterNewAccount.fillData(RegisterStep.Email, Email);
    await RegisterNewAccount.verifyValidDataEnteredCheckMark(Selectors.registerEmailCheckMark, 'visible');
    await RegisterNewAccount.clickContinueButton(Selectors.continueButton);
    await RegisterNewAccount.waitForPageLoad("Verify your email");
    await RegisterNewAccount.verifyContinueButtonIsDisabled(Selectors.submitButton, true);
    await RegisterNewAccount.SkipEmailVerification();
    await RegisterNewAccount.waitForPageLoad("Create your username and password");
    await RegisterNewAccount.verifyContinueButtonIsDisabled(Selectors.submitButton, true);
    await RegisterNewAccount.fillData(RegisterStep.Username, user);
    await RegisterNewAccount.fillData(RegisterStep.Password, password);
    await RegisterNewAccount.verifyValidDataEnteredCheckMark(Selectors.registerUsernameCheckMark, 'visible');
    await RegisterNewAccount.verifyValidDataEnteredCheckMark(Selectors.registerPasswordCheckMark, 'visible');
    await RegisterNewAccount.ClickOnSubmitButton(Selectors.submitButton);
    await RegisterNewAccount.selectOption("How do you identify?", "FEMALE");
    await RegisterNewAccount.selectOption("special_popular", "1");
    await RegisterNewAccount.clickContinueButton(Selectors.submitRegister);
    await RedditHomePage.verifyUserLoggedIntoRedditApplication(user);
})