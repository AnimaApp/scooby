import { useURL } from "../../data-fetching/hooks/useURL";

export type Sources = {
  actual?: string;
  expected?: string;
  diff?: string;
};

export function useSources(sources: {
  expectedUrl?: string;
  actualUrl?: string;
  diffUrl?: string;
}): {
  sources?: Sources;
  isLoading?: boolean;
  error?: unknown;
} {
  const {
    source: expectedSource,
    isLoading: expectedLoading,
    error: expectedError,
  } = useURL(sources.expectedUrl ?? null);
  const {
    source: actualSource,
    isLoading: actualLoading,
    error: actualError,
  } = useURL(sources.actualUrl ?? null);
  const {
    source: diffSource,
    isLoading: diffLoading,
    error: diffError,
  } = useURL(sources.diffUrl ?? null);

  return {
    sources: {
      expected: expectedSource,
      actual: actualSource,
      diff: diffSource,
    },
    isLoading: expectedLoading || actualLoading || diffLoading,
    error: expectedError || actualError || diffError,
  };
}
