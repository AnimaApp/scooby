import {
  CheckCircleFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { List, Tag, Tooltip } from "antd";
import { useEffect, useRef } from "react";
import { EntryStatus, Entry } from "../../../../types";
import { getColorForSentiment } from "../../../../utils/colors";

type Props = {
  selected?: boolean;
  entry: Entry;
  onClick: () => void;
};

export const ListItem = ({ selected, entry, onClick }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) {
      ref?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  const color = entry.sentiment
    ? getColorForSentiment(entry.sentiment)
    : "black";

  return (
    <List.Item
      ref={ref}
      title={entry.id}
      extra={
        <div style={{ display: "flex", alignItems: "center" }}>
          {entry.tag ? <Tag color={color}>{entry.tag}</Tag> : null}
          {getStatusBadge(entry.status)}
        </div>
      }
      className="clickable-list-item"
      style={{
        width: "200px",
        backgroundColor: "white",
        boxShadow: `inset 0px 0px 0px ${selected ? 3 : 1}px ${color}`,
      }}
      onClick={onClick}
    >
      {entry.id}
    </List.Item>
  );
};

function getStatusBadge(status: EntryStatus | undefined): JSX.Element | null {
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
