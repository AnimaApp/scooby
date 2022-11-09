import url from "url";
import fastq, { queueAsPromised } from "fastq";
import { GenerateImageSourcesOptions } from "..";

import { ImageSourceEntry, TestEntry, Viewport } from "../../../types";
import { Browser, Page } from "puppeteer";
import { withBrowser, withPage } from "./runtime";
import { createTemporaryFile } from "../../../utils/temp";

const MAX_SCREENSHOT_ATTEMPTS = 3;

export async function generateHTMLImageSources(
  entries: TestEntry[],
  options: GenerateImageSourcesOptions
): Promise<ImageSourceEntry[]> {
  return await withBrowser(async (browser: Browser) => {
    const queue = fastq.promise<
      Browser,
      ScreenshotTaskRequest,
      ScreenshotTaskResult
    >(browser, takeScreenshotWithRetries, options.maxThreads ?? 4);
    const generationTasks = createGenerationTasks(entries, queue);
    const results = await Promise.all(generationTasks);

    return results.map((result) => {
      const matchedEntry = entries.find((entry) => entry.id === result.groupId);
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
  });
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
  const browser: Browser = this;

  let error;
  for (let attempt = 0; attempt < MAX_SCREENSHOT_ATTEMPTS; attempt++) {
    try {
      const result = await takeScreenshot(browser, request);
      return result;
    } catch (currentError) {
      console.error(
        "experienced error while taking screenshot, trying again: " +
          currentError
      );
      error = currentError;
    }
  }

  throw error;
}

async function takeScreenshot(
  browser: Browser,
  request: ScreenshotTaskRequest
): Promise<ScreenshotTaskResult> {
  return await withPage(browser, async (page: Page) => {
    await page.setViewport(request.viewport);
    console.info(`Screenshotting ${request.htmlPath}`);
    await page.goto(url.pathToFileURL(request.htmlPath).toString(), {
      waitUntil: "load",
    });

    try {
      await page.waitForNetworkIdle({ idleTime: 1000, timeout: 8000 });
    } catch {
      console.error(`Loading ${request.htmlPath} timed out`);
    }

    const screenshotPath = await createTemporaryFile(
      "screenshot-html-",
      ".png"
    );
    await page.screenshot({
      path: screenshotPath,
      type: "png",
      fullPage: true,
    });

    return {
      id: request.id,
      groupId: request.groupId,
      screenshotPath,
    };
  });
}
