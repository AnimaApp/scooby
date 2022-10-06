import { loadTestEntries } from "../loading";
import { RegressionTestRequest, RegressionTestResult } from "../types";

export async function runRegressionTest(
  request: RegressionTestRequest
): Promise<RegressionTestResult> {
  console.log("loading test entries in path: " + request.testsPath);
  const testEntries = await loadTestEntries(request.testsPath);
  console.log(`found ${testEntries.length} test entries`);

  // Load requested test files (and check their format)
  // Download reference test files from S3 (and check their format)
  // Compute the matching pairs (by id)
  // Compute the diffs on the matching pairs (by id)
  // Return diffs
  throw new Error("not yet implemented");
}
