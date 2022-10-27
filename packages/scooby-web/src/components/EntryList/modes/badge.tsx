import {
  CheckCircleFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { EntryStatus } from "../../../types";

export function getStatusBadge(
  status: EntryStatus | undefined
): JSX.Element | null {
  if (status === "approved") {
    return (
      <Tooltip title="This entry has been approved">
        <CheckCircleFilled style={{ color: "green" }} />
      </Tooltip>
    );
  } else if (status === "changes_requested") {
    return (
      <Tooltip title="Changes have been requested for this entry">
        <ExclamationCircleOutlined style={{ color: "red" }} />
      </Tooltip>
    );
  }

  return null;
}
