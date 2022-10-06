import puppeteer, { Browser, Page } from "puppeteer";

export const withBrowser = async <T>(
  fn: (browser: Browser) => T
): Promise<T> => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  try {
    return await fn(browser);
  } finally {
    await browser.close();
  }
};

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
