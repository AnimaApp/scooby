import { SearchOutlined } from "@ant-design/icons";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { Button, Input, Radio, Tooltip, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Entry } from "../../types";
import { isEntryMatchingQuery } from "../../utils/search";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries: Entry[] = useMemo(() => {
    if (!searchQuery) {
      return entries;
    }

    return entries.filter((entry) => isEntryMatchingQuery(entry, searchQuery));
  }, [searchQuery, entries]);

  useEffect(() => {
    if (filteredEntries.length && searchQuery) {
      onEntrySelected(filteredEntries[0]);
    }
  }, [filteredEntries, searchQuery]);

  useHotkeys("/", (event) => {
    if (!searchOpen) {
      setSearchOpen(true);
      event.preventDefault();
    }
  });

  function renderToolbar() {
    if (searchOpen) {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Input
            allowClear
            ref={(ref) => ref?.focus()}
            prefix={<SearchOutlined />}
            onChange={(event) => {
              const value = event.target.value;
              if (value) {
                setSearchQuery(value);
              } else {
                setSearchQuery("");
                setSearchOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.code === "Escape") {
                setSearchOpen(false);
                setSearchQuery("");
              }
            }}
          />
          <Typography.Text type="secondary">
            {filteredEntries.length} results
          </Typography.Text>
        </div>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        <Radio.Group
          value={currentMode}
          onChange={(e) => setCurrentMode(e.target.value)}
        >
          {candidateModes.map((mode) => {
            const Icon = ENTRY_LIST_MODES[mode].icon;
            return (
              <Tooltip title={ENTRY_LIST_MODES[mode].description} key={mode}>
                <Radio.Button value={mode}>
                  <Icon />
                </Radio.Button>
              </Tooltip>
            );
          })}
        </Radio.Group>
        <Tooltip title="Search">
          <Button
            type="default"
            shape="circle"
            icon={<SearchOutlined />}
            onClick={() => setSearchOpen(true)}
          />
        </Tooltip>
      </div>
    );
  }

  const RenderView = ENTRY_LIST_MODES[currentMode].render;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "0 8px 0 8px",
      }}
    >
      <div style={{ marginBottom: 8 }}>{renderToolbar()}</div>
      <RenderView
        entries={filteredEntries as any}
        onEntrySelected={onEntrySelected}
        selectedEntryId={selectedEntryId}
      />
    </div>
  );
};
