import { RegressionTestRequest, RegressionTestResult } from "../types";

export async function runRegressionTest(
  request: RegressionTestRequest
): Promise<RegressionTestResult> {
  // Load requested test files (and check their format)
  // Download reference test files from S3 (and check their format)
  // Compute the diffs on the matching pairs (by id)
  // Return diffs
  throw new Error("not yet implemented");
}
