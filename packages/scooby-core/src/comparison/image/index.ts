import type {
  BatchComparisonOptions,
  ImageBatchComparisonEntry,
  ImageBatchComparisonResult,
  ImageComparisonTaskRequest,
  ImageComparisonTaskResult,
} from "../types";
import { ImageSourceEntry } from "../../types";
import { runComparisonBatch } from "../batch";
import { MatchedPair } from "../../matching";

export async function performBatchImageComparison(
  pairs: MatchedPair<ImageSourceEntry>[],
  options?: Partial<BatchComparisonOptions>
): Promise<ImageBatchComparisonResult> {
  const requests: ImageComparisonTaskRequest[] = pairs.map((pair) => ({
    actual: pair.actual,
    expected: pair.expected,
    options: options?.imageComparisonOptions,
    type: "image",
  }));

  const comparisons = await runComparisonBatch<
    ImageComparisonTaskRequest,
    ImageComparisonTaskResult
  >(requests, options);

  return {
    type: "image",
    comparisons: comparisons.map(mapToComparisonEntry),
  };
}

function mapToComparisonEntry(
  result: ImageComparisonTaskResult
): ImageBatchComparisonEntry {
  return {
    type: "image",
    actual: result.actual,
    comparison: result.comparison,
    expected: result.expected,
  };
}
