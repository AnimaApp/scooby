import { List } from "antd";
import { Entry } from "../../../../types";
import { ListItem } from "./ListItem";

type Props = {
  selectedEntryId?: string;
  entries: Entry[];
  onEntrySelected: (entry: Entry) => void;
};

export const BasicEntryList = ({
  entries,
  selectedEntryId,
  onEntrySelected,
}: Props) => {
  return (
    <div style={{ flex: 1, overflowY: "scroll" }}>
      <List
        size="small"
        bordered
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
