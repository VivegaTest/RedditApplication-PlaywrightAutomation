export class Selectors {

    static userEmailInput = "input[name='email']";
    static userNameTextboxRole = { role: 'textbox', name: 'Username *' };
    static passwordTextboxRole = { role: 'textbox', name: 'Password *' };
    static continueButton = "auth-flow-modal .continue";
    static signUp = 'text=Sign Up';
    static submitButton = 'div > faceplate-tracker > button[type="submit"]';
    static shadowRoot = ">> label>div>span>span:nth-child(3) [icon-name='checkmark-fill']";
    static registerEmailCheckMark = "faceplate-text-input#register-email" + Selectors.shadowRoot;
    static emailFieldHelpText = "faceplate-text-input#register-email >> faceplate-form-helper-text >>#helper-text";
    static registerUsernameCheckMark = "auth-flow-manager>span[slot='register'] faceplate-partial faceplate-tabpanel #register-username" + Selectors.shadowRoot;
    static registerPasswordCheckMark = "auth-flow-manager>span[slot='register'] faceplate-partial faceplate-tabpanel #register-password" + Selectors.shadowRoot;
    static verifyPage = "//h1[normalize-space()='{0}']";
    static skipEmail = "button[name='skip']";
    static emailSentAlert = "text=Email sent.";
    static selectOption = "button[value='{0}']";
    static selectInterest = 'shreddit-slotter >> #topics [data-section-name="_{0}"]>div:nth-child(2)';
    static submitRegister = 'shreddit-slotter >> [type="submit"]';
    static registerEmail = "#register-email";
    static handleBannerAfterFirstClickContinueButton = 'alert-controller >> banner-controller >> faceplate-banner >>#banner-text';


    // Login Page
    static textInputField = "input[name='{0}']";
    static loginUserNameCheckMark = "faceplate-text-input#login-username" + Selectors.shadowRoot;
    static loginPasswordCheckMark = "faceplate-text-input#login-password" + Selectors.shadowRoot;
    static LoginButton = { role: 'button', name: 'Log In' };
    static filterOption = "shreddit-sort-dropdown >> faceplate-dropdown-menu > faceplate-tooltip > faceplate-tracker > button";
    static topPost = "#subgrid-container .main-container shreddit-feed >article:nth-child(1) [slot='title']";
    static topPostHref = "shreddit-feed > article:nth-child(1) [slot='title']";
    static openedPostTitle = "shreddit-post >h1";
    static pageLoad = "#main-content:nth-child(1)";
    static label = "button[aria-label='Sort by: Top']";


    //HomePage
    static userProfileIcon = "img[alt='User Avatar']";
    static userNameOnProfile = "#user-drawer-content >ul [noun='profile'] .text-secondary-weak";
    static communityHeader = "#subgrid-container .masthead .flex >div .flex-col >h1";
    static joinCommunityStatus = "#subgrid-container .masthead .flex >div shreddit-subreddit-header-buttons >> faceplate-tracker shreddit-join-button >> button";
}