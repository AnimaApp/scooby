import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getProtectedParams } from "./params";
import { useQueryParams } from "./useQueryParams";

type Callback =
  | Record<string, any>
  | ((oldParams: Record<string, any>) => Record<string, any>);

export function useUpdateParams(): {
  updateParams: (callback: Callback, resetProtectedParams?: boolean) => void;
} {
  const currentParams = useQueryParams<Record<string, any>>();
  const navigate = useNavigate();

  const updateParams = useCallback(
    (callback: Callback, resetProtectedParams = false) => {
      const oldParams = JSON.parse(JSON.stringify(currentParams));
      let newParams = {};
      if (typeof callback === "object") {
        newParams = callback;
      } else if (typeof callback === "function") {
        newParams = callback(oldParams);
      }
      const params = {
        ...(resetProtectedParams ? {} : getProtectedParams(oldParams)),
        ...newParams,
      };

      const serializedParams = new URLSearchParams(params).toString();
      navigate(`?${serializedParams}`);
    },
    [currentParams]
  );

  return {
    updateParams,
  };
}
