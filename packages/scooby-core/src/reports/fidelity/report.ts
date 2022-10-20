import {
  LocalFidelityReport,
  LocalFidelityTestEntry,
  LocalFidelityTestPair,
  ReportItem,
  ReportItemStatus,
  Summary,
  SummaryStatistic,
} from "@animaapp/scooby-shared";
import {
  BatchImageComparisonEntry,
  BatchImageComparisonResult,
} from "../../comparison";
import { ImageSourceEntry } from "../../types";
import { calculateFileMD5 } from "../../utils/hash";
import { convertPathToLocalResource } from "../../utils/resource";

export async function generateReport(context: {
  name: string;
  commitHash: string;
  comparisonResult: BatchImageComparisonResult;
}): Promise<LocalFidelityReport> {
  const overallFidelityScore = calculateOverallFidelityScore(
    context.comparisonResult.comparisons
  );
  const pairs = generatePairs(context.comparisonResult.comparisons);

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
  comparisons: BatchImageComparisonEntry[]
): number {
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
  comparisons: BatchImageComparisonEntry[]
): LocalFidelityTestPair[] {
  return comparisons.map(convertComparisonEntryToReportEntry);
}

function convertImageSourceEntryToReportEntry(
  entry: ImageSourceEntry
): LocalFidelityTestEntry {
  return {
    id: entry.id,
    groupId: entry.groupId,
    image: convertPathToLocalResource(entry.path),
    tags: entry.tags,
  };
}

function convertComparisonEntryToReportEntry(
  entry: BatchImageComparisonEntry
): LocalFidelityTestPair {
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

function generateSummary(context: {
  overallFidelityScore: number;
  pairs: LocalFidelityTestPair[];
}): Summary {
  return {
    result: "success", // Fidelity reports cannot fail directly
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
    hash: await calculateFileMD5(entry.image.path),
  };
}