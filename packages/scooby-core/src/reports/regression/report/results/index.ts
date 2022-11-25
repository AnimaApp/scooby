import {
  RegressionReportResults,
  LocalResource,
} from "@animaapp/scooby-shared";
import {
  CodeBatchComparisonEntry,
  ImageBatchComparisonEntry,
} from "../../../../comparison/types";
import { MatchedSources } from "../../../../matching/types";
import {
  SourceEntry,
  ImageSourceEntry,
  CodeSourceEntry,
} from "../../../../types";
import { RegressionCheckResult } from "../../../shared/regression";
import {
  convertCodeSourceToMainBranchReportEntry,
  generateCodeResults,
} from "./code";
import {
  convertImageSourceToMainBranchReportEntry,
  generateImageResults,
} from "./image";

type GenerateResultContext = {
  regressions: RegressionCheckResult;
  matchedSources: MatchedSources<SourceEntry>;
};

export function generateResults(
  context: GenerateResultContext
): RegressionReportResults<LocalResource> {
  if (hasImageEntries(context)) {
    return generateImageResults(context.regressions, context.matchedSources);
  } else if (hasCodeEntries(context)) {
    return generateCodeResults(context.regressions, context.matchedSources);
  }

  throw new Error(
    "unable to generate report results, entries types do not have a registered handler"
  );
}

function hasImageEntries(context: GenerateResultContext): context is {
  regressions: RegressionCheckResult<ImageBatchComparisonEntry>;
  matchedSources: MatchedSources<ImageSourceEntry>;
} {
  return (
    context.regressions.changed?.[0]?.type === "image" ||
    context.regressions.unchanged?.[0]?.type === "image" ||
    context.matchedSources.new?.[0]?.type === "image" ||
    context.matchedSources.removed?.[0]?.type === "image"
  );
}

function hasCodeEntries(context: GenerateResultContext): context is {
  regressions: RegressionCheckResult<CodeBatchComparisonEntry>;
  matchedSources: MatchedSources<CodeSourceEntry>;
} {
  return (
    context.regressions.changed?.[0]?.type === "code" ||
    context.regressions.unchanged?.[0]?.type === "code" ||
    context.matchedSources.new?.[0]?.type === "code" ||
    context.matchedSources.removed?.[0]?.type === "code"
  );
}

export function generateMainBranchResults(
  sources: SourceEntry[]
): RegressionReportResults<LocalResource> {
  if (hasImageSources(sources)) {
    return {
      type: "image",
      new: [],
      removed: [],
      changed: [],
      unchanged: sources.map(convertImageSourceToMainBranchReportEntry),
    };
  } else if (hasCodeSources(sources)) {
    return {
      type: "code",
      new: [],
      removed: [],
      changed: [],
      unchanged: sources.map(convertCodeSourceToMainBranchReportEntry),
    };
  }

  throw new Error(
    "unable to generate report results, entries types do not have a registered handler"
  );
}

function hasImageSources(
  sources: SourceEntry[]
): sources is ImageSourceEntry[] {
  return sources.every((source) => source.type === "image");
}

function hasCodeSources(sources: SourceEntry[]): sources is CodeSourceEntry[] {
  return sources.every((source) => source.type === "code");
}
