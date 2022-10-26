import { getCodeComparator } from "./code/diff";
import { compareImages } from "./image/diff";
import type {
  ComparisonTaskRequest,
  ComparisonTaskResult,
  ImageComparisonTaskResult,
  ImageComparisonTaskRequest,
  CodeComparisonTaskRequest,
  CodeComparisonTaskResult,
} from "./types";

export default async function runComparison(
  request: ComparisonTaskRequest
): Promise<ComparisonTaskResult> {
  if (request.type === "image") {
    return runImageComparison(request);
  } else if (request.type === "code") {
    return runCodeComparison(request);
  }

  // @ts-ignore
  throw new Error("invalid comparison request type: " + request.type);
}

async function runImageComparison(
  request: ImageComparisonTaskRequest
): Promise<ImageComparisonTaskResult> {
  const comparison = await compareImages(
    request.expected.path,
    request.actual.path,
    request.options
  );

  return {
    type: "image",
    expected: request.expected,
    actual: request.actual,
    comparison,
  };
}

async function runCodeComparison(
  request: CodeComparisonTaskRequest
): Promise<CodeComparisonTaskResult> {
  const comparator = getCodeComparator({
    comparator: request.options?.comparator,
  });

  const comparison = await comparator.compare(
    request.expected.path,
    request.actual.path
  );

  return {
    type: "code",
    expected: request.expected,
    actual: request.actual,
    comparison,
  };
}

module.exports = runComparison;
