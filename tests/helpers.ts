export async function LoadHomePage(page: any){
    await page.goto('https://example.com')
}

export async function assertTitle(page: any){
   await page.waitForSelector('h5')
}
