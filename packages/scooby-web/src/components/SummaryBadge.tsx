import { Summary } from "@animaapp/scooby-shared";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { capitalize } from "../utils/capitalize";

type Props = { summary: Summary };

export const SummaryBadge = ({ summary }: Props) => {
  if (summary.result === "success") {
    return (
      <Tag icon={<CheckCircleOutlined />} color="success">
        Success
      </Tag>
    );
  } else if (summary.result === "failure") {
    return (
      <Tag icon={<CloseCircleOutlined />} color="error">
        Failure
      </Tag>
    );
  } else {
    return (
      <Tag icon={<CloseCircleOutlined />} color="error">
        {capitalize(summary.result)}
      </Tag>
    );
  }
};
