import url from "url";
import { v4 as uuidv4 } from "uuid";
import { Page, TimeoutError } from "puppeteer";
import { withCluster } from "./runtime";
import { GenerateImageSourcesOptions } from "..";
import { ImageSourceEntry, TestEntry, Viewport } from "../../../types";
import { createTemporaryFile } from "../../../utils/temp";

export async function generateHTMLImageSources(
  entries: TestEntry[],
  options: GenerateImageSourcesOptions
): Promise<ImageSourceEntry[]> {
  return withCluster<ScreenshotTaskRequest, void, Promise<ImageSourceEntry[]>>(
    async (cluster) => {
      await cluster.task(processScreenshot);

      const results: Record<RequestId, ScreenshotTaskResult> = {};

      const requests = createGenerationTaskRequests(entries, results);
      for (const request of Object.values(requests)) {
        cluster.queue(request);
      }

      // Wait for all jobs to be completed
      await cluster.idle();

      if (Object.values(results).length < Object.values(requests).length) {
        console.error(
          "\ndespite the auto-retries, some tasks failed to complete:"
        );
        Object.entries(requests)
          .filter(([requestId]) => !(requestId in results))
          .forEach(([, request]) => {
            console.error(" ->", request.htmlPath);
          });

        throw new Error(
          "some tasks failed to complete, please see the logs to get more information"
        );
      }

      return Object.values(results).map((result) => {
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
      maxConcurrency: options.maxThreads ?? 4,
    }
  );
}

type RequestId = string;

export type ScreenshotTaskRequest = {
  requestId: RequestId;
  id: string;
  groupId: string;
  htmlPath: string;
  viewport: Viewport;

  // We want to rely on puppeteer-cluster auto-retry functionality, so we need to provide
  // a way to pass the task result without returning it directly
  _resultStore: Record<RequestId, ScreenshotTaskResult>;
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

function createGenerationTaskRequests(
  entries: TestEntry[],
  resultsStore: Record<RequestId, ScreenshotTaskResult>
): Record<RequestId, ScreenshotTaskRequest> {
  const tasks: Record<RequestId, ScreenshotTaskRequest> = {};

  for (const entry of entries) {
    for (const viewport of entry.options?.viewports ?? [DEFAULT_VIEWPORT]) {
      const id = `${entry.id}-${serializeViewport(viewport)}`;
      const requestId = uuidv4();

      tasks[requestId] = {
        requestId,
        id,
        groupId: entry.id,
        htmlPath: entry.path,
        viewport,
        _resultStore: resultsStore,
      };
    }
  }

  return tasks;
}

function serializeViewport(viewport: Viewport): string {
  return `${viewport.width}x${viewport.height}`;
}

async function processScreenshot({
  page,
  data: request,
}: {
  page: Page;
  data: ScreenshotTaskRequest;
}): Promise<void> {
  const result = await takeScreenshot(page, request);

  request._resultStore[request.requestId] = result;
}

async function takeScreenshot(
  page: Page,
  request: ScreenshotTaskRequest
): Promise<ScreenshotTaskResult> {
  try {
    await page.setViewport(request.viewport);
    console.info(`screenshotting ${request.htmlPath}...`);
    try {
      await page.goto(url.pathToFileURL(request.htmlPath).toString(), {
        timeout: 10,
      });
    } catch (error) {
      // We are ok with timeout errors at this stage
      if (!(error instanceof TimeoutError)) {
        throw error;
      }
    }

    try {
      await page.waitForNetworkIdle({ idleTime: 1000, timeout: 10000 });
    } catch {
      console.error(
        `loading ${request.htmlPath} timed out, could not wait until all network traffic was idle`
      );
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

    console.log(`completed screenshot for: ${request.htmlPath}`);

    return {
      id: request.id,
      groupId: request.groupId,
      screenshotPath,
    };
  } catch (error) {
    console.error(
      `experienced error while processing target '${request.htmlPath}'`,
      error
    );
    throw error;
  }
}
