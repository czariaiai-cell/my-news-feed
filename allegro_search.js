const { chromium } = require('playwright');
const http = require('http');

async function getWsEndpoint() {
    return new Promise((resolve, reject) => {
        // Connect to host.docker.internal since Chrome debugger runs on host machine!
        http.get('http://host.docker.internal:9222/json/version', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const info = JSON.parse(data);
                    // Replace localhost with host.docker.internal in websocket URL
                    const wsUrl = info.webSocketDebuggerUrl.replace('localhost', 'host.docker.internal');
                    resolve(wsUrl);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function searchAllegro(query) {
    let browser;
    try {
        const wsUrl = await getWsEndpoint();
        // Connect to Chrome debugging port on host using Playwright
        browser = await chromium.connectOverCDP(wsUrl);
        const contexts = browser.contexts();
        
        let page;
        if (contexts.length > 0) {
            const pages = contexts[0].pages();
            // Find existing Allegro page or use the first active tab
            page = pages.find(p => p.url().includes('allegro.pl')) || pages[0];
        }
        
        if (!page) {
            const ctx = await browser.newContext();
            page = await ctx.newPage();
        }
        
        const searchUrl = `https://allegro.pl/listing?string=${encodeURIComponent(query)}&delivery-smart=1`;
        await page.goto(searchUrl, { waitUntil: 'load', timeout: 30000 });
        
        // Wait up to 5s for items to appear
        await page.waitForSelector('article', { timeout: 5000 }).catch(() => {});
        
        const results = await page.evaluate(() => {
            const items = [];
            const articles = document.querySelectorAll('article[data-analytics-view-custom-index-key]');
            
            for (let art of articles) {
                if (items.length >= 3) break;
                
                const linkEl = art.querySelector('h2 a, a[href*="/oferta/"], a[data-analytics-click-value="opbox-listing-item-link"]');
                const priceEl = art.querySelector('span[class*="price"], span[data-analytics-view-value="price"]');
                const starsEl = art.querySelector('span[class*="rating"], div[class*="stars"]');
                
                if (linkEl && linkEl.href && linkEl.href.includes('/oferta/')) {
                    const title = linkEl.innerText.trim();
                    const url = linkEl.href;
                    const price = priceEl ? priceEl.innerText.replace(/\s+/g, ' ').trim() : 'N/A';
                    const rating = starsEl ? starsEl.innerText.trim() : 'Brak ocen';
                    
                    items.push({
                        title: title,
                        url: url,
                        price: price,
                        rating: rating,
                        smart: true
                    });
                }
            }
            return items;
        });
        
        return results;
    } catch (e) {
        return { error: e.message };
    } finally {
        if (browser) {
            await browser.close().catch(() => {});
        }
    }
}

const query = process.argv[2] || 'orzechy nerkowca 2kg';
searchAllegro(query).then(res => {
    console.log(JSON.stringify(res, null, 2));
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
