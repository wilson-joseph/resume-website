const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Set to true for silent mode
    const page = await browser.newPage();
    
    await page.goto('https://www.linkedin.com/login');
    
    // Log in
    await page.type('#username', 'wilson.joseph@live.co.uk');
    await page.type('#password', 'Panther53');
    await page.click('[type="submit"]');
    
    await page.waitForNavigation();
    
    // Navigate to a LinkedIn profile
    const profileUrl = 'https://www.linkedin.com/in/josephmwilson/';
    await page.goto(profileUrl, { waitUntil: 'load' });
    
    // Scroll down to load recommendations
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(2000); 
    
    // Extract recommendations
    const recommendations = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.pv-recommendation-entity')).map(rec => ({
            name: rec.querySelector('.pv-recommendation-entity__member-name')?.innerText.trim() || 'Unknown',
            text: rec.querySelector('.pv-recommendation-entity__highlights')?.innerText.trim() || 'No recommendation text',
        }));
    });
    
    console.log(recommendations);
    
    await browser.close();
})();
