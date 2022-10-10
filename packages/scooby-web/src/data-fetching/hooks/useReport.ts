import { ReportContext } from "../api";
import { remapQueryDataResponse } from "./internal/mapping";
import { useQuery } from "./internal/useQuery";

export function useReport(context: ReportContext) {
  const response = useQuery("getReport", context);

  return remapQueryDataResponse(response, "report");
}
