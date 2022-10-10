import { useParams } from "react-router-dom";
import ErrorPanel from "../../../components/ErrorPanel";
import { ReportParams } from "../../../types";
import { ReportController } from "./ReportController";

export default function ReportRoot() {
  const params = useParams<ReportParams>();

  if (!params.commit || !params.reportName || !params.repository) {
    return <ErrorPanel message="Some URL parameters are missing" />;
  }

  return (
    <ReportController
      commit={params.commit}
      reportName={params.reportName}
      repository={params.repository}
    />
  );
}
