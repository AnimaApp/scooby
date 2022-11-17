import { LocalFidelityRegressionReport } from "@animaapp/scooby-shared";
import { BatchComparisonEntry } from "../../../comparison";
import { MatchedSources } from "../../../matching";
import { SourceEntry } from "../../../types";
import { RegressionCheckResult } from "../../shared/regression";
import { generateItems } from "./items";
import { generateMainBranchResults, generateResults } from "./results";
import { generateMainBranchSummary, generateSummary } from "./summary";

export async function generateReport(context: {
  name: string;
  commitHash: string;
  baseCommitHash: string;
  regressions: RegressionCheckResult;
  matchedRegressionSources: MatchedSources<SourceEntry>;
  fidelityComparisons: BatchComparisonEntry[];
}): Promise<LocalFidelityRegressionReport> {
  const results = generateResults({
    regressions: context.regressions,
    matchedRegressionSources: context.matchedRegressionSources,
    fidelityComparisons: context.fidelityComparisons,
  });

  const overallFidelityScore = calculateOverallFidelityScore(
    context.fidelityComparisons
  );

  return {
    type: "fidelity-regression",
    name: context.name,
    commitHash: context.commitHash,
    baseCommitHash: context.baseCommitHash,
    createdAt: new Date().getTime(),
    overallFidelityScore,
    results,
    summary: generateSummary(results, overallFidelityScore),
    items: await generateItems(results),
  };
}

export async function generateMainBranchReport(context: {
  name: string;
  commitHash: string;
  fidelityComparisons: BatchComparisonEntry[];
}): Promise<LocalFidelityRegressionReport> {
  const results = generateMainBranchResults(context.fidelityComparisons);

  const overallFidelityScore = calculateOverallFidelityScore(
    context.fidelityComparisons
  );

  return {
    type: "fidelity-regression",
    name: context.name,
    commitHash: context.commitHash,
    baseCommitHash: context.commitHash,
    createdAt: new Date().getTime(),
    overallFidelityScore,
    results,
    items: await generateItems(results),
    summary: generateMainBranchSummary(overallFidelityScore),
  };
}

function calculateOverallFidelityScore(
  comparisons: BatchComparisonEntry[]
): number {
  if (comparisons.length === 0) {
    return 0;
  }

  let total = 0;
  for (const comparison of comparisons) {
    total += comparison.comparison.similarity;
  }

  return total / comparisons.length;
}
