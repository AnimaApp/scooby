import { LocalRegressionReport } from "@animaapp/scooby-shared";

export function printRegressionReport(report: LocalRegressionReport) {
  console.log("################## REGRESSION TEST RESULTS ##################");

  if (
    report.results.changed.length > 0 ||
    report.results.new.length ||
    report.results.removed.length
  ) {
    printRegressionReportWithChanges(report);
  } else {
    console.log("Yey, no changes detected!");
  }
}

export function printRegressionReportWithChanges(
  report: LocalRegressionReport
) {
  console.log("Some changes have been detected:");

  if (report.results.changed.length) {
    console.log("CHANGES:");
    console.table(
      report.results.changed.map((change) => ({
        name: change.actual.id,
        similarity: change.comparison.similarity.toFixed(10),
      }))
    );
  }

  if (report.results.new.length) {
    console.log("NEW TESTS:");
    console.table(
      report.results.new.map((source) => ({
        name: source.id,
      }))
    );
  }

  if (report.results.removed.length) {
    console.log("REMOVED TESTS:");
    console.table(
      report.results.removed.map((source) => ({
        name: source.id,
      }))
    );
  }

  console.log(
    `SUMMARY: ${report.results.changed.length} changes, ${report.results.new.length} new tests, ${report.results.removed.length} removed tests and ${report.results.unchanged.length} unchanged tests`
  );
}
