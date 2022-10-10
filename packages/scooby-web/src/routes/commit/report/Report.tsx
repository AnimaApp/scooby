import { Report } from "@animaapp/scooby-shared";
import { PageHeader, Tag } from "antd";
import ErrorPanel from "../../../components/ErrorPanel";
import { RegressionReport } from "./regression";

type Props = {
  report: Report;
};

export function Report({ report }: Props) {
  function getContent() {
    if (report.type === "regression") {
      return <RegressionReport report={report} />;
    } else {
      return (
        <ErrorPanel
          message={`No report handler has been set for type: ${report.type}`}
        />
      );
    }
  }

  return (
    <div>
      <PageHeader
        title={report.name}
        tags={<Tag color="blue">{report.type}</Tag>}
      />
      {getContent()}
    </div>
  );
}
