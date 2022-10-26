import path from "path";
import Piscina from "piscina";
import {
  ComparisonTaskRequest,
  BatchComparisonOptions,
  ComparisonTaskResult,
} from "./types";
import runComparison from "./worker";

export async function runComparisonBatch<
  TRequest extends ComparisonTaskRequest,
  TResult extends ComparisonTaskResult
>(requests: TRequest[], options?: BatchComparisonOptions): Promise<TResult[]> {
  // Some runtimes don't support running Typescript workers directly (such as Jest).
  // In such cases, we fall back to a serial mode
  if (doesRuntimeSupportWorkers()) {
    return runBatchOnWorker(requests, options);
  } else {
    return runBatchOnMainProcess(requests);
  }
}

async function runBatchOnWorker<
  TRequest extends ComparisonTaskRequest,
  TResult extends ComparisonTaskResult
>(requests: TRequest[], options?: BatchComparisonOptions): Promise<TResult[]> {
  const piscina = new Piscina({
    filename: path.resolve(__dirname, "worker.js"),
    maxThreads: options?.maxThreads ?? 4,
  });

  const generationTasks = createGenerationTasks(requests, piscina);
  const results = await Promise.all(generationTasks);

  validateResultCoherence(requests, results);

  return results as TResult[];
}

function createGenerationTasks(
  requests: ComparisonTaskRequest[],
  piscina: Piscina
): Promise<ComparisonTaskResult>[] {
  return requests.map((request) => piscina.run(request));
}

async function runBatchOnMainProcess<
  TRequest extends ComparisonTaskRequest,
  TResult extends ComparisonTaskResult
>(requests: TRequest[]): Promise<TResult[]> {
  console.warn("FALLING BACK TO SLOWER SERIAL BATCH COMPARISON MODE");

  const results: ComparisonTaskResult[] = [];

  for (const request of requests) {
    const result = await runComparison(request);
    results.push(result);
  }

  validateResultCoherence(requests, results);

  return results as TResult[];
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

function validateResultCoherence<
  TRequest extends ComparisonTaskRequest,
  TResult extends ComparisonTaskResult & { type: TRequest["type"] }
>(requests: TRequest[], results: TResult[]) {
  const requestType = requests?.[0].type;
  if (!requestType) {
    throw new Error("expected at least one request object");
  }

  if (!results.every((result) => result.type === requestType)) {
    throw new Error(
      `invalid results received from comparison batch, expected all results to be of type '${requestType}', but some entries have different values`
    );
  }
}
