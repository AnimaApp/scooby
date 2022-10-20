import { useMemo } from "react";
import { useCommitStatusOverview } from "../../../data-fetching/hooks/useCommitStatusOverview";
import { ApproveButton } from "./ApproveButton";

type Props = { commit: string; repository: string; report: string };

export function ApproveButtonController({ commit, repository, report }: Props) {
  const { overview, isLoading, error } = useCommitStatusOverview({
    commit,
    repository,
  });

  const status = useMemo(() => {
    if (isLoading) {
      return "loading";
    } else if (overview) {
      const reportStatus = overview.reports[report];
      console.log(reportStatus);
      if (reportStatus.status === "success") {
        return "success";
      } else if (reportStatus.status === "approved") {
        return "approved";
      } else {
        return "to_approve";
      }
    }

    return "error";
  }, [isLoading, overview, error, report]);

  return <ApproveButton status={status} />;
}
