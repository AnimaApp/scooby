import { Sentiment } from "@animaapp/scooby-shared";
import { List } from "antd";
import { LargeImageEntryListItem } from "./LargeImageEntryListItem";

export type ImageEntry = {
  id: string;
  thumbnailUrl: string;
  sentiment?: Sentiment;
  tag?: string;
};

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
    <div style={{ flex: 1, overflowY: "scroll", padding: "0 8px" }}>
      <List
        itemLayout="horizontal"
        dataSource={entries}
        style={{ flex: 1 }}
        renderItem={(entry) => (
          <LargeImageEntryListItem
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
