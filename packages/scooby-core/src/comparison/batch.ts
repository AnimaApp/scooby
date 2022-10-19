import path from "path";
import Piscina from "piscina";
import {
  ComparisonTaskRequest,
  BatchComparisonOptions,
  ComparisonTaskResult,
} from "./types";
import runComparison from "./worker";

export async function batchComparison(
  requests: ComparisonTaskRequest[],
  options?: BatchComparisonOptions
): Promise<ComparisonTaskResult[]> {
  // Some runtimes don't support running Typescript workers directly (such as Jest).
  // In such cases, we fall back to a serial mode
  if (doesRuntimeSupportWorkers()) {
    return runBatchComparisonOnWorker(requests, options);
  } else {
    return runBatchComparisonMainProcess(requests);
  }
}

async function runBatchComparisonOnWorker(
  requests: ComparisonTaskRequest[],
  options?: BatchComparisonOptions
): Promise<ComparisonTaskResult[]> {
  const piscina = new Piscina({
    filename: path.resolve(__dirname, "worker.js"),
    maxThreads: options?.maxThreads ?? 4,
  });

  const generationTasks = createGenerationTasks(requests, piscina);
  return await Promise.all(generationTasks);
}

function createGenerationTasks(
  requests: ComparisonTaskRequest[],
  piscina: Piscina
): Promise<ComparisonTaskResult>[] {
  return requests.map((request) => piscina.run(request));
}

async function runBatchComparisonMainProcess(
  requests: ComparisonTaskRequest[]
): Promise<ComparisonTaskResult[]> {
  console.warn("FALLING BACK TO SLOWER SERIAL BATCH COMPARISON MODE");

  const results: ComparisonTaskResult[] = [];

  for (const request of requests) {
    const result = await runComparison(request);
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
