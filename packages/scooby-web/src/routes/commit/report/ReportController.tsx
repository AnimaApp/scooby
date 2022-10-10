import ErrorPanel from "../../../components/ErrorPanel";
import Loader from "../../../components/Loader";
import { useReport } from "../../../data-fetching/hooks/useReport";
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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPanel message={String(error)} />;
  }

  if (!report) {
    return <ErrorPanel message={"Unreachable report"} />;
  }

  return <Report report={report} />;
}
