import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import { useReportStatus } from "../data-fetching/hooks/useReportStatus";

type Props = { reportName: string; commit: string; repository: string };

export const SummaryBadge = ({ reportName, commit, repository }: Props) => {
  const { status, isLoading } = useReportStatus({
    reportName,
    commit,
    repository,
  });

  if (isLoading) {
    return (
      <Tag icon={<LoadingOutlined style={{ fontSize: 12 }} spin />}>
        Loading
      </Tag>
    );
  } else if (status?.status === "success") {
    return (
      <Tag icon={<CheckCircleOutlined />} color="success">
        Success
      </Tag>
    );
  } else if (status?.status === "approved") {
    return (
      <Tag icon={<CheckCircleOutlined />} color="success">
        Approved
      </Tag>
    );
  } else if (status?.status === "changes_requested") {
    return (
      <Tag icon={<CloseCircleOutlined />} color="error">
        Changes requested
      </Tag>
    );
  } else if (status?.status === "failure") {
    return (
      <Tag icon={<CloseCircleOutlined />} color="error">
        Failure
      </Tag>
    );
  }

  return (
    <Tag icon={<CloseCircleOutlined />} color="error">
      Unknown error
    </Tag>
  );
};
