import { LinkMetadata } from "@animaapp/scooby-shared";
import { LinkOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { PropsWithChildren } from "react";
import { BaseListItem } from "./BaseListItem";

type Props = PropsWithChildren<{
  metadata: LinkMetadata;
}>;

export const LinkListItem = ({ metadata }: Props) => {
  return (
    <BaseListItem name={metadata.name} description={metadata.description}>
      <Button
        type="link"
        href={metadata.url}
        icon={<LinkOutlined />}
        target="_blank"
      >
        {metadata.url}
      </Button>
    </BaseListItem>
  );
};
