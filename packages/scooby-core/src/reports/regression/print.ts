import { MatchedSources } from "../../matching";
import { ImageSourceEntry } from "../../types";
import { RegressionCheckResult } from "./changes";

export function printRegressionResults(
  comparison: RegressionCheckResult,
  matchedSources: MatchedSources<ImageSourceEntry>
) {
  console.log("################## REGRESSION TEST RESULTS ##################");

  if (
    comparison.changed.length > 0 ||
    matchedSources.new.length ||
    matchedSources.removed.length
  ) {
    printRegressionResultsWithChanges(comparison, matchedSources);
  } else {
    console.log("Yey, no changes detected!");
  }
}

export function printRegressionResultsWithChanges(
  comparison: RegressionCheckResult,
  matchedSources: MatchedSources<ImageSourceEntry>
) {
  console.log("Some changes have been detected:");

  if (comparison.changed.length) {
    console.log("CHANGES:");
    console.table(
      comparison.changed.map((change) => ({
        name: change.actual.id,
        similarity: change.comparison.similarity.toFixed(10),
      }))
    );
  }

  if (matchedSources.new.length) {
    console.log("NEW TESTS:");
    console.table(
      matchedSources.new.map((source) => ({
        name: source.id,
      }))
    );
  }

  if (matchedSources.removed.length) {
    console.log("REMOVED TESTS:");
    console.table(
      matchedSources.removed.map((source) => ({
        name: source.id,
      }))
    );
  }

  console.log(
    `SUMMARY: ${comparison.changed.length} changes, ${matchedSources.new.length} new tests, ${matchedSources.removed.length} removed tests and ${comparison.unchanged.length} unchanged tests`
  );
}
