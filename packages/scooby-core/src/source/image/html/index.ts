import url from "url";
import fastq, { queueAsPromised } from "fastq";
import { Pool } from "generic-pool";
import { GenerateImageSourcesOptions } from "..";

import { ImageSourceEntry, TestEntry, Viewport } from "../../../types";
import { Browser, Page, TimeoutError } from "puppeteer";
import { withBrowserPool, withPage, withPooledBrowser } from "./runtime";
import { createTemporaryFile } from "../../../utils/temp";

const MAX_SCREENSHOT_ATTEMPTS = 3;

export async function generateHTMLImageSources(
  entries: TestEntry[],
  options: GenerateImageSourcesOptions
): Promise<ImageSourceEntry[]> {
  const maxConcurrency = options.maxThreads ?? 4;

  return withBrowserPool(
    async (pool) => {
      await withPooledBrowser(pool, async (browser) => {
        console.log("Using puppeteer version:", await browser.version());
      });

      const queue = fastq.promise<
        Pool<Browser>,
        ScreenshotTaskRequest,
        ScreenshotTaskResult
      >(pool, takeScreenshotWithRetries, maxConcurrency);
      const generationTasks = createGenerationTasks(entries, queue);
      const results = await Promise.all(generationTasks);

      return results.map((result) => {
        const matchedEntry = entries.find(
          (entry) => entry.id === result.groupId
        );
        if (!matchedEntry) {
          throw new Error("cannot find matching entry for HTML source results");
        }

        return {
          type: "image",
          id: result.id,
          groupId: result.groupId,
          path: result.screenshotPath,
          tags: matchedEntry.options?.tags ?? [],
          relativePath: matchedEntry.relativePath,
          metadata: matchedEntry.options?.metadata,
        };
      });
    },
    {
      maxBrowsers: maxConcurrency,
    }
  );
}

export type ScreenshotTaskRequest = {
  id: string;
  groupId: string;
  htmlPath: string;
  viewport: Viewport;
};

export type ScreenshotTaskResult = {
  id: string;
  groupId: string;
  screenshotPath: string;
};

export const DEFAULT_VIEWPORT: Viewport = {
  width: 1920,
  height: 1080,
};

function createGenerationTasks(
  entries: TestEntry[],
  queue: queueAsPromised<ScreenshotTaskRequest, ScreenshotTaskResult>
): Promise<ScreenshotTaskResult>[] {
  const requests = createGenerationTaskRequests(entries);

  return requests.map((request) => queue.push(request));
}

function createGenerationTaskRequests(
  entries: TestEntry[]
): ScreenshotTaskRequest[] {
  const tasks: ScreenshotTaskRequest[] = [];

  for (const entry of entries) {
    for (const viewport of entry.options?.viewports ?? [DEFAULT_VIEWPORT]) {
      const id = `${entry.id}-${serializeViewport(viewport)}`;

      tasks.push({
        id,
        groupId: entry.id,
        htmlPath: entry.path,
        viewport,
      });
    }
  }

  return tasks;
}

function serializeViewport(viewport: Viewport): string {
  return `${viewport.width}x${viewport.height}`;
}

async function takeScreenshotWithRetries(
  request: ScreenshotTaskRequest
): Promise<ScreenshotTaskResult> {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const browserPool: Pool<Browser> = this;

  let error;
  for (let attempt = 0; attempt < MAX_SCREENSHOT_ATTEMPTS; attempt++) {
    try {
      return await takeScreenshot(browserPool, request);
    } catch (currentError) {
      console.error(
        `experienced error while taking screenshot for target '${
          request.htmlPath
        }', trying again (attempt ${
          attempt + 1
        }/${MAX_SCREENSHOT_ATTEMPTS}): ` + currentError
      );
      error = currentError;
    }
  }

  throw error;
}

async function takeScreenshot(
  browserPool: Pool<Browser>,
  request: ScreenshotTaskRequest
): Promise<ScreenshotTaskResult> {
  return withPooledBrowser(browserPool, async (browser: Browser) => {
    return withPage(browser, async (page: Page) => {
      await page.setViewport(request.viewport);
      console.info(`screenshotting ${request.htmlPath}`);
      try {
        await page.goto(url.pathToFileURL(request.htmlPath).toString(), {
          timeout: 10000,
        });
      } catch (error) {
        if (!(error instanceof TimeoutError)) {
          throw error;
        }
      }

      try {
        await page.waitForNetworkIdle({ idleTime: 1000, timeout: 10000 });
      } catch {
        console.error(
          `loading ${request.htmlPath} timed out, could not wait for all network requests to be over`
        );
      }

      const screenshotPath = await performScreenshotWithTimeout(page);

      console.log("--> completed screenshot for: " + request.htmlPath);

      return {
        id: request.id,
        groupId: request.groupId,
        screenshotPath,
      };
    });
  });
}

async function performScreenshotWithTimeout(page: Page): Promise<string> {
  const screenshotPath = await createTemporaryFile("screenshot-html-", ".png");

  await Promise.race([
    page.screenshot({
      path: screenshotPath,
      type: "png",
      fullPage: true,
    }),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`screenshot operation timed out`)),
        10000
      )
    ),
  ]);

  return screenshotPath;
}
