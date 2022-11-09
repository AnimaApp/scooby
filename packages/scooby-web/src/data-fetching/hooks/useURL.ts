import useSWR from "swr";

export function useURL(url: string | null): {
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
