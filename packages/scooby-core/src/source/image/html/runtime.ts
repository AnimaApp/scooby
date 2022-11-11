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
    console.debug("closing page");
    await page.close();
    console.debug("page closed");
  }
};

export const browserFactory: Factory<Browser> = {
  create: function (): Promise<Browser> {
    console.debug("creating browser instance");
    return createBrowser();
  },
  destroy: async function (browser: Browser) {
    console.debug("destroying browser instance");
    await browser.close();
    console.debug("destroyed browser instance");
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
    console.debug("pool drained");
    await pool.clear();
    console.debug("pool cleared");
  }
};

export const withPooledBrowser = async <T>(
  browserPool: Pool<Browser>,
  fn: (browser: Browser) => T
): Promise<T> => {
  console.debug("acquiring browser");
  const browser = await browserPool.acquire();
  console.debug("browser acquired");
  try {
    const result = await fn(browser);
    console.debug("releasing browser");
    await browserPool.release(browser);
    console.debug("browser released");

    return result;
  } catch (error) {
    console.debug("destroying browser");
    // If an error occurred, we want to destroy the browser instance to
    // mitigate errors caused by broken sessions
    await browserPool.destroy(browser);
    console.debug("browser destroyed");
    throw error;
  }
};
