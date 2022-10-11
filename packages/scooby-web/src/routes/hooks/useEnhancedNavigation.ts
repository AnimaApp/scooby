import { useCallback } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getProtectedParams } from "./params";
import { useQueryParams } from "./useQueryParams";

// A useNavigate version that preserves global params
export function useEnhancedNavigation(): NavigateFunction {
  const params = useQueryParams<Record<string, any>>();
  const navigate = useNavigate();

  const enhancedNavigate: NavigateFunction = useCallback<NavigateFunction>(
    // @ts-ignore
    (to, options) => {
      const protectedParams = getProtectedParams(params);
      const serializedParams = new URLSearchParams(protectedParams).toString();

      navigate(`${to}?${serializedParams}`, options);
    },
    [params]
  );

  return enhancedNavigate;
}
