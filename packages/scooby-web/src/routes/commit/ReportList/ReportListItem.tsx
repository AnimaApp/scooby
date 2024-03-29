import { HostedReport } from "@animaapp/scooby-shared";
import { Card, Skeleton, Space, Tag, Typography } from "antd";
import { CSSProperties } from "react";
import { StatsView } from "../../../components/StatsView";
import { SummaryBadge } from "../../../components/SummaryBadge";
import { capitalize } from "../../../utils/capitalize";

type Props = {
  name: string;
  repository: string;
  commit: string;
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
  repository,
  commit,
  onReportSelect,
}: Props) => {
  const handleClick = () => {
    onReportSelect?.(name);
  };

  const commonStyles: CSSProperties = {
    marginBottom: 8,
  };

  const commonCardProps: Parameters<typeof Card>[0] = {
    hoverable: true,
    size: "small",
    onClick: handleClick,
    style: commonStyles,
  };

  if (isLoading) {
    return (
      <Card {...commonCardProps} title={name}>
        <Space>
          <Skeleton.Button active />
          <Skeleton.Avatar active />
          <Skeleton.Input active />
          <Skeleton.Button active />
          <Skeleton.Avatar active />
          <Skeleton.Input active />
          <Skeleton.Button active />
          <Skeleton.Avatar active />
          <Skeleton.Input active />
        </Space>
      </Card>
    );
  }

  if (error || !report) {
    return (
      <Card {...commonCardProps} title={name}>
        Unable to retrieve report data: {String(error)}
      </Card>
    );
  }

  return (
    <Card
      {...commonCardProps}
      title={
        <>
          <Typography.Text strong style={{ marginRight: 8 }}>
            {name}{" "}
          </Typography.Text>
          <SummaryBadge
            commit={commit}
            repository={repository}
            reportName={report.name}
          />
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
    >
      <StatsView stats={report.summary.stats} />
    </Card>
  );
};
