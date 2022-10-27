import { UnixDiffComparator } from "./unix-diff";

export type CodeComparator = {
  getName: () => string;
  compare: (
    expectedPath: string,
    actualPath: string
  ) => Promise<CodeComparisonResult>;
};

export type CodeComparisonResult = {
  similarity: number;
  totalLines: number;
  changedLines: number;
  differenceFilePath?: string;
};

export type CodeComparisonOptions = {
  comparator?: string;
};

const COMPARATORS = [new UnixDiffComparator()] as const;

export function getCodeComparator(
  options?: CodeComparisonOptions
): CodeComparator {
  for (const comparator of COMPARATORS) {
    if (comparator.getName() === (options?.comparator ?? "unix-diff")) {
      return comparator;
    }
  }

  throw new Error(
    "could not find comparator satisfying the given configuration"
  );
}
