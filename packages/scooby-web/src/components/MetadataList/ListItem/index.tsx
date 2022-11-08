import { HostedResource, Metadata } from "@animaapp/scooby-shared";
import { CodeListItem } from "./CodeListItem";
import { FileListItem } from "./FileListItem";
import { ImageListItem } from "./ImageListItem";
import { LinkListItem } from "./LinkListItem";
import { TextListItem } from "./TextListItem";

type Props = {
  metadata: Metadata<HostedResource>;
};

export const ListItem = ({ metadata }: Props) => {
  switch (metadata.type) {
    case "text":
      return <TextListItem metadata={metadata} />;
    case "link":
      return <LinkListItem metadata={metadata} />;
    case "image":
      return <ImageListItem metadata={metadata} />;
    case "file":
      return <FileListItem metadata={metadata} />;
    case "code":
      return <CodeListItem metadata={metadata} />;
  }
};
