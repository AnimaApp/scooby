import {
  LocalRegressionReport,
  LocalRegressionTestEntry,
  LocalRegressionTestPair,
  LocalResource,
  RegressionReportResults,
  Summary,
  SummaryStatistic,
} from "@animaapp/scooby-shared";
import { BatchImageComparisonEntry } from "../../comparison";
import { MatchedSources } from "../../matching";
import { ImageSourceEntry } from "../../types";
import { convertPathToLocalResource } from "../../utils/resource";
import { RegressionCheckResult } from "./changes";

export function generateReport(context: {
  name: string;
  commitHash: string;
  baseCommitHash: string;
  regressions: RegressionCheckResult;
  matchedSources: MatchedSources<ImageSourceEntry>;
}): LocalRegressionReport {
  const results = {
    new: context.matchedSources.new.map(convertImageSourceEntryToReportEntry),
    removed: context.matchedSources.removed.map(
      convertImageSourceEntryToReportEntry
    ),
    changed: context.regressions.changed.map(
      convertRegressionEntryToReportEntry
    ),
    unchanged: context.regressions.unchanged.map(
      convertRegressionEntryToReportEntry
    ),
  } as const;

  return {
    type: "regression",
    name: context.name,
    commitHash: context.commitHash,
    baseCommitHash: context.baseCommitHash,
    createdAt: new Date().getTime(),
    results,
    summary: generateSummary(results),
  };
}

function convertImageSourceEntryToReportEntry(
  entry: ImageSourceEntry
): LocalRegressionTestEntry {
  return {
    id: entry.id,
    groupId: entry.groupId,
    image: convertPathToLocalResource(entry.path),
    tags: entry.tags,
  };
}

function convertRegressionEntryToReportEntry(
  entry: BatchImageComparisonEntry
): LocalRegressionTestPair {
  return {
    actual: convertImageSourceEntryToReportEntry(entry.actual),
    expected: convertImageSourceEntryToReportEntry(entry.expected),
    comparison: {
      diff: convertPathToLocalResource(entry.comparison.diffImagePath),
      overlap: convertPathToLocalResource(entry.comparison.overlapImagePath),
      normalizedActual: convertPathToLocalResource(
        entry.comparison.normalizedActualPath
      ),
      normalizedExpected: convertPathToLocalResource(
        entry.comparison.normalizedExpectedPath
      ),
      similarity: entry.comparison.similarity,
    },
  };
}

function generateSummary(
  results: RegressionReportResults<LocalResource>
): Summary {
  return {
    result: generateSummaryResult(results),
    stats: generateSummaryStats(results),
  };
}

function generateSummaryResult(
  results: RegressionReportResults<LocalResource>
) {
  return results.new.length > 0 ||
    results.removed.length > 0 ||
    results.changed.length > 0
    ? "failure"
    : "success";
}

function generateSummaryStats(
  results: RegressionReportResults<LocalResource>
): SummaryStatistic[] {
  const totalEntryCount = calculateTotalNumberOfEntries(results);
  const stats: SummaryStatistic[] = [];

  stats.push({
    type: "fraction",
    name: "Changed",
    numerator: results.changed.length,
    denominator: totalEntryCount,
    description:
      "The total number of test entries that have been changed since the last reference run",
    sentiment: results.changed.length > 0 ? "danger" : "success",
  });

  stats.push({
    type: "fraction",
    name: "New",
    numerator: results.new.length,
    denominator: totalEntryCount,
    description:
      "The total number of test entries that were introduced in this test run, and were not present in the reference",
    sentiment: results.new.length > 0 ? "warning" : "success",
  });

  stats.push({
    type: "fraction",
    name: "Removed",
    numerator: results.removed.length,
    denominator: totalEntryCount,
    description:
      "The total number of test entries that were removed in this test run, and were present in the reference",
    sentiment: results.removed.length > 0 ? "warning" : "success",
  });

  stats.push({
    type: "fraction",
    name: "Unchanged",
    numerator: results.unchanged.length,
    denominator: totalEntryCount,
    description:
      "The total number of test entries that have NOT been changed since the last reference run",
    sentiment: "success",
  });

  return stats;
}

function calculateTotalNumberOfEntries(
  results: RegressionReportResults<LocalResource>
): number {
  return (
    results.new.length +
    results.removed.length +
    results.changed.length +
    results.unchanged.length
  );
}