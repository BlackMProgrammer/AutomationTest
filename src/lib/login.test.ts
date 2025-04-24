import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const wikipediaUsername = process.env.WIKIPEDIA_USERNAME;
const wikipediaPassword = process.env.WIKIPEDIA_PASSWORD;

const authFile = 'src/auth/login.json';

/**
 * Manually create a Wikipedia account and then finish this test
 * so that it signs into Wikipedia and captures the logged-in
 * session to src/auth/login.json, so that the tests in all.test.ts
 * run as a signed in user.
 */
test('Sign in to Wikipedia', async ({ page }) => {
    if (!wikipediaUsername || !wikipediaPassword) {
        throw new Error(`Need a username and password to sign in!`);
    } 
    await test.step('Navigate to wikipedia', async()=>{
        await page.goto('https://www.wikipedia.org/');
    });
    await test.step('Click the link to Move to MainPage', async()=>{
               const totalArticlesLink = page.getByRole('link', { name: '6,974,000+' });
               await totalArticlesLink.click();
           });
    await test.step('Open The Login Section', async()=>{
        const loginLink = page.getByRole('link', { name: 'Log in' }).first();
        expect(loginLink).toBeVisible;
        await loginLink.click();
    });
    await test.step('Fill in the UserName and Password', async()=>{
        const usernamePlaceHolder = page.getByPlaceholder('Enter your username');
        const passwordPlaceholder = page.getByPlaceholder('Enter your password');
        const loginButton = page.getByRole('button', { name: 'Log in' });
        expect(usernamePlaceHolder).toBeVisible();
        await usernamePlaceHolder.fill(wikipediaUsername);
        expect(passwordPlaceholder).toBeVisible();
        await passwordPlaceholder.fill(wikipediaPassword);
        expect(loginButton).toBeVisible();
        await loginButton.click();
    })
    

     await page.context().storageState({ path: authFile });
});
