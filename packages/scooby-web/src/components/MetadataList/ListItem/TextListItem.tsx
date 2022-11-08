import { TextMetadata } from "@animaapp/scooby-shared";
import { PropsWithChildren } from "react";
import { BaseListItem } from "./BaseListItem";

type Props = PropsWithChildren<{
  metadata: TextMetadata;
}>;

export const TextListItem = ({ metadata }: Props) => {
  return (
    <BaseListItem name={metadata.name} description={metadata.description}>
      {metadata.text}
    </BaseListItem>
  );
};
