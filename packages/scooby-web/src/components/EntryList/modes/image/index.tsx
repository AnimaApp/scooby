import { List } from "antd";
import { ImageEntry } from "../../../../types";
import { ListItem } from "./ListItem";

type Props = {
  selectedEntryId?: string;
  entries: ImageEntry[];
  onEntrySelected: (entry: ImageEntry) => void;
};

export const ImageEntryList = ({
  entries,
  selectedEntryId,
  onEntrySelected,
}: Props) => {
  return (
    <div style={{ flex: 1, overflowY: "scroll" }}>
      <List
        itemLayout="horizontal"
        dataSource={entries}
        style={{ flex: 1 }}
        renderItem={(entry) => (
          <ListItem
            entry={entry}
            key={entry.id}
            selected={selectedEntryId === entry.id}
            onClick={() => onEntrySelected(entry)}
          />
        )}
      />
    </div>
  );
};
