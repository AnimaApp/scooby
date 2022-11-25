import { LocalRegressionReport } from "@animaapp/scooby-shared";
import { MatchedSources } from "../../../matching/types";
import { SourceEntry } from "../../../types";
import { RegressionCheckResult } from "../../shared/regression";
import { generateItems } from "./items";
import { generateMainBranchResults, generateResults } from "./results";
import { generateSummary } from "./summary";

export async function generateReport(context: {
  name: string;
  commitHash: string;
  baseCommitHash: string;
  regressions: RegressionCheckResult;
  matchedSources: MatchedSources<SourceEntry>;
}): Promise<LocalRegressionReport> {
  const results = generateResults({
    regressions: context.regressions,
    matchedSources: context.matchedSources,
  });

  return {
    type: "regression",
    name: context.name,
    commitHash: context.commitHash,
    baseCommitHash: context.baseCommitHash,
    createdAt: new Date().getTime(),
    results,
    summary: generateSummary(results),
    items: await generateItems(results),
  };
}

export async function generateMainBranchReport(context: {
  name: string;
  commitHash: string;
  entries: SourceEntry[];
}): Promise<LocalRegressionReport> {
  const results = generateMainBranchResults(context.entries);

  return {
    type: "regression",
    name: context.name,
    commitHash: context.commitHash,
    baseCommitHash: context.commitHash,
    createdAt: new Date().getTime(),
    results,
    items: await generateItems(results),
    summary: {
      result: "success",
      stats: [],
    },
  };
}
