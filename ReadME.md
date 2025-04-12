# Playwright TypeScript Page Object Model Framework


## Table of Contents
1. [Project Description](#project-description)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Usage](#usage)
5. [Code Explanation](#code-explanation)


## Project Description
This project aims to automate the proces on a Reddit website. 

### Features:
- Register a New Account using valid information and handle validation and assertion.
- Select the Top Post on the Home Page When Logged In.
-  Join a New Reddit Community

## Technologies Used
- **TypeScript** - Programming language used for development.
- **Playwright** - Automation library for web testing and browser interactions.
- **Node.js** - JavaScript runtime used to execute the code.

## Setup Instructions

### Prerequisites
- Node.js (version 16.x or higher)
- Npm install

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/VivegaTest/RedditApplication-PlaywrightAutomation.git
    ```

2. Navigate to the project folder:
    ```bash
    cd ..folder path
    ```

3. Install dependencies:
    ```bash
    npm install playwright
    npm install @playwright/test
    npx playwright install
    npm install @zerostep/playwright
    ```

### Usage
**HandleAPI.spec.ts** -  I created pref/apps using 'script' and generated the credentials. 
You can find the details - ../constants/APIcredentials.ts

### Code Explanation

../constants/
    Contains credentials, URL details, and other configuration constants used throughout the project.

../CustomFixtures/RedditFixture.ts
    Defines custom Playwright fixtures to centralize common setup steps such as user login, reducing code duplication across tests.

../Enum/
    Contains TypeScript enums that are used inside page objects and test flows to manage form navigation steps and validation

../pages/
    Contains class for each pages to handle easily

../Selectors/
  Contains locators to easy to handle

../tests/
    Contains the test class
    
