import { Tree } from "antd";
import { useMemo } from "react";
import { Entry } from "../../../../types";
import { convertToTreeData } from "./tree";

type Props = {
  selectedEntryId?: string;
  entries: Entry[];
  onEntrySelected: (entry: Entry) => void;
};

export const FileTreeEntryList = ({
  entries,
  selectedEntryId,
  onEntrySelected,
}: Props) => {
  const treeData = useMemo(() => convertToTreeData(entries), [entries]);

  const selectedKeys = useMemo(() => {
    if (!selectedEntryId) {
      return;
    }

    const selectedKey = entries.find(
      (entry) => entry.id === selectedEntryId
    )?.path;
    if (!selectedKey) {
      return;
    }

    return [selectedKey];
  }, [selectedEntryId, entries]);

  const handleSelection = (selectedKeys: (string | number)[]) => {
    const selectedKey = selectedKeys[0];
    if (!selectedKey) {
      return;
    }

    const selectedEntry = entries.find((entry) => entry.path === selectedKey);
    if (!selectedEntry) {
      return;
    }

    onEntrySelected(selectedEntry);
  };

  return (
    <div style={{ flex: 1, overflowY: "scroll" }}>
      <Tree.DirectoryTree
        defaultExpandAll
        selectedKeys={selectedKeys}
        showLine
        style={{ flex: 1 }}
        onSelect={handleSelection}
        treeData={treeData}
      />
    </div>
  );
};
