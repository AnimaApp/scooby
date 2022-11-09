import { FileMetadata, HostedResource } from "@animaapp/scooby-shared";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { PropsWithChildren } from "react";
import { BaseListItem } from "./BaseListItem";

type Props = PropsWithChildren<{
  metadata: FileMetadata<HostedResource>;
}>;

export const FileListItem = ({ metadata }: Props) => {
  return (
    <BaseListItem name={metadata.name} description={metadata.description}>
      <Button
        type="link"
        download
        href={metadata.file.url}
        icon={<DownloadOutlined />}
      >
        Download
      </Button>
    </BaseListItem>
  );
};
