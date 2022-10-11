import { HostedReport } from "@animaapp/scooby-shared";
import { Breadcrumb, PageHeader, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import ErrorPanel from "../../../components/ErrorPanel";
import { RegressionReportController } from "./regression";

type Props = {
  report: HostedReport;
  repository: string;
  commit: string;
};

export function Report({ report, repository, commit }: Props) {
  function getContent() {
    if (report.type === "regression") {
      return <RegressionReportController report={report} />;
    } else {
      return (
        <ErrorPanel
          message={`No report handler has been set for type: ${report.type}`}
        />
      );
    }
  }

  return (
    <div style={{ flex: 1 }}>
      <PageHeader
        title={report.name}
        tags={<Tag color="blue">{report.type}</Tag>}
        breadcrumb={
          <Breadcrumb>
            <Breadcrumb.Item>{repository}</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link relative="path" to="../../">
                {commit}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Typography.Text strong>{report.name} </Typography.Text>
              <Typography.Text type="secondary">
                (created at {new Date(report.createdAt).toLocaleString()})
              </Typography.Text>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{
          borderBottom: "1px solid #c9c9c9",
          marginBottom: "8px",
        }}
      />
      {getContent()}
    </div>
  );
}
