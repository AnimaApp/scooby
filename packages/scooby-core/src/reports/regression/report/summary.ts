import {
  LocalResource,
  RegressionReportResults,
  Summary,
  SummaryStatistic,
} from "@animaapp/scooby-shared";

export function generateSummary(
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
