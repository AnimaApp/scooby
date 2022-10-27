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
  BatchComparisonResult,
  CodeBatchComparisonEntry,
  ImageBatchComparisonEntry,
} from "../../comparison";
import { CodeSourceEntry, ImageSourceEntry } from "../../types";
import { calculateFileMD5 } from "../../utils/hash";
import { convertPathToLocalResource } from "../../utils/resource";

export async function generateReport(context: {
  name: string;
  commitHash: string;
  comparisonResult: BatchComparisonResult;
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
  comparisons: BatchComparisonEntry[]
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
  comparisons: BatchComparisonEntry[]
): LocalFidelityTestPair[] {
  return comparisons.map(convertComparisonEntryToReportEntry);
}

function convertComparisonEntryToReportEntry(
  entry: BatchComparisonEntry
): LocalFidelityTestPair {
  if (entry.type === "code") {
    return convertCodeComparisonEntryToReportEntry(entry);
  } else if (entry.type === "image") {
    return convertImageComparisonEntryToReportEntry(entry);
  }

  throw new Error(
    "unable to generate pair for report, as there is no handler registered for type: " +
      // @ts-ignore
      entry.type
  );
}

function convertImageComparisonEntryToReportEntry(
  entry: ImageBatchComparisonEntry
): LocalFidelityTestPair {
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

function convertCodeComparisonEntryToReportEntry(
  entry: CodeBatchComparisonEntry
): LocalFidelityTestPair {
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
    hash: await calculateHash(entry),
  };
}

async function calculateHash(entry: LocalFidelityTestEntry): Promise<string> {
  if (entry.type === "image") {
    return calculateFileMD5(entry.image.path);
  } else if (entry.type === "code") {
    return calculateFileMD5(entry.code.path);
  }

  throw new Error(
    "unable to calculate entry hash, no handler registered for type: " +
      // @ts-ignore
      entry.type
  );
}
