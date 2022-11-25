import {
  LocalResource,
  FidelityRegressionReportResults,
} from "@animaapp/scooby-shared";
import {
  BatchComparisonEntry,
  CodeBatchComparisonEntry,
  ImageBatchComparisonEntry,
} from "../../../../comparison/types";
import { MatchedSources } from "../../../../matching";
import {
  SourceEntry,
  ImageSourceEntry,
  CodeSourceEntry,
} from "../../../../types";
import { RegressionCheckResult } from "../../../shared/regression";
import {
  convertCodeComparisonToMainBranchReportTriple,
  generateCodeResults,
} from "./code";
import {
  convertImageEntryToMainBranchReportTriple,
  generateImageResults,
} from "./image";

type GenerateResultContext = {
  regressions: RegressionCheckResult;
  matchedRegressionSources: MatchedSources<SourceEntry>;
  fidelityComparisons: BatchComparisonEntry[];
};

export function generateResults(
  context: GenerateResultContext
): FidelityRegressionReportResults<LocalResource> {
  if (hasImageEntries(context)) {
    return generateImageResults(
      context.regressions,
      context.matchedRegressionSources,
      generateComparisonsMap(context.fidelityComparisons)
    );
  } else if (hasCodeEntries(context)) {
    return generateCodeResults(
      context.regressions,
      context.matchedRegressionSources,
      generateComparisonsMap(context.fidelityComparisons)
    );
  }

  throw new Error(
    "unable to generate report results, entries types do not have a registered handler"
  );
}

function hasImageEntries(context: GenerateResultContext): context is {
  regressions: RegressionCheckResult<ImageBatchComparisonEntry>;
  matchedRegressionSources: MatchedSources<ImageSourceEntry>;
  fidelityComparisons: ImageBatchComparisonEntry[];
} {
  return (
    context.regressions.changed?.[0]?.type === "image" ||
    context.regressions.unchanged?.[0]?.type === "image" ||
    context.matchedRegressionSources.new?.[0]?.type === "image" ||
    context.matchedRegressionSources.removed?.[0]?.type === "image"
  );
}

function hasCodeEntries(context: GenerateResultContext): context is {
  regressions: RegressionCheckResult<CodeBatchComparisonEntry>;
  matchedRegressionSources: MatchedSources<CodeSourceEntry>;
  fidelityComparisons: CodeBatchComparisonEntry[];
} {
  return (
    context.regressions.changed?.[0]?.type === "code" ||
    context.regressions.unchanged?.[0]?.type === "code" ||
    context.matchedRegressionSources.new?.[0]?.type === "code" ||
    context.matchedRegressionSources.removed?.[0]?.type === "code"
  );
}

export function generateMainBranchResults(
  fidelityEntries: BatchComparisonEntry[]
): FidelityRegressionReportResults<LocalResource> {
  if (hasImageSources(fidelityEntries)) {
    return {
      type: "image",
      new: [],
      removed: [],
      changed: [],
      unchanged: fidelityEntries.map(convertImageEntryToMainBranchReportTriple),
    };
  } else if (hasCodeSources(fidelityEntries)) {
    return {
      type: "code",
      new: [],
      removed: [],
      changed: [],
      unchanged: fidelityEntries.map(
        convertCodeComparisonToMainBranchReportTriple
      ),
    };
  }

  throw new Error(
    "unable to generate report results, entries types do not have a registered handler"
  );
}

function hasImageSources(
  sources: BatchComparisonEntry[]
): sources is ImageBatchComparisonEntry[] {
  return sources.every((source) => source.type === "image");
}

function hasCodeSources(
  sources: BatchComparisonEntry[]
): sources is CodeBatchComparisonEntry[] {
  return sources.every((source) => source.type === "code");
}

function generateComparisonsMap<T extends BatchComparisonEntry>(
  comparisons: T[]
): Record<string, T> {
  const map: Record<string, T> = {};

  for (const comparison of comparisons) {
    map[comparison.actual.id] = comparison;
  }

  return map;
}
