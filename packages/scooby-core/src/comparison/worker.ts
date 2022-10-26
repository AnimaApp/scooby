import { compareImages } from "./image/diff";
import type {
  ComparisonTaskRequest,
  ComparisonTaskResult,
  ImageComparisonTaskResult,
  ImageComparisonTaskRequest,
} from "./types";

export default async function runComparison(
  request: ComparisonTaskRequest
): Promise<ComparisonTaskResult> {
  if (request.type === "image") {
    return runImageComparison(request);
  }

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

module.exports = runComparison;
