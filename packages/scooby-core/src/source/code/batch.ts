import path from "path";
import Piscina from "piscina";
import { Formatter } from "../../types";
import runPrepareSourceProcess from "./worker";

export type PrepareCodeSourceRequest = {
  id: string;
  sourcePath: string;
  formatter?: Formatter;
};

export type PrepareCodeSourceResult = {
  id: string;
  preparedSourcePath: string;
};

export type BatchPrepareCodeSourcesOptions = {
  maxThreads?: number;
};

export async function batchPrepareCodeSources(
  requests: PrepareCodeSourceRequest[],
  options?: BatchPrepareCodeSourcesOptions
): Promise<PrepareCodeSourceResult[]> {
  // Some runtimes don't support running Typescript workers directly (such as Jest).
  // In such cases, we fall back to a serial mode
  if (doesRuntimeSupportWorkers()) {
    return runBatchOnWorker(requests, options);
  } else {
    return runBatchOnMainProcess(requests);
  }
}

async function runBatchOnWorker(
  requests: PrepareCodeSourceRequest[],
  options?: BatchPrepareCodeSourcesOptions
): Promise<PrepareCodeSourceResult[]> {
  const piscina = new Piscina({
    filename: path.resolve(__dirname, "worker.js"),
    maxThreads: options?.maxThreads ?? 4,
  });

  const tasks = createTasks(requests, piscina);
  return await Promise.all(tasks);
}

function createTasks(
  requests: PrepareCodeSourceRequest[],
  piscina: Piscina
): Promise<PrepareCodeSourceResult>[] {
  return requests.map((request) => piscina.run(request));
}

async function runBatchOnMainProcess(
  requests: PrepareCodeSourceRequest[]
): Promise<PrepareCodeSourceResult[]> {
  console.warn("FALLING BACK TO SLOWER SERIAL BATCH PREPARE SOURCE MODE");

  const results: PrepareCodeSourceResult[] = [];

  for (const request of requests) {
    const result = await runPrepareSourceProcess(request);
    results.push(result);
  }

  return results;
}

function doesRuntimeSupportWorkers(): boolean {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(path.resolve(__dirname, "worker.js"));
    return true;
  } catch {
    return false;
  }
}
