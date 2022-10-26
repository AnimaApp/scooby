import {
  BatchComparisonEntry,
  BatchComparisonResult,
} from "../../comparison/types";

export type RegressionCheckResult<
  TEntry extends BatchComparisonEntry = BatchComparisonEntry
> = {
  unchanged: TEntry[];
  changed: TEntry[];
};

export type RegressionCheckOptions = {
  threshold: number;
};

const DEFAULT_OPTIONS: RegressionCheckOptions = {
  threshold: 1,
};

export function calculateRegressions(
  result: BatchComparisonResult,
  options?: Partial<RegressionCheckOptions>
): RegressionCheckResult<BatchComparisonEntry> {
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
  results: BatchComparisonEntry[],
  threshold: number
): {
  changed: BatchComparisonEntry[];
  unchanged: BatchComparisonEntry[];
} {
  const changed: BatchComparisonEntry[] = [];
  const unchanged: BatchComparisonEntry[] = [];

  for (const result of results) {
    if (result.comparison.similarity < threshold) {
      changed.push(result);
    } else {
      unchanged.push(result);
    }
  }

  return { changed, unchanged };
}
