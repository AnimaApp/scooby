import { LocalFidelityRegressionReport } from "@animaapp/scooby-shared";
import { BatchComparisonEntry, performBatchComparison } from "../../comparison";
import { loadTestEntries } from "../../loading";
import { matchSources } from "../../matching";
import { generateSources, GenerateSourcesOptions } from "../../source";
import {
  BaseReportParams,
  FidelityMatchingType,
  Formatter,
  ReportContext,
  SourceEntry,
} from "../../types";
import { loadReferenceEntries } from "../shared/reference";
import { generateMainBranchReport, generateReport } from "./report";
import { uploadTestSnapshot } from "../shared/snapshot";
import { validateMatchedFidelitySources } from "../shared/match-validation";
import { calculateRegressions } from "../shared/regression";

export type RegressionReportParams = BaseReportParams & {
  expectedPath: string;
  actualPath: string;
  actualFileTypes: string[];
  expectedFileTypes: string[];
  fidelityMatching?: FidelityMatchingType;
  referencePath?: string;
  formatter?: Formatter;
  maxThreads?: number;
  maxReferenceCommitBacktracking?: number;
};

export async function runFidelityRegressionReport(
  context: ReportContext,
  params: RegressionReportParams
): Promise<LocalFidelityRegressionReport> {
  console.log(
    "loading expected test entries from path: " + params.expectedPath
  );
  const expectedEntries = await loadTestEntries(
    params.expectedPath,
    params.expectedFileTypes
  );
  console.log(`found ${expectedEntries.length} expected test entries`);

  console.log("loading actual test entries from path: " + params.actualPath);
  const actualEntries = await loadTestEntries(
    params.actualPath,
    params.actualFileTypes
  );
  console.log(`found ${expectedEntries.length} actual test entries`);

  const sourceGenerationOptions: GenerateSourcesOptions = {
    formatter: params.formatter,
    maxThreads: params.maxThreads,
  };
  console.log("generating expected test sources...");
  const expectedSources = await generateSources(
    expectedEntries,
    sourceGenerationOptions
  );
  console.log(`generated ${expectedSources.length} expected test sources`);

  console.log("generating actual test sources...");
  const actualSources = await generateSources(
    actualEntries,
    sourceGenerationOptions
  );
  console.log(`generated ${actualSources.length} actual test sources`);

  console.log("matching fidelity datasets...");
  const matchedFidelitySources = matchSources(expectedSources, actualSources, {
    strategy: params.fidelityMatching,
  });
  validateMatchedFidelitySources(matchedFidelitySources);

  console.log("comparing fidelity tests...");
  const fidelityComparisonResult = await performBatchComparison(
    matchedFidelitySources.matching,
    {
      maxThreads: params.maxThreads,
    }
  );

  if (context.environment.isMainBranch) {
    return performMainBranchFlow(
      context,
      params,
      fidelityComparisonResult.comparisons
    );
  } else {
    return performFeatureBranchFlow(
      context,
      params,
      actualSources,
      fidelityComparisonResult.comparisons,
      sourceGenerationOptions
    );
  }
}

async function performMainBranchFlow(
  context: ReportContext,
  params: RegressionReportParams,
  fidelityComparisons: BatchComparisonEntry[]
): Promise<LocalFidelityRegressionReport> {
  console.log("fidelity-regression tests are auto-approved on default branch");

  if (!context.isLocalRun) {
    await uploadTestSnapshot(
      params.name,
      params.actualPath,
      context.environment.currentCommitHash,
      context.api
    );
  } else {
    console.log("skipping snapshot upload on local run");
  }

  console.log("generating report...");
  return generateMainBranchReport({
    name: params.name,
    commitHash: context.environment.currentCommitHash,
    fidelityComparisons: fidelityComparisons,
  });
}

async function performFeatureBranchFlow(
  context: ReportContext,
  params: RegressionReportParams,
  actualSources: SourceEntry[],
  fidelityComparisons: BatchComparisonEntry[],
  sourceGenerationOptions: GenerateSourcesOptions
): Promise<LocalFidelityRegressionReport> {
  console.log("loading reference dataset...");
  const { entries: referenceEntries, referenceCommitHash } =
    await loadReferenceEntries({
      currentCommit: context.environment.currentCommitHash,
      latestBaseCommits: context.environment.latestBaseCommitHashes,
      fileTypes: params.actualFileTypes,
      snapshotName: params.name,
      localReferencePath: params.referencePath,
      maxReferenceCommitBacktracking: params.maxReferenceCommitBacktracking,
      api: context.api,
    });
  console.log(`found ${referenceEntries.length} reference entries`);

  console.log(
    "this fidelity-regression test will be compared against snapshot with git hash: " +
      referenceCommitHash
  );

  console.log("generating reference sources...");
  const referenceSources = await generateSources(
    referenceEntries,
    sourceGenerationOptions
  );
  console.log(`generated ${referenceSources.length} reference sources`);

  console.log("matching regression datasets...");
  const matchedRegressionSources = matchSources(
    referenceSources,
    actualSources
  );
  console.log(
    `found ${matchedRegressionSources.matching.length} matched tests, ${matchedRegressionSources.new.length} new test(s) and ${matchedRegressionSources.removed.length} removed test(s)`
  );

  console.log("comparing regression tests...");
  const regressionComparisonResult = await performBatchComparison(
    matchedRegressionSources.matching,
    {
      maxThreads: params.maxThreads,
    }
  );

  console.log("determining regressions...");
  const regressions = calculateRegressions(regressionComparisonResult);

  console.log("generating report...");
  const report = await generateReport({
    name: params.name,
    commitHash: context.environment.currentCommitHash,
    baseCommitHash: referenceCommitHash,
    regressions,
    matchedRegressionSources: matchedRegressionSources,
    fidelityComparisons,
  });

  return report;
}
