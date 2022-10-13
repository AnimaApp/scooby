import { LocalFidelityReport } from "@animaapp/scooby-shared";

export function printFidelityReport(report: LocalFidelityReport) {
  console.log("################## FIDELITY TEST RESULTS ##################");

  console.log("OVERALL FIDELITY: " + report.overallFidelityScore);

  const sortedPairs = [...report.pairs].sort(
    (a, b) => a.comparison.similarity - b.comparison.similarity
  );

  console.log("Results (sorted by worse fidelity on top):");
  console.table(
    sortedPairs.map((pair) => ({
      id: pair.actual.id,
      fidelity: pair.comparison.similarity,
    }))
  );
}
