import ErrorPanel from "../../components/ErrorPanel";
import Loader from "../../components/Loader";
import { useAggregateReview } from "../../data-fetching/hooks/useAggregateReview";
import { useReport } from "../../data-fetching/hooks/useReport";
import { Report } from "./Report";

type Props = {
  commit: string;
  reportName: string;
  repository: string;
};

export function ReportController({ commit, reportName, repository }: Props) {
  const { report, isLoading, error } = useReport({
    commit,
    reportName,
    repository,
  });

  const { review, isLoading: isReviewLoading } = useAggregateReview({
    commit,
    repository,
  });

  if (isLoading || isReviewLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPanel message={String(error)} />;
  }

  if (!report) {
    return <ErrorPanel message={"Unreachable report"} />;
  }

  return (
    <Report
      report={report}
      repository={repository}
      commit={commit}
      review={review}
    />
  );
}
