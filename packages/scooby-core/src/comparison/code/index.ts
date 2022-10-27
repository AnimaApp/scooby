import type {
  BatchComparisonOptions,
  CodeBatchComparisonEntry,
  CodeBatchComparisonResult,
  CodeComparisonTaskRequest,
  CodeComparisonTaskResult,
} from "../types";
import { MatchedPair } from "../../matching";
import { CodeSourceEntry } from "../../types";
import { runComparisonBatch } from "../batch";

export async function performBatchCodeComparison(
  pairs: MatchedPair<CodeSourceEntry>[],
  options?: Partial<BatchComparisonOptions>
): Promise<CodeBatchComparisonResult> {
  const requests: CodeComparisonTaskRequest[] = pairs.map((pair) => ({
    actual: pair.actual,
    expected: pair.expected,
    options: options?.codeComparisonOptions,
    type: "code",
  }));

  const comparisons = await runComparisonBatch<
    CodeComparisonTaskRequest,
    CodeComparisonTaskResult
  >(requests, options);

  return {
    type: "code",
    comparisons: comparisons.map(mapToComparisonEntry),
  };
}

function mapToComparisonEntry(
  result: CodeComparisonTaskResult
): CodeBatchComparisonEntry {
  return {
    type: "code",
    actual: result.actual,
    comparison: result.comparison,
    expected: result.expected,
  };
}
