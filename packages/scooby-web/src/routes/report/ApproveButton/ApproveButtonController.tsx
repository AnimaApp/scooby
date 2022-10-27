import { useMemo, useState } from "react";
import { useAPI } from "../../../data-fetching/api/provider";
import { useCommitStatusOverview } from "../../../data-fetching/hooks/useCommitStatusOverview";
import { useFeedback } from "../../../providers/feedback";
import { ApproveButton } from "./ApproveButton";

type Props = { commit: string; repository: string; report: string };

export function ApproveButtonController({ commit, repository, report }: Props) {
  const { api } = useAPI();
  const { confetti } = useFeedback();
  const [requestState, setRequestState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { overview, isLoading, error } = useCommitStatusOverview({
    commit,
    repository,
  });

  const status = useMemo(() => {
    if (requestState === "loading") {
      return "approving";
    } else if (requestState === "success") {
      return "approved";
    } else if (isLoading) {
      return "loading";
    } else if (overview) {
      const reportStatus = overview.reports[report];
      if (reportStatus.status === "success") {
        return "success";
      } else if (reportStatus.status === "approved") {
        return "approved";
      } else {
        return "to_approve";
      }
    }

    return "error";
  }, [isLoading, overview, error, report, requestState]);

  const handleApprove = async () => {
    setRequestState("loading");
    try {
      await api.approveReport({
        commit,
        reportName: report,
        repository,
      });
      setRequestState("success");
      confetti();

      // TODO: invalidate SWR status to show actual approved status
    } catch (error) {
      setRequestState("error");
      console.error("approve request error: ", error);
    }
  };

  return <ApproveButton status={status} onApprove={handleApprove} />;
}
