import { HostedResource, ImageMetadata } from "@animaapp/scooby-shared";
import { Image } from "antd";
import { PropsWithChildren } from "react";
import { BaseListItem } from "./BaseListItem";

type Props = PropsWithChildren<{
  metadata: ImageMetadata<HostedResource>;
}>;

export const ImageListItem = ({ metadata }: Props) => {
  return (
    <BaseListItem name={metadata.name} description={metadata.description}>
      <Image src={metadata.image.url} />
    </BaseListItem>
  );
};
