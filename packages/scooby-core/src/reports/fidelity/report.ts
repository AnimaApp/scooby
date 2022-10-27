import {
  CodeFidelityTestEntry,
  ImageFidelityTestEntry,
  LocalFidelityReport,
  LocalFidelityTestEntry,
  LocalFidelityTestPair,
  LocalResource,
  ReportItem,
  ReportItemStatus,
  Summary,
  SummaryStatistic,
} from "@animaapp/scooby-shared";
import {
  BatchComparisonEntry,
  CodeBatchComparisonEntry,
  ImageBatchComparisonEntry,
} from "../../comparison";
import { CodeSourceEntry, ImageSourceEntry } from "../../types";
import { calculateFileMD5 } from "../../utils/hash";
import { convertPathToLocalResource } from "../../utils/resource";
import { FidelityEntriesOutcome } from "./threshold";

export async function generateReport(context: {
  name: string;
  commitHash: string;
  outcome: FidelityEntriesOutcome;
}): Promise<LocalFidelityReport> {
  const overallFidelityScore = calculateOverallFidelityScore(context.outcome);
  const pairs = generatePairs(context.outcome);

  return {
    type: "fidelity",
    name: context.name,
    commitHash: context.commitHash,
    createdAt: new Date().getTime(),
    overallFidelityScore,
    pairs,
    items: await generateItems(pairs),
    summary: generateSummary({
      overallFidelityScore,
      pairs,
    }),
  };
}

function calculateOverallFidelityScore(
  outcome: FidelityEntriesOutcome
): number {
  const comparisons = [...outcome.failure, ...outcome.success];

  if (comparisons.length === 0) {
    return 0;
  }

  const scores = comparisons.reduce(
    (total, entry) => (total += entry.comparison.similarity),
    0
  );
  return scores / comparisons.length;
}

function generatePairs(
  outcome: FidelityEntriesOutcome
): LocalFidelityTestPair[] {
  return [
    ...outcome.success.map((entry) =>
      convertComparisonEntryToReportEntry(entry, "success")
    ),
    ...outcome.failure.map((entry) =>
      convertComparisonEntryToReportEntry(entry, "failure")
    ),
  ];
}

function convertComparisonEntryToReportEntry(
  entry: BatchComparisonEntry,
  outcome: LocalFidelityTestPair["outcome"]
): LocalFidelityTestPair {
  switch (entry.type) {
    case "code":
      return convertCodeComparisonEntryToReportEntry(entry, outcome);
    case "image":
      return convertImageComparisonEntryToReportEntry(entry, outcome);
  }
}

function convertImageComparisonEntryToReportEntry(
  entry: ImageBatchComparisonEntry,
  outcome: LocalFidelityTestPair["outcome"]
): LocalFidelityTestPair {
  return {
    type: "image",
    outcome,
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

function convertCodeComparisonEntryToReportEntry(
  entry: CodeBatchComparisonEntry,
  outcome: LocalFidelityTestPair["outcome"]
): LocalFidelityTestPair {
  return {
    type: "code",
    outcome,
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

function convertImageSourceEntryToReportEntry(
  entry: ImageSourceEntry
): ImageFidelityTestEntry<LocalResource> {
  return {
    type: "image",
    id: entry.id,
    groupId: entry.groupId,
    image: convertPathToLocalResource(entry.path),
    tags: entry.tags,
    path: entry.relativePath,
  };
}

function convertCodeSourceEntryToReportEntry(
  entry: CodeSourceEntry
): CodeFidelityTestEntry<LocalResource> {
  return {
    type: "code",
    id: entry.id,
    groupId: entry.groupId,
    code: convertPathToLocalResource(entry.path),
    tags: entry.tags,
    path: entry.relativePath,
  };
}

function generateSummary(context: {
  overallFidelityScore: number;
  pairs: LocalFidelityTestPair[];
}): Summary {
  const isSuccessful = context.pairs.every(
    (pair) => pair.outcome === "success"
  );

  return {
    result: isSuccessful ? "success" : "failure",
    stats: generateSummaryStats(context),
  };
}

function generateSummaryStats({
  overallFidelityScore,
  pairs,
}: {
  overallFidelityScore: number;
  pairs: LocalFidelityTestPair[];
}): SummaryStatistic[] {
  const stats: SummaryStatistic[] = [];

  stats.push({
    type: "gauge",
    name: "Overall Fidelity",
    value: overallFidelityScore,
    description: "The average fidelity score among test entries.",
    sentiment: "info",
  });

  stats.push({
    type: "fraction",
    name: "Successful",
    numerator: pairs.filter((pair) => pair.outcome === "success").length,
    denominator: pairs.length,
    description:
      "The total number of test entries that have a fidelity higher than the threshold",
    sentiment: "success",
  });

  stats.push({
    type: "fraction",
    name: "Failed",
    numerator: pairs.filter((pair) => pair.outcome === "failure").length,
    denominator: pairs.length,
    description:
      "The total number of test entries that have a fidelity lower than the threshold",
    sentiment:
      pairs.filter((pair) => pair.outcome === "failure").length > 0
        ? "danger"
        : "success",
  });

  stats.push({
    type: "gauge",
    name: "Test Counts",
    value: pairs.length,
    description: "The total number of test entries",
    sentiment: "info",
  });

  return stats;
}

async function generateItems(
  pairs: LocalFidelityTestPair[]
): Promise<ReportItem[]> {
  const items: ReportItem[] = [];

  for (const pair of pairs) {
    items.push(await generateReportItem(pair.actual, "success"));
  }

  return items;
}

async function generateReportItem(
  entry: LocalFidelityTestEntry,
  status: ReportItemStatus
): Promise<ReportItem> {
  return {
    id: entry.id,
    status,
    hash: await calculateHash(entry),
  };
}

async function calculateHash(entry: LocalFidelityTestEntry): Promise<string> {
  switch (entry.type) {
    case "code":
      return calculateFileMD5(entry.code.path);
    case "image":
      return calculateFileMD5(entry.image.path);
  }
}
