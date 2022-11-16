import { LocalFidelityRegressionReport } from "@animaapp/scooby-shared";

export function printFidelityRegressionReport(
  report: LocalFidelityRegressionReport
) {
  console.log(
    "################## FIDELITY REGRESSION TEST RESULTS ##################"
  );
  console.log("OVERALL FIDELITY:", report.overallFidelityScore);

  if (
    report.results.changed.length > 0 ||
    report.results.new.length ||
    report.results.removed.length
  ) {
    printFidelityRegressionReportWithChanges(report);
  } else {
    console.log("Yey, no changes detected!");
  }
}

export function printFidelityRegressionReportWithChanges(
  report: LocalFidelityRegressionReport
) {
  console.log("Some changes have been detected:");

  if (report.results.changed.length) {
    console.log("CHANGES:");
    console.table(
      report.results.changed.map((change) => ({
        name: change.actual.id,
        "regression ratio": (
          1 - change.regressionComparison.similarity
        ).toFixed(10),
        fidelity: change.fidelityComparison.similarity.toFixed(10),
      }))
    );
  }

  if (report.results.new.length) {
    console.log("NEW TESTS:");
    console.table(
      report.results.new.map((pair) => ({
        name: pair.actual.id,
        fidelity: pair.fidelityComparison.similarity.toFixed(10),
      }))
    );
  }

  if (report.results.removed.length) {
    console.log("REMOVED TESTS:");
    console.table(
      report.results.removed.map((pair) => ({
        name: pair.actual.id,
        fidelity: pair.fidelityComparison.similarity.toFixed(10),
      }))
    );
  }

  if (report.results.unchanged.length) {
    console.log("UNCHANGED:");
    console.table(
      report.results.unchanged.map((change) => ({
        name: change.actual.id,
        fidelity: change.fidelityComparison.similarity.toFixed(10),
      }))
    );
  }

  console.log(
    `SUMMARY: ${report.results.changed.length} changes, ${report.results.new.length} new tests, ${report.results.removed.length} removed tests and ${report.results.unchanged.length} unchanged tests`
  );
}
