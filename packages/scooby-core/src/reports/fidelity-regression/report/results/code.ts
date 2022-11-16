import {
  FidelityRegressionReportResults,
  LocalResource,
  CodeFidelityRegressionTestEntry,
  CodeFidelityRegressionTestPair,
  CodeFidelityRegressionTestTriple,
} from "@animaapp/scooby-shared";
import { CodeBatchComparisonEntry } from "../../../../comparison";
import { MatchedSources } from "../../../../matching";
import { CodeSourceEntry } from "../../../../types";
import { convertPathToLocalResource } from "../../../../utils/resource";
import { RegressionCheckResult } from "../../../shared/regression";
import { getFidelityEntry } from "./util";

export function generateCodeResults(
  regressions: RegressionCheckResult<CodeBatchComparisonEntry>,
  matchedRegressionSources: MatchedSources<CodeSourceEntry>,
  fidelityComparisons: Record<string, CodeBatchComparisonEntry>
): FidelityRegressionReportResults<LocalResource> {
  return {
    type: "code",
    new: matchedRegressionSources.new.map((regressionEntry) =>
      convertCodeRegressionEntryToReportPair(
        getFidelityEntry(fidelityComparisons, regressionEntry.id)
      )
    ),
    removed: matchedRegressionSources.removed.map(
      convertCodeSourceEntryToReportEntry
    ),
    changed: regressions.changed.map((regressionEntry) =>
      convertCodeRegressionEntryToReportTriple(
        getFidelityEntry(fidelityComparisons, regressionEntry.actual.id),
        regressionEntry
      )
    ),
    unchanged: regressions.unchanged.map((regressionEntry) =>
      convertCodeRegressionEntryToReportTriple(
        getFidelityEntry(fidelityComparisons, regressionEntry.actual.id),
        regressionEntry
      )
    ),
  };
}

function convertCodeSourceEntryToReportEntry(
  entry: CodeSourceEntry
): CodeFidelityRegressionTestEntry<LocalResource> {
  return {
    type: "code",
    id: entry.id,
    groupId: entry.groupId,
    code: convertPathToLocalResource(entry.path),
    tags: entry.tags,
    path: entry.relativePath,
    metadata: entry.metadata,
  };
}

function convertCodeRegressionEntryToReportPair(
  fidelityEntry: CodeBatchComparisonEntry
): CodeFidelityRegressionTestPair<LocalResource> {
  return {
    type: "code",
    actual: convertCodeSourceEntryToReportEntry(fidelityEntry.actual),
    expected: convertCodeSourceEntryToReportEntry(fidelityEntry.expected),
    fidelityComparison: {
      type: "code",
      similarity: fidelityEntry.comparison.similarity,
      ...(fidelityEntry.comparison.differenceFilePath && {
        diff: convertPathToLocalResource(
          fidelityEntry.comparison.differenceFilePath
        ),
      }),
    },
  };
}

function convertCodeRegressionEntryToReportTriple(
  fidelityEntry: CodeBatchComparisonEntry,
  regressionEntry: CodeBatchComparisonEntry
): CodeFidelityRegressionTestTriple<LocalResource> {
  return {
    type: "code",
    actual: convertCodeSourceEntryToReportEntry(fidelityEntry.actual),
    expected: convertCodeSourceEntryToReportEntry(fidelityEntry.expected),
    reference: convertCodeSourceEntryToReportEntry(regressionEntry.expected),
    fidelityComparison: {
      type: "code",
      similarity: fidelityEntry.comparison.similarity,
      ...(fidelityEntry.comparison.differenceFilePath && {
        diff: convertPathToLocalResource(
          fidelityEntry.comparison.differenceFilePath
        ),
      }),
    },
    regressionComparison: {
      type: "code",
      similarity: regressionEntry.comparison.similarity,
      ...(regressionEntry.comparison.differenceFilePath && {
        diff: convertPathToLocalResource(
          regressionEntry.comparison.differenceFilePath
        ),
      }),
    },
  };
}

export function convertCodeComparisonToMainBranchReportTriple(
  fidelityComparison: CodeBatchComparisonEntry
): CodeFidelityRegressionTestTriple<LocalResource> {
  return {
    type: "code",
    actual: convertCodeSourceEntryToReportEntry(fidelityComparison.actual),
    expected: convertCodeSourceEntryToReportEntry(fidelityComparison.expected),
    reference: convertCodeSourceEntryToReportEntry(fidelityComparison.actual),
    fidelityComparison: {
      type: "code",
      similarity: fidelityComparison.comparison.similarity,
    },
    regressionComparison: {
      type: "code",
      similarity: 1,
    },
  };
}
