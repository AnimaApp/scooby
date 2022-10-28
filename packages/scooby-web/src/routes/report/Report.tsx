import { HostedReport, Review } from "@animaapp/scooby-shared";
import { Breadcrumb, PageHeader, Tag, Typography } from "antd";
import { EnhancedLink } from "../../components/EnhancedLink";
import ErrorPanel from "../../components/ErrorPanel";
import { StatsView } from "../../components/StatsView";
import { SummaryBadge } from "../../components/SummaryBadge";
import { ApproveButton } from "./ApproveButton";
import { FidelityReportController } from "./fidelity";
import { RegressionReportController } from "./regression";

type Props = {
  report: HostedReport;
  repository: string;
  commit: string;
  review: Review | undefined;
};

export function Report({ report, repository, commit, review }: Props) {
  function getContent() {
    switch (report.type) {
      case "regression":
        return <RegressionReportController report={report} review={review} />;
      case "fidelity":
        return <FidelityReportController report={report} review={review} />;
      default:
        return (
          <ErrorPanel
            // @ts-ignore
            message={`No report handler has been set for type: ${report.type}`}
          />
        );
    }
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <PageHeader
        title={report.name}
        tags={
          <>
            <Tag color="blue">{report.type}</Tag>{" "}
            <SummaryBadge
              commit={commit}
              reportName={report.name}
              repository={repository}
            />
          </>
        }
        breadcrumb={
          <Breadcrumb>
            <Breadcrumb.Item>{repository}</Breadcrumb.Item>
            <Breadcrumb.Item>
              <EnhancedLink relative="path" to="../../">
                {commit}
              </EnhancedLink>
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
        extra={
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <StatsView compact stats={report.summary.stats} />
            <ApproveButton
              commit={commit}
              report={report.name}
              repository={repository}
            />
          </div>
        }
      />
      <div
        style={{
          height: "calc(100% - 100px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {getContent()}
      </div>
    </div>
  );
}
