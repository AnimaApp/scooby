import { useMemo } from "react";
import { ReportContext } from "../api";
import { useCommitStatusOverview } from "./useCommitStatusOverview";

export function useReportStatus(context: ReportContext) {
  const { overview, isLoading, error } = useCommitStatusOverview({
    commit: context.commit,
    repository: context.repository,
  });

  const status = useMemo(() => {
    if (overview) {
      return overview.reports[context.reportName];
    }
  }, [overview, context.reportName]);

  return {
    status,
    isLoading,
    error,
  };
}
