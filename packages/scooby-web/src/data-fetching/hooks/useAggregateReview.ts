import { CommitContext } from "../api";
import { remapQueryDataResponse } from "./internal/mapping";
import { useQuery } from "./internal/useQuery";

export function useAggregateReview(context: CommitContext) {
  const response = useQuery("getAggregateReview", context);

  return remapQueryDataResponse(response, "review");
}
