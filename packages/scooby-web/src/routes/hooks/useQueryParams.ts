import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export function useQueryParams<T = unknown>(): T {
  const { search } = useLocation();
  return useMemo(() => {
    const urlSearchParams = new URLSearchParams(search);

    return Object.fromEntries(urlSearchParams) as T;
  }, [search]);
}
