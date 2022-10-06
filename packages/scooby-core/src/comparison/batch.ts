import path from "path";
import Piscina from "piscina";
import {
  ComparisonTaskRequest,
  BatchComparisonOptions,
  ComparisonTaskResult,
} from "./types";

export async function batchComparison<T>(
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
