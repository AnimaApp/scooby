import {
  BatchComparisonEntry,
  BatchComparisonResult,
} from "../../comparison/types";

export type FidelityEntriesOutcome<
  TEntry extends BatchComparisonEntry = BatchComparisonEntry
> = {
  success: TEntry[];
  failure: TEntry[];
};

export type FidelityEntriesOutcomeOptions = {
  threshold: number;
};

const DEFAULT_OPTIONS: FidelityEntriesOutcomeOptions = {
  // By default, all entries pass
  threshold: 0,
};

export function calculateEntriesOutcome(
  result: BatchComparisonResult,
  options?: Partial<FidelityEntriesOutcomeOptions>
): FidelityEntriesOutcome<BatchComparisonEntry> {
  const effectiveOptions: FidelityEntriesOutcomeOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const { success, failure } = splitByChange(
    result.comparisons,
    effectiveOptions.threshold
  );

  return {
    success,
    failure,
  };
}

function splitByChange(
  results: BatchComparisonEntry[],
  threshold: number
): {
  success: BatchComparisonEntry[];
  failure: BatchComparisonEntry[];
} {
  const success: BatchComparisonEntry[] = [];
  const failure: BatchComparisonEntry[] = [];

  for (const result of results) {
    if (result.comparison.similarity < threshold) {
      failure.push(result);
    } else {
      success.push(result);
    }
  }

  return { success, failure };
}
