import { ReportId } from "../../../data-fetching/api";
import { useReport } from "../../../data-fetching/hooks/useReport";
import { useEnhancedNavigation } from "../../hooks/useEnhancedNavigation";
import { ReportListItem } from "./ReportListItem";

type Props = {
  reportId: ReportId;
  repository: string;
  commit: string;
};

export const ReportListItemController = ({
  reportId,
  repository,
  commit,
}: Props) => {
  const { report, isLoading, error } = useReport({
    commit,
    repository,
    reportName: reportId,
  });

  const navigate = useEnhancedNavigation();

  const handleReportSelection = (reportId: string) => {
    navigate("report/" + reportId);
  };

  return (
    <ReportListItem
      name={reportId}
      isLoading={isLoading}
      error={error}
      report={report}
      onReportSelect={handleReportSelection}
    />
  );
};
