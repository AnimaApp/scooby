import {
  RegressionReportResults,
  LocalResource,
  ImageRegressionTestEntry,
  ImageRegressionTestPair,
} from "@animaapp/scooby-shared";
import { ImageBatchComparisonEntry } from "../../../../comparison/types";
import { MatchedSources } from "../../../../matching/types";
import { ImageSourceEntry } from "../../../../types";
import { convertPathToLocalResource } from "../../../../utils/resource";
import { RegressionCheckResult } from "../../../shared/regression";

export function generateImageResults(
  regressions: RegressionCheckResult<ImageBatchComparisonEntry>,
  matchedSources: MatchedSources<ImageSourceEntry>
): RegressionReportResults<LocalResource> {
  return {
    type: "image",
    new: matchedSources.new.map(convertImageSourceEntryToReportEntry),
    removed: matchedSources.removed.map(convertImageSourceEntryToReportEntry),
    changed: regressions.changed.map(convertImageRegressionEntryToReportEntry),
    unchanged: regressions.unchanged.map(
      convertImageRegressionEntryToReportEntry
    ),
  };
}

export function convertImageSourceToMainBranchReportEntry(
  entry: ImageSourceEntry
): ImageRegressionTestPair<LocalResource> {
  return {
    type: "image",
    actual: convertImageSourceEntryToReportEntry(entry),
    expected: convertImageSourceEntryToReportEntry(entry),
    comparison: {
      type: "image",
      diff: convertPathToLocalResource(entry.path),
      overlap: convertPathToLocalResource(entry.path),
      normalizedActual: convertPathToLocalResource(entry.path),
      normalizedExpected: convertPathToLocalResource(entry.path),
      similarity: 1,
    },
  };
}

function convertImageSourceEntryToReportEntry(
  entry: ImageSourceEntry
): ImageRegressionTestEntry<LocalResource> {
  return {
    type: "image",
    id: entry.id,
    groupId: entry.groupId,
    image: convertPathToLocalResource(entry.path),
    tags: entry.tags,
    path: entry.relativePath,
    metadata: entry.metadata,
  };
}

function convertImageRegressionEntryToReportEntry(
  entry: ImageBatchComparisonEntry
): ImageRegressionTestPair<LocalResource> {
  return {
    type: "image",
    actual: convertImageSourceEntryToReportEntry(entry.actual),
    expected: convertImageSourceEntryToReportEntry(entry.expected),
    comparison: {
      type: "image",
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
