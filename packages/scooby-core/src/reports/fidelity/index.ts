import { LocalFidelityReport } from "@animaapp/scooby-shared";
import { performBatchComparison } from "../../comparison";
import { loadTestEntries } from "../../loading";
import { MatchedSources, matchSources } from "../../matching";
import { generateSources, GenerateSourcesOptions } from "../../source";
import {
  BaseReportParams,
  Formatter,
  ReportContext,
  SourceEntry,
} from "../../types";
import { generateReport } from "./report";
import { calculateEntriesOutcome } from "./threshold";

export type FidelityTestParams = BaseReportParams & {
  expectedPath: string;
  actualPath: string;
  formatter?: Formatter;
  maxThreads?: number;
  threshold?: number;
  fileType?: string;
};

export async function runFidelityReport(
  context: ReportContext,
  params: FidelityTestParams
): Promise<LocalFidelityReport> {
  console.log(
    "loading expected test entries from path: " + params.expectedPath
  );
  const expectedEntries = await loadTestEntries(params.expectedPath);
  console.log(`found ${expectedEntries.length} expected test entries`);

  console.log("loading actual test entries from path: " + params.actualPath);
  const actualEntries = await loadTestEntries(params.actualPath);
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

  console.log("matching datasets...");
  const matchedSources = matchSources(expectedSources, actualSources);

  validateMatchedSources(matchedSources);

  console.log(`found ${matchedSources.matching.length} matched tests`);

  console.log("comparing tests...");
  const comparisonResult = await performBatchComparison(
    matchedSources.matching
  );

  console.log("computing items below threshold...");
  const outcome = calculateEntriesOutcome(comparisonResult, {
    threshold: params.threshold,
  });

  console.log("generating report...");
  const report = await generateReport({
    name: params.name,
    commitHash: context.environment.currentCommitHash,
    outcome,
  });

  return report;
}

function validateMatchedSources(matchedSources: MatchedSources<SourceEntry>) {
  if (matchedSources.new.length > 0) {
    console.warn(
      "INVALID DATASET, detected actual entries not present in the expected dataset: ",
      matchedSources.new.map((entry) => entry.id)
    );

    throw new Error(
      "invalid dataset, found actual test entries that are not present in the expected dataset"
    );
  }

  if (matchedSources.removed.length > 0) {
    console.warn(
      "INVALID DATASET, missing actual test entries compared to the expected dataset: ",
      matchedSources.removed.map((entry) => entry.id)
    );

    throw new Error(
      "invalid dataset, missing actual test entries compared to the expected dataset"
    );
  }
}
