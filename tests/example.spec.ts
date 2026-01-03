import { test, expect } from '@playwright/test';

import { LoadHomePage, assertTitle} from '../tests/helpers';

test('simple basic test', async ({ page }) => {
    await page.goto('https://example.com');
    const pageTitle = await page.locator('h1');
    await expect(pageTitle).toContainText('Example Domain');
}); 

test('Clicking on Element', async ({ page }) => {

    await page.goto('http://zero.webappsecurity.com/');
    await page.click('#signin_button');
    await page.click('text=Sign in');

    const errorMessage = await page.locator('.alert-error');
    await expect(errorMessage).toContainText('Login and/or password are wrong.');
});


test.skip('Selectors', async ({page}) =>{

    //text
    await page.click('text= some text');

    //Css Selectors
    await page.click('button');
    await page.click('#id');
    await page.click('.className');

    //Only Visible Css Selector
    await page.click('.submit-button:visible');

    // Combinations
    await page.click('#id .className');

    //Xpath
    await page.click('//button');

});

test.describe('My First Test Suite', () =>{

test('Working on inputs:', async({page}) => {
await page.goto('http://zero.webappsecurity.com/')
await page.click('#signin_button')
await page.fill('#user_login', 'sample username')
await page.fill('#user_password', 'sample password')
await page.click('text=Sign in')

const errorMessgae = page.locator('.alert-error')
await expect(errorMessgae).toContainText('Login and/or password are wrong.')
});

test('Assertions @myTag', async({page})=>{
await page.goto('https://example.com')
await expect(page).toHaveURL('https://example.com')
await expect(page).toHaveTitle('Example Domain')

const element = await page.locator('h1')
await expect(element).toHaveText('Example Domain')
await expect(element).toBeVisible
await expect(element).toHaveCount(1)

const nonExistingElement = await page.locator('h5')
await expect(nonExistingElement).not.toBeVisible
});

});


test.describe.parallel.only('Hooks Suite', () => {
    test.beforeEach(async({page}) => {
  await page.goto('https://example.com');
    })

test('Screenshots', async({page} )=>{
// step 1: launch the website
//   await page.goto('https://example.com');
// step 2: screenshot the full page
await page.screenshot({path: 'Screenshot.png', fullPage: true})

});

test('Single Element Screenshots', async({page} )=>{
//   await page.goto('https://example.com');
  const element = await page.$('h1')
  await element?.screenshot({path: 'Single_Element_Screenshot.png'})

});
});

test('Custom Helpers', async ({page})=>{
await LoadHomePage(page)
// await page.pause()
await assertTitle(page)
});

