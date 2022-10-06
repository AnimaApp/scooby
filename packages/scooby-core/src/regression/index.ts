import { loadTestEntries } from "../loading";
import { generateImageSources } from "../source/image";
import { RegressionTestRequest, RegressionTestResult } from "../types";
import { loadReferenceEntries } from "./reference";

export async function runRegressionTest(
  request: RegressionTestRequest
): Promise<RegressionTestResult> {
  // TODO: validate name format (alphanumeric and dash)

  console.log("loading test entries from path: " + request.testsPath);
  const testEntries = await loadTestEntries(request.testsPath);
  console.log(`found ${testEntries.length} test entries`);

  // TODO: Download reference test files from S3 (and check their format)

  console.log("loading reference dataset...");
  const referenceEntries = await loadReferenceEntries({
    localReferencePath: request.referencePath,
  });
  console.log(`found ${referenceEntries.length} reference entries`);

  console.log("generating test sources...");
  const testSources = await generateImageSources(testEntries, {});
  console.log(`generated ${testSources.length} test sources`);

  console.log("generating reference sources...");
  const referenceSources = await generateImageSources(referenceEntries, {});
  console.log(`generated ${referenceSources.length} reference sources`);

  console.log(testSources);
  console.log(referenceSources);

  // Compute the matching pairs (by id)
  // Compute the diffs on the matching pairs (by id)
  // Return diffs
  throw new Error("not yet implemented");
}
