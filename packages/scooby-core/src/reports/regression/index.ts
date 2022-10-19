import { LocalRegressionReport } from "@animaapp/scooby-shared";
import { batchImageComparison } from "../../comparison";
import { loadTestEntries } from "../../loading";
import { matchSources } from "../../matching";
import { generateImageSources } from "../../source/image";
import {
  BaseReportParams,
  ImageSourceEntry,
  ReportContext,
  SourceEntry,
} from "../../types";
import { calculateRegressions } from "./changes";
import { loadReferenceEntries } from "./reference";
import { generateMainBranchReport, generateReport } from "./report";
import { uploadTestSnapshot } from "./snapshot";

export type RegressionReportParams = BaseReportParams & {
  testsPath: string;
  referencePath?: string;
};

export async function runRegressionReport(
  context: ReportContext,
  params: RegressionReportParams
): Promise<LocalRegressionReport> {
  console.log("loading test entries from path: " + params.testsPath);
  const testEntries = await loadTestEntries(params.testsPath);
  console.log(`found ${testEntries.length} test entries`);

  console.log("generating test sources...");
  const testSources = await generateImageSources(testEntries, {});
  console.log(`generated ${testSources.length} test sources`);

  if (context.environment.isMainBranch) {
    return performMainBranchFlow(context, params, testSources);
  } else {
    return performFeatureBranchFlow(context, params, testSources);
  }
}

async function performMainBranchFlow(
  context: ReportContext,
  params: RegressionReportParams,
  testSources: SourceEntry[]
): Promise<LocalRegressionReport> {
  console.log("regression tests are auto-approved on default branch");

  await uploadTestSnapshot(
    params.name,
    params.testsPath,
    context.environment.currentCommitHash,
    context.api
  );

  return generateMainBranchReport({
    name: params.name,
    commitHash: context.environment.currentCommitHash,
    entries: testSources,
  });
}

async function performFeatureBranchFlow(
  context: ReportContext,
  params: RegressionReportParams,
  testSources: ImageSourceEntry[]
): Promise<LocalRegressionReport> {
  console.log(
    "this regression test will be compared against snapshot with git hash: " +
      context.environment.baseCommitHash
  );

  console.log("loading reference dataset...");
  const referenceEntries = await loadReferenceEntries({
    baseCommitHash: context.environment.baseCommitHash,
    snapshotName: params.name,
    localReferencePath: params.referencePath,
    api: context.api,
  });
  console.log(`found ${referenceEntries.length} reference entries`);

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

  const report = generateReport({
    name: params.name,
    commitHash: context.environment.currentCommitHash,
    baseCommitHash: context.environment.baseCommitHash,
    regressions,
    matchedSources,
  });

  return report;
}
