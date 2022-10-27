import useSWR from "swr";

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

function useURL(url: string | null): {
  source?: string;
  isLoading?: boolean;
  error?: unknown;
} {
  const { data, error, isValidating } = useSWR(url, fetcher, {
    dedupingInterval: 120000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    source: data,
    error,
    isLoading: isValidating,
  };
}

async function fetcher(url: string): Promise<string> {
  const response = await fetch(url);

  return response.text();
}
