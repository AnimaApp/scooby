import { CommitContext } from "../api";
import { remapQueryDataResponse } from "./internal/mapping";
import { useQuery } from "./internal/useQuery";

export function useReports(context: CommitContext) {
  const response = useQuery("getReports", context);

  return remapQueryDataResponse(response, "reports");
}
