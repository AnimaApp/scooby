import {
  BatchImageComparisonEntry,
  BatchImageComparisonResult,
} from "../../comparison";

export type RegressionCheckResult = {
  unchanged: BatchImageComparisonEntry[];
  changed: BatchImageComparisonEntry[];
};

export type RegressionCheckOptions = {
  threshold: number;
};

const DEFAULT_OPTIONS: RegressionCheckOptions = {
  threshold: 1,
};

export function calculateRegressions(
  result: BatchImageComparisonResult,
  options?: Partial<RegressionCheckOptions>
) {
  const effectiveOptions: RegressionCheckOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const { changed, unchanged } = splitByChange(
    result.comparisons,
    effectiveOptions.threshold
  );

  return {
    changed: changed,
    unchanged: unchanged,
  };
}

function splitByChange(
  results: BatchImageComparisonEntry[],
  threshold: number
): {
  changed: BatchImageComparisonEntry[];
  unchanged: BatchImageComparisonEntry[];
} {
  const changed: BatchImageComparisonEntry[] = [];
  const unchanged: BatchImageComparisonEntry[] = [];

  for (const result of results) {
    if (result.comparison.similarity < threshold) {
      changed.push(result);
    } else {
      unchanged.push(result);
    }
  }

  return { changed, unchanged };
}
