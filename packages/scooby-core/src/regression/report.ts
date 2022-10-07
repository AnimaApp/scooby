import {
  LocalRegressionReport,
  LocalRegressionTestEntry,
  LocalRegressionTestPair,
  LocalResource,
} from "../../../scooby-shared/src";
import { BatchImageComparisonEntry } from "../comparison";
import { MatchedSources } from "../matching";
import { ImageSourceEntry } from "../types";
import { RegressionCheckResult } from "./changes";

export function generateReport(context: {
  name: string;
  commitHash: string;
  regressions: RegressionCheckResult;
  matchedSources: MatchedSources<ImageSourceEntry>;
}): LocalRegressionReport {
  return {
    type: "regression",
    name: context.name,
    commitHash: context.name,
    createdAt: new Date().getTime(),
    results: {
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
    },
  };
}

function convertImageSourceEntryToReportEntry(
  entry: ImageSourceEntry
): LocalRegressionTestEntry {
  return {
    id: entry.id,
    groupId: entry.groupId,
    image: convertToLocalResource(entry.path),
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
      diff: convertToLocalResource(entry.comparison.diffImagePath),
      overlap: convertToLocalResource(entry.comparison.overlapImagePath),
      normalizedActual: convertToLocalResource(
        entry.comparison.normalizedActualPath
      ),
      normalizedExpected: convertToLocalResource(
        entry.comparison.normalizedExpectedPath
      ),
      similarity: entry.comparison.similarity,
    },
  };
}

function convertToLocalResource(path: string): LocalResource {
  return {
    type: "local",
    path,
  };
}
