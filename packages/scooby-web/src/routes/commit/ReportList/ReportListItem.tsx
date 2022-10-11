import { HostedReport } from "@animaapp/scooby-shared";
import { Card, Spin, Tag, Typography } from "antd";
import { StatsView } from "../../../components/StatsView";
import { SummaryBadge } from "../../../components/SummaryBadge";
import { capitalize } from "../../../utils/capitalize";

type Props = {
  name: string;
  isLoading?: boolean;
  error?: unknown;
  report?: HostedReport;
  onReportSelect?: (reportId: string) => void;
};

export const ReportListItem = ({
  name,
  isLoading,
  error,
  report,
  onReportSelect,
}: Props) => {
  const handleClick = () => {
    onReportSelect?.(name);
  };

  if (isLoading) {
    return (
      <Card
        hoverable
        title={
          <>
            {name} <Spin />
          </>
        }
        size="small"
        onClick={handleClick}
      ></Card>
    );
  }

  if (error || !report) {
    return (
      <Card hoverable title={name} size="small" onClick={handleClick}>
        Unable to retrieve report data
      </Card>
    );
  }

  return (
    <Card
      hoverable
      onClick={handleClick}
      title={
        <>
          <Typography.Text strong style={{ marginRight: 8 }}>
            {name}{" "}
          </Typography.Text>
          <SummaryBadge summary={report.summary} />
          <Tag>{capitalize(report.type)}</Tag>
        </>
      }
      extra={
        <>
          <Typography.Text type="secondary">
            (created at {new Date(report.createdAt).toLocaleString()})
          </Typography.Text>
        </>
      }
      size="small"
      style={{
        borderColor: report.summary.result === "success" ? "green" : "red",
      }}
    >
      <StatsView stats={report.summary.stats} />
    </Card>
  );
};
