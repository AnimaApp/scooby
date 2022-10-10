import { getScoobyAPI } from "@animaapp/scooby-api";
import { ScoobyAPI } from "@animaapp/scooby-api/src/types";
import { batchImageComparison } from "../comparison";
import { Context, getContext } from "../context";
import { loadTestEntries } from "../loading";
import { matchSources } from "../matching";
import { generateImageSources } from "../source/image";
import { TestEntry } from "../types";
import { calculateRegressions } from "./changes";
import { printRegressionResults } from "./print";
import { loadReferenceEntries } from "./reference";
import { generateReport } from "./report";
import { uploadTestSnapshot } from "./snapshot";

export type RegressionTestRequest = {
  name: string;
  testsPath: string;
  referencePath?: string;
};

export async function runRegressionTest(
  request: RegressionTestRequest
): Promise<void> {
  // TODO: validate name format (alphanumeric and dash)
  const context = await getContext();
  console.log("Loaded context: ", context);

  console.log("loading test entries from path: " + request.testsPath);
  const testEntries = await loadTestEntries(request.testsPath);
  console.log(`found ${testEntries.length} test entries`);

  console.log("initializing API...");
  const api = await getScoobyAPI({
    repositoryName: context.repositoryName,
  });

  if (context.isMainBranch) {
    return performMainBranchFlow(request, context, api);
  } else {
    return performFeatureBranchFlow(request, context, testEntries, api);
  }
}

async function performMainBranchFlow(
  request: RegressionTestRequest,
  context: Context,
  api: ScoobyAPI
): Promise<void> {
  console.log(
    "skipping regression test as changes are auto-approved on default branch"
  );

  await uploadTestSnapshot(
    request.name,
    request.testsPath,
    context.currentCommitHash,
    api
  );
}

async function performFeatureBranchFlow(
  request: RegressionTestRequest,
  context: Context,
  testEntries: TestEntry[],
  api: ScoobyAPI
): Promise<void> {
  if (!context.baseCommitHash) {
    throw new Error(
      "unable to run regression test, as Scooby was unable to determine the base commit hash"
    );
  }

  console.log(
    "this regression test will be compared against snapshot with git hash: " +
      context.baseCommitHash
  );

  console.log("loading reference dataset...");
  const referenceEntries = await loadReferenceEntries({
    baseCommitHash: context.baseCommitHash,
    snapshotName: request.name,
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

  const report = generateReport({
    name: request.name,
    commitHash: context.currentCommitHash,
    baseCommitHash: context.baseCommitHash,
    regressions,
    matchedSources,
  });

  await api.uploadRegressionReport(
    { commitHash: context.currentCommitHash },
    report
  );
}
