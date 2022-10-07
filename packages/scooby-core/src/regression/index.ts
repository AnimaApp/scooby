import { getScoobyAPI } from "@animaapp/scooby-api";
import { HostedRegressionReport } from "@animaapp/scooby-types";
import { batchImageComparison } from "../comparison";
import { loadTestEntries } from "../loading";
import { matchSources } from "../matching";
import { generateImageSources } from "../source/image";
import { calculateRegressions } from "./changes";
import { printRegressionResults } from "./print";
import { loadReferenceEntries } from "./reference";

export type RegressionTestRequest = {
  name: string;
  testsPath: string;
  referencePath?: string;
};

export async function runRegressionTest(
  request: RegressionTestRequest
): Promise<HostedRegressionReport> {
  // TODO: validate name format (alphanumeric and dash)

  console.log("loading test entries from path: " + request.testsPath);
  const testEntries = await loadTestEntries(request.testsPath);
  console.log(`found ${testEntries.length} test entries`);

  console.log("initializing API...");
  const api = await getScoobyAPI();

  // TODO: Download reference test files from S3 (and check their format)

  console.log("loading reference dataset...");
  const referenceEntries = await loadReferenceEntries({
    localReferencePath: request.referencePath,
    api,
  });
  console.log(`found ${referenceEntries.length} reference entries`);

  console.log("generating test sources...");
  const testSources = await generateImageSources(testEntries, {});
  console.log(`generated ${testSources.length} test sources`);

  console.log("generating reference sources...");
  const referenceSources = await generateImageSources(referenceEntries, {});
  console.log(`generated ${referenceSources.length} reference sources`);

  console.log("matching datasets...");
  const matchedSources = matchSources(referenceSources, testSources);
  console.log(
    `found ${matchedSources.matching.length} matched tests, ${matchedSources.new.length} new test(s) and ${matchedSources.removed.length} removed test(s)`
  );

  console.log("comparing tests...");
  const comparisonResult = await batchImageComparison(matchedSources.matching);

  console.log("determining regressions...");
  const regressions = calculateRegressions(comparisonResult);

  printRegressionResults(regressions, matchedSources);

  // upload to S3

  throw new Error("not yet implemented");

  // return {
  //   new: matchedSources.new,

  //   removed: matchedSources.removed,
  // };
}
