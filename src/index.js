const fs = require('fs');
const Path = require('path');

const u = require('updeep');
const puppeteer = require('puppeteer');
const puppeteerOpts = require('puppeteer/package.json').puppeteer;

async function readStdin() {
    const { stdin } = process;
    const chunks = [];

    return new Promise((resolve, reject) => {
        stdin.on('end', () => resolve(Buffer.concat(chunks)));
        stdin.on('error', reject);
        stdin.on('data', chunk => chunks.push(chunk));
    });
}

async function getBrowserInstance() {
    const fetcher = puppeteer.createBrowserFetcher({
        path: Path.join(process.cwd(), '.crpdf-chromium')
    });
    const { local, revision, executablePath } = fetcher.revisionInfo(puppeteerOpts.chromium_revision);

    if (!local) {
        await fetcher.download(revision);
    }

    return await puppeteer.launch({
        executablePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
}

const defaults = {
    path: 'output.pdf',
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: {
        left: '10mm',
        right: '10mm'
    }
};

module.exports = async function toPDF(config) {
    config = u(config, defaults);

    const { input } = config;

    let url = input;
    if (!/^[a-z0-9-_]+:\/\//i.test(input + '')) {
        const html = input ? fs.readFileSync(input).toString('utf8') : await readStdin();
        url = `data:text/html,${html}`;
    }

    // Download the browser
    const browser = await getBrowserInstance();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.pdf(config);

    await browser.close();
};

if (process.mainModule === module)
    require('./cli');
