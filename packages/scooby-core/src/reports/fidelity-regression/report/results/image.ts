import {
  FidelityRegressionReportResults,
  LocalResource,
  ImageFidelityRegressionTestEntry,
  ImageFidelityRegressionTestPair,
  ImageFidelityRegressionTestTriple,
} from "@animaapp/scooby-shared";
import { ImageBatchComparisonEntry } from "../../../../comparison/types";
import { MatchedSources } from "../../../../matching";
import { ImageSourceEntry } from "../../../../types";
import { convertPathToLocalResource } from "../../../../utils/resource";
import { RegressionCheckResult } from "../../../shared/regression";
import { getFidelityEntry } from "./util";

export function generateImageResults(
  regressions: RegressionCheckResult<ImageBatchComparisonEntry>,
  matchedRegressionSources: MatchedSources<ImageSourceEntry>,
  fidelityComparisons: Record<string, ImageBatchComparisonEntry>
): FidelityRegressionReportResults<LocalResource> {
  return {
    type: "image",
    new: matchedRegressionSources.new.map((regressionEntry) =>
      convertImageRegressionEntryToReportPair(
        getFidelityEntry(fidelityComparisons, regressionEntry.id)
      )
    ),
    removed: matchedRegressionSources.removed.map(
      convertImageSourceEntryToReportEntry
    ),
    changed: regressions.changed.map((regressionEntry) =>
      convertImageRegressionEntryToReportTriple(
        getFidelityEntry(fidelityComparisons, regressionEntry.actual.id),
        regressionEntry
      )
    ),
    unchanged: regressions.unchanged.map((regressionEntry) =>
      convertImageRegressionEntryToReportTriple(
        getFidelityEntry(fidelityComparisons, regressionEntry.actual.id),
        regressionEntry
      )
    ),
  };
}

export function convertImageEntryToMainBranchReportTriple(
  fidelityEntry: ImageBatchComparisonEntry
): ImageFidelityRegressionTestTriple<LocalResource> {
  return {
    type: "image",
    actual: convertImageSourceEntryToReportEntry(fidelityEntry.actual),
    expected: convertImageSourceEntryToReportEntry(fidelityEntry.expected),
    reference: convertImageSourceEntryToReportEntry(fidelityEntry.actual),
    fidelityComparison: {
      type: "image",
      diff: convertPathToLocalResource(fidelityEntry.comparison.diffImagePath),
      overlap: convertPathToLocalResource(
        fidelityEntry.comparison.overlapImagePath
      ),
      normalizedActual: convertPathToLocalResource(
        fidelityEntry.comparison.normalizedActualPath
      ),
      normalizedExpected: convertPathToLocalResource(
        fidelityEntry.comparison.normalizedExpectedPath
      ),
      similarity: fidelityEntry.comparison.similarity,
    },
    regressionComparison: {
      type: "image",
      diff: convertPathToLocalResource(fidelityEntry.actual.path),
      overlap: convertPathToLocalResource(fidelityEntry.actual.path),
      normalizedActual: convertPathToLocalResource(fidelityEntry.actual.path),
      normalizedExpected: convertPathToLocalResource(fidelityEntry.actual.path),
      similarity: 1,
    },
  };
}

function convertImageSourceEntryToReportEntry(
  entry: ImageSourceEntry
): ImageFidelityRegressionTestEntry<LocalResource> {
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

function convertImageRegressionEntryToReportPair(
  fidelityEntry: ImageBatchComparisonEntry
): ImageFidelityRegressionTestPair<LocalResource> {
  return {
    type: "image",
    actual: convertImageSourceEntryToReportEntry(fidelityEntry.actual),
    expected: convertImageSourceEntryToReportEntry(fidelityEntry.expected),
    fidelityComparison: {
      type: "image",
      diff: convertPathToLocalResource(fidelityEntry.comparison.diffImagePath),
      overlap: convertPathToLocalResource(
        fidelityEntry.comparison.overlapImagePath
      ),
      normalizedActual: convertPathToLocalResource(
        fidelityEntry.comparison.normalizedActualPath
      ),
      normalizedExpected: convertPathToLocalResource(
        fidelityEntry.comparison.normalizedExpectedPath
      ),
      similarity: fidelityEntry.comparison.similarity,
    },
  };
}

function convertImageRegressionEntryToReportTriple(
  fidelityEntry: ImageBatchComparisonEntry,
  regressionEntry: ImageBatchComparisonEntry
): ImageFidelityRegressionTestTriple<LocalResource> {
  return {
    type: "image",
    actual: convertImageSourceEntryToReportEntry(fidelityEntry.actual),
    expected: convertImageSourceEntryToReportEntry(fidelityEntry.expected),
    reference: convertImageSourceEntryToReportEntry(regressionEntry.expected),
    fidelityComparison: {
      type: "image",
      diff: convertPathToLocalResource(fidelityEntry.comparison.diffImagePath),
      overlap: convertPathToLocalResource(
        fidelityEntry.comparison.overlapImagePath
      ),
      normalizedActual: convertPathToLocalResource(
        fidelityEntry.comparison.normalizedActualPath
      ),
      normalizedExpected: convertPathToLocalResource(
        fidelityEntry.comparison.normalizedExpectedPath
      ),
      similarity: fidelityEntry.comparison.similarity,
    },
    regressionComparison: {
      type: "image",
      diff: convertPathToLocalResource(
        regressionEntry.comparison.diffImagePath
      ),
      overlap: convertPathToLocalResource(
        regressionEntry.comparison.overlapImagePath
      ),
      normalizedActual: convertPathToLocalResource(
        regressionEntry.comparison.normalizedActualPath
      ),
      normalizedExpected: convertPathToLocalResource(
        regressionEntry.comparison.normalizedExpectedPath
      ),
      similarity: regressionEntry.comparison.similarity,
    },
  };
}
