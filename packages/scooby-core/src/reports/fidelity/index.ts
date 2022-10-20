import { LocalFidelityReport } from "@animaapp/scooby-shared";
import { batchImageComparison } from "../../comparison";
import { loadTestEntries } from "../../loading";
import { MatchedSources, matchSources } from "../../matching";
import { generateImageSources } from "../../source/image";
import { BaseReportParams, ImageSourceEntry, ReportContext } from "../../types";
import { generateReport } from "./report";

export type FidelityTestParams = BaseReportParams & {
  expectedPath: string;
  actualPath: string;
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

  console.log("generating expected test sources...");
  const expectedSources = await generateImageSources(expectedEntries, {});
  console.log(`generated ${expectedSources.length} expected test sources`);

  console.log("generating actual test sources...");
  const actualSources = await generateImageSources(actualEntries, {});
  console.log(`generated ${actualSources.length} actual test sources`);

  console.log("matching datasets...");
  const matchedSources = matchSources(expectedSources, actualSources);

  validateMatchedSources(matchedSources);

  console.log(`found ${matchedSources.matching.length} matched tests`);

  console.log("comparing tests...");
  const comparisonResult = await batchImageComparison(matchedSources.matching);

  console.log("generating report...");
  const report = await generateReport({
    name: params.name,
    commitHash: context.environment.currentCommitHash,
    comparisonResult,
  });

  return report;
}

function validateMatchedSources(
  matchedSources: MatchedSources<ImageSourceEntry>
) {
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
