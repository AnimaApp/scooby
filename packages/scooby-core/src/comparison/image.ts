import type {
  BatchComparisonOptions,
  ImageComparisonTaskRequest,
  ImageComparisonTaskResult,
} from "./types";
import { MatchedPair } from "../matching";
import { ImageSourceEntry } from "../types";
import { batchComparison } from "./batch";
import { ImageComparisonOptions, ImageComparisonResult } from "../image-diff";

export type BatchImageComparisonEntry = {
  expected: ImageSourceEntry;
  actual: ImageSourceEntry;
  comparison: ImageComparisonResult;
};

export type BatchImageComparisonResult = {
  comparisons: BatchImageComparisonEntry[];
};

export type BatchImageComparisonOptions = BatchComparisonOptions & {
  imageDiffOptions?: ImageComparisonOptions;
};

export async function batchImageComparison(
  pairs: MatchedPair<ImageSourceEntry>[],
  options?: Partial<BatchImageComparisonOptions>
): Promise<BatchImageComparisonResult> {
  const requests: ImageComparisonTaskRequest[] = pairs.map((pair) => ({
    actual: pair.actual,
    expected: pair.expected,
    options: options?.imageDiffOptions,
    type: "image",
  }));

  const comparisons = await batchComparison(requests, options);

  return {
    comparisons: comparisons.map(mapToComparisonEntry),
  };
}

function mapToComparisonEntry(
  result: ImageComparisonTaskResult
): BatchImageComparisonEntry {
  return {
    actual: result.actual,
    comparison: result.comparison,
    expected: result.expected,
  };
}
