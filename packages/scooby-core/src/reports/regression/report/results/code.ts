import {
  RegressionReportResults,
  LocalResource,
  CodeRegressionTestEntry,
  CodeRegressionTestPair,
} from "@animaapp/scooby-shared";
import { CodeBatchComparisonEntry } from "../../../../comparison";
import { MatchedSources } from "../../../../matching";
import { CodeSourceEntry } from "../../../../types";
import { convertPathToLocalResource } from "../../../../utils/resource";
import { RegressionCheckResult } from "../../changes";

export function generateCodeResults(
  regressions: RegressionCheckResult<CodeBatchComparisonEntry>,
  matchedSources: MatchedSources<CodeSourceEntry>
): RegressionReportResults<LocalResource> {
  return {
    type: "code",
    new: matchedSources.new.map(convertCodeSourceEntryToReportEntry),
    removed: matchedSources.removed.map(convertCodeSourceEntryToReportEntry),
    changed: regressions.changed.map(convertCodeRegressionEntryToReportEntry),
    unchanged: regressions.unchanged.map(
      convertCodeRegressionEntryToReportEntry
    ),
  };
}

function convertCodeSourceEntryToReportEntry(
  entry: CodeSourceEntry
): CodeRegressionTestEntry<LocalResource> {
  return {
    type: "code",
    id: entry.id,
    groupId: entry.groupId,
    code: convertPathToLocalResource(entry.path),
    tags: entry.tags,
    path: entry.relativePath,
  };
}

function convertCodeRegressionEntryToReportEntry(
  entry: CodeBatchComparisonEntry
): CodeRegressionTestPair<LocalResource> {
  return {
    type: "code",
    actual: convertCodeSourceEntryToReportEntry(entry.actual),
    expected: convertCodeSourceEntryToReportEntry(entry.expected),
    comparison: {
      type: "code",
      similarity: entry.comparison.similarity,
      ...(entry.comparison.differenceFilePath && {
        diff: convertPathToLocalResource(entry.comparison.differenceFilePath),
      }),
    },
  };
}

export function convertCodeSourceToMainBranchReportEntry(
  entry: CodeSourceEntry
): CodeRegressionTestPair<LocalResource> {
  return {
    type: "code",
    actual: convertCodeSourceEntryToReportEntry(entry),
    expected: convertCodeSourceEntryToReportEntry(entry),
    comparison: {
      type: "code",
      similarity: 1,
    },
  };
}
