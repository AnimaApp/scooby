import GenericPool, { Factory, Pool } from "generic-pool";
import puppeteer, { Browser, Page } from "puppeteer";

function createBrowser(): Promise<Browser> {
  return puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
}

export const withPage = async <T>(
  browser: Browser,
  fn: (page: Page) => T
): Promise<T> => {
  const page = await browser.newPage();
  try {
    return await fn(page);
  } finally {
    await page.close();
  }
};

export const browserFactory: Factory<Browser> = {
  create: function (): Promise<Browser> {
    return createBrowser();
  },
  destroy: async function (browser: Browser) {
    await browser.close();
  },
};

export const withBrowserPool = async <T>(
  fn: (pool: Pool<Browser>) => T,
  options: { maxBrowsers: number }
): Promise<T> => {
  const pool = GenericPool.createPool(browserFactory, {
    min: 1,
    max: options.maxBrowsers,
  });
  try {
    return await fn(pool);
  } finally {
    console.log("closing the puppeteer pool...");
    await pool.drain();
    await pool.clear();
  }
};

export const withPooledBrowser = async <T>(
  browserPool: Pool<Browser>,
  fn: (browser: Browser) => T
): Promise<T> => {
  const browser = await browserPool.acquire();
  try {
    const result = await fn(browser);
    await browserPool.release(browser);

    return result;
  } catch (error) {
    // If an error occurred, we want to destroy the browser instance to
    // mitigate errors caused by broken sessions
    await browserPool.destroy(browser);
    throw error;
  }
};
