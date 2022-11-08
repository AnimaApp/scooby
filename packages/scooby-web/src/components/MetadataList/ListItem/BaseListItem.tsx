import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  name: string;
  description?: string;
}>;

export const BaseListItem = ({ name, description, children }: Props) => {
  return (
    <Card
      title={name}
      extra={
        description ? (
          <Tooltip title={description}>
            <InfoCircleOutlined />
          </Tooltip>
        ) : undefined
      }
      size="small"
      bodyStyle={{ padding: 8, position: "relative" }}
      style={{
        marginBottom: 8,
      }}
    >
      {children}
    </Card>
  );
};
