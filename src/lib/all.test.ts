import { test,expect } from '@playwright/test';

test('Search Wikipedia for "artifical intelligence"',{ tag: '@id=67ddea97348cfb2bed994986' },async ({ page }) => {
        await test.step('Navigate to WIkiperdia', async()=>{
            await page.goto('https://www.wikipedia.org/');
            expect(page.url()).toEqual('https://www.wikipedia.org/');
        });

       await test.step('On the Search Input add artificial', async()=>{
        const searchInputField = page.getByRole('searchbox', {
            name: 'Search Wikipedia',
        });
        await expect(searchInputField).toBeVisible();
        await searchInputField.fill('artificial');
        })
        await test.step('Click on the Artificial Intelligence Link', async()=>{
            const artificialIntelligenceLink = page.getByRole('link', {
                name: 'Artificial intelligence',
            }).first();
            expect(artificialIntelligenceLink).toBeVisible();
            await artificialIntelligenceLink.click();
        });
        expect(page.url()).toContain('Artificial_intelligence');
        await test.step('View history ', async()=>{
            const viewHistoryLink = page.getByRole('link', { name: 'View history' }).first();
            expect(viewHistoryLink).toBeVisible();
            await viewHistoryLink.click();
        });
        await test.step('Verify last Editing User is ElegantEgotist', async()=>{
            /* const latestEditedBy = page.locator('#pagehistory .history-user').filter({hasText:'Worstbull'}).first();
                expect(latestEditedBy).toContainText('Worstbull');
                If you want to verify Someone Ever created an edit just change 'Worstbull' for any user  
            */
            const latestEditedBy = page.locator('#pagehistory .history-user').first();
            expect(latestEditedBy).toContainText('ElegantEgotist'); //Change to Worstbull for it to fail;
        });
        
    }
);

test('Perform Wikipedia homepage actions',{ tag: '@id=67ddf04f348cfb2bed994999' },async ({ page }) => {
        await test.step('Navigate to MainPage', async()=>{
            await page.goto('https://wikipedia.org');
        });

        await test.step('Click the link to view the total number of articles in English', async()=>{
            const totalArticlesLink = page.getByRole('link', { name: '6,974,000+' });
            expect(totalArticlesLink).toBeVisible();
            await totalArticlesLink.click();
        })
    
        await test.step(`Select the 'Small' text size option in the appearance settings `, async()=>{
            const smallTextSizeOption = page.getByRole('radio', { name: 'Small' });
            expect(smallTextSizeOption).toBeVisible();
            await smallTextSizeOption.click();
            expect(smallTextSizeOption).toBeTruthy();
        });
        await test.step(`Click the 'Large' text size option to change the display size`,async()=>{
            const largeTextSizeOption = page.getByRole('radio', { name: 'Large' });
            await largeTextSizeOption.click();
            expect(largeTextSizeOption).toBeChecked();
        });
        await test.step(`Click the 'Standard' text size option in the appearance settings`,async()=>{
            const standardTextSizeButton = page.getByLabel('Standard').first();
            await standardTextSizeButton.click();
            expect(standardTextSizeButton).toBeChecked();
        });
    }
);
