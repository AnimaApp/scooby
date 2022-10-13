import { getScoobyAPI } from "@animaapp/scooby-api";
import { batchImageComparison } from "../comparison";
import { getContext } from "../context";
import { loadTestEntries } from "../loading";
import { MatchedSources, matchSources } from "../matching";
import { generateImageSources } from "../source/image";
import { ImageSourceEntry } from "../types";
import { isRunningOnReferenceCommit } from "../utils/commit";
import { printFidelityReport } from "./print";
import { generateReport } from "./report";

export type FidelityTestRequest = {
  name: string;
  expectedPath: string;
  actualPath: string;
};

export async function runFidelityTest(
  request: FidelityTestRequest
): Promise<void> {
  // TODO: validate name format (alphanumeric and dash)
  const context = await getContext();
  console.log("Loaded context: ", context);

  console.log(
    "loading expected test entries from path: " + request.expectedPath
  );
  const expectedEntries = await loadTestEntries(request.expectedPath);
  console.log(`found ${expectedEntries.length} expected test entries`);

  console.log("loading actual test entries from path: " + request.actualPath);
  const actualEntries = await loadTestEntries(request.actualPath);
  console.log(`found ${expectedEntries.length} actual test entries`);

  console.log("initializing API...");
  const api = await getScoobyAPI({
    repositoryName: context.repositoryName,
  });

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

  const report = generateReport({
    name: request.name,
    commitHash: context.currentCommitHash,
    comparisonResult,
  });

  printFidelityReport(report);

  const runningOnReferenceCommit = isRunningOnReferenceCommit(
    context.currentCommitHash,
    context.baseCommitHash
  );
  if (!runningOnReferenceCommit) {
    console.log("uploading fidelity report...");
    await api.uploadFidelityReport(
      { commitHash: context.currentCommitHash },
      report
    );
  } else {
    console.warn(
      `this regression test is running on the same commit used as reference (${context.baseCommitHash}), therefore no report will be uploaded to the API to avoid conflicts.`
    );
  }
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
