import { CommitContext } from "../api";
import { remapQueryDataResponse } from "./internal/mapping";
import { useQuery } from "./internal/useQuery";

export function useCommitStatusOverview(context: CommitContext) {
  const response = useQuery("getCommitStatusOverview", context);

  return remapQueryDataResponse(response, "overview");
}
