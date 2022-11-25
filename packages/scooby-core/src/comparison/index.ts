import { MatchedPair } from "../matching/types";
import { CodeSourceEntry, ImageSourceEntry, SourceEntry } from "../types";
import { performBatchCodeComparison } from "./code";
import { performBatchImageComparison } from "./image";
import { BatchComparisonOptions, BatchComparisonResult } from "./types";

export async function performBatchComparison(
  pairs: MatchedPair<SourceEntry>[],
  options?: Partial<BatchComparisonOptions>
): Promise<BatchComparisonResult> {
  if (!pairs.length) {
    return { type: "empty", comparisons: [] };
  }

  checkPairCoherence(pairs);

  if (areImagePairs(pairs)) {
    return performBatchImageComparison(pairs, options);
  } else if (areCodePairs(pairs)) {
    return performBatchCodeComparison(pairs, options);
  }

  throw new Error(
    "could not perform batch comparison, there is no handled registered for this pair type"
  );
}

function areImagePairs(
  pairs: MatchedPair<SourceEntry>[]
): pairs is MatchedPair<ImageSourceEntry>[] {
  const entryType = pairs[0].actual.type;
  return entryType === "image";
}

function areCodePairs(
  pairs: MatchedPair<SourceEntry>[]
): pairs is MatchedPair<CodeSourceEntry>[] {
  const entryType = pairs[0].actual.type;
  return entryType === "code";
}

function checkPairCoherence(pairs: MatchedPair<SourceEntry>[]) {
  const entryType = pairs[0].actual.type;

  if (!pairs.every((pair) => pair.actual.type === entryType)) {
    throw new Error(
      "comparison pairs are malformed, found different types in actual items"
    );
  }

  if (!pairs.every((pair) => pair.expected.type === entryType)) {
    throw new Error(
      "comparison pairs are malformed, found different types in expected items"
    );
  }
}

export * from "./types";
