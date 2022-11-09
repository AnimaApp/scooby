import { HostedResource, Metadata } from "@animaapp/scooby-shared";
import { List } from "antd";
import { ListItem } from "./ListItem";

type Props = {
  metadata: Metadata<HostedResource>[];
};

export const MetadataList = ({ metadata }: Props) => {
  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      <List
        itemLayout="horizontal"
        dataSource={metadata}
        style={{ flex: 1 }}
        renderItem={(metadata) => (
          <ListItem metadata={metadata} key={metadata.name} />
        )}
        locale={{
          emptyText:
            "There is no metadata defined for this entry, check out the documentation to see how to add it.",
        }}
      />
    </div>
  );
};
