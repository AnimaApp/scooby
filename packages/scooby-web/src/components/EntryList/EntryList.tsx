import { Radio, Tooltip } from "antd";
import { useMemo, useState } from "react";
import { Entry } from "../../types";
import { ENTRY_LIST_MODES, Mode } from "./modes";

type Props = {
  selectedEntryId?: string;
  entries: Entry[];
  onEntrySelected: (entry: Entry) => void;
};

export const EntryList = ({
  entries,
  selectedEntryId,
  onEntrySelected,
}: Props) => {
  const candidateModes: Mode[] = useMemo((): Mode[] => {
    if (entries.every((entry) => entry.type === "image")) {
      return ["image", "basic", "fileTree"];
    } else if (entries.every((entry) => entry.type === "code")) {
      return ["basic", "fileTree"];
    }

    return ["basic", "fileTree"];
  }, [entries]);

  const [currentMode, setCurrentMode] = useState<Mode>(candidateModes[0]);

  const RenderView = ENTRY_LIST_MODES[currentMode].render;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "0 8px 0 8px",
      }}
    >
      <Radio.Group
        value={currentMode}
        onChange={(e) => setCurrentMode(e.target.value)}
        style={{ marginBottom: 8 }}
      >
        {candidateModes.map((mode) => {
          const Icon = ENTRY_LIST_MODES[mode].icon;
          return (
            <Tooltip title={ENTRY_LIST_MODES[mode].description}>
              <Radio.Button value={mode}>
                <Icon />
              </Radio.Button>
            </Tooltip>
          );
        })}
      </Radio.Group>
      <RenderView
        entries={entries as any}
        onEntrySelected={onEntrySelected}
        selectedEntryId={selectedEntryId}
      />
    </div>
  );
};
