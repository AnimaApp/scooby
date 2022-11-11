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

      console.debug("results promises have all been completed");

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
      console.debug(request.htmlPath, "before takeScreenshot action");
      const screenshot = await takeScreenshot(browserPool, request);
      console.debug(request.htmlPath, "after takeScreenshot action");
      return screenshot;
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
  console.debug(request.htmlPath, "starting pooled browser");
  const screenshot = await withPooledBrowser(
    browserPool,
    async (browser: Browser) => {
      console.debug(request.htmlPath, "starting page");
      const screenshot = await withPage(browser, async (page: Page) => {
        console.info(`screenshotting ${request.htmlPath}`);
        await page.setViewport(request.viewport);
        console.debug(request.htmlPath, "viewport set");
        await gotoWithTimeout(
          page,
          url.pathToFileURL(request.htmlPath).toString(),
          30000
        );
        console.debug(request.htmlPath, "after GOTO");

        const screenshotPath = await performScreenshotWithTimeout(page);
        console.debug(request.htmlPath, "after screenshot");

        console.log(
          "--> completed screenshot for: " + request.htmlPath,
          "-->",
          screenshotPath
        );

        return {
          id: request.id,
          groupId: request.groupId,
          screenshotPath,
        };
      });
      console.debug(request.htmlPath, "after page");

      return screenshot;
    }
  );
  console.debug(request.htmlPath, "after pooled browser");

  return screenshot;
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

async function gotoWithTimeout(
  page: Page,
  url: string,
  timeoutMs: number
): Promise<void> {
  try {
    // Sometimes page.goto hangs indefinitely (possibly due to resource/memory issues),
    // causing the whole screenshot operation to hang.
    // Therefore, we also place a hard timeout on the operation, which should trigger
    // a browser instance refresh and operation retry.
    await Promise.race([
      page.goto(url, {
        waitUntil: "networkidle0",
        timeout: timeoutMs,
      }),
      new Promise((_, reject) =>
        setTimeout(
          () =>
            reject(
              new Error(
                `goto operation timed out unexpectedly, this might be caused by resource issues`
              )
            ),
          timeoutMs + 10000
        )
      ),
    ]);
  } catch (error) {
    if (!(error instanceof TimeoutError)) {
      throw error;
    }
  }
}
