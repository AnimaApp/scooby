import { LocalRegressionReport } from "@animaapp/scooby-shared";
import { performBatchComparison } from "../../comparison";
import { loadTestEntries } from "../../loading";
import { matchSources } from "../../matching";
import { generateSources, GenerateSourcesOptions } from "../../source";
import {
  BaseReportParams,
  Formatter,
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
  formatter?: Formatter;
  maxThreads?: number;
  maxReferenceCommitBacktracking?: number;
  fileType?: string;
};

export async function runRegressionReport(
  context: ReportContext,
  params: RegressionReportParams
): Promise<LocalRegressionReport> {
  console.log("loading test entries from path: " + params.testsPath);
  const testEntries = await loadTestEntries(params.testsPath, params.fileType);
  console.log(`found ${testEntries.length} test entries`);

  console.log("generating test sources...");
  const sourceGenerationOptions: GenerateSourcesOptions = {
    maxThreads: params.maxThreads,
    formatter: params.formatter,
  };
  const testSources = await generateSources(
    testEntries,
    sourceGenerationOptions
  );
  console.log(`generated ${testSources.length} test sources`);

  if (context.environment.isMainBranch) {
    return performMainBranchFlow(context, params, testSources);
  } else {
    return performFeatureBranchFlow(
      context,
      params,
      testSources,
      sourceGenerationOptions
    );
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

  console.log("generating report...");
  return generateMainBranchReport({
    name: params.name,
    commitHash: context.environment.currentCommitHash,
    entries: testSources,
  });
}

async function performFeatureBranchFlow(
  context: ReportContext,
  params: RegressionReportParams,
  testSources: SourceEntry[],
  sourceGenerationOptions: GenerateSourcesOptions
): Promise<LocalRegressionReport> {
  console.log("loading reference dataset...");
  const { entries: referenceEntries, referenceCommitHash } =
    await loadReferenceEntries({
      currentCommit: context.environment.currentCommitHash,
      latestMainBranchCommits: context.environment.latestMainBranchCommitHashes,
      snapshotName: params.name,
      localReferencePath: params.referencePath,
      maxReferenceCommitBacktracking: params.maxReferenceCommitBacktracking,
      api: context.api,
    });
  console.log(`found ${referenceEntries.length} reference entries`);

  console.log(
    "this regression test will be compared against snapshot with git hash: " +
      referenceCommitHash
  );

  console.log("generating reference sources...");
  const referenceSources = await generateSources(
    referenceEntries,
    sourceGenerationOptions
  );
  console.log(`generated ${referenceSources.length} reference sources`);

  console.log("matching datasets...");
  const matchedSources = matchSources(referenceSources, testSources);
  console.log(
    `found ${matchedSources.matching.length} matched tests, ${matchedSources.new.length} new test(s) and ${matchedSources.removed.length} removed test(s)`
  );

  console.log("comparing tests...");
  const comparisonResult = await performBatchComparison(
    matchedSources.matching,
    {
      maxThreads: params.maxThreads,
    }
  );

  console.log("determining regressions...");
  const regressions = calculateRegressions(comparisonResult);

  console.log("generating report...");
  const report = await generateReport({
    name: params.name,
    commitHash: context.environment.currentCommitHash,
    baseCommitHash: referenceCommitHash,
    regressions,
    matchedSources,
  });

  return report;
}
