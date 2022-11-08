import {
  CaretLeftOutlined,
  CaretRightOutlined,
  DiffOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import { Button, Card, Tag, Tooltip } from "antd";
import { ReactNode } from "react";
import { getColorForSentiment } from "../../utils/colors";
import { CodeData } from "./CodeComparatorController";
import { Sources } from "./useSource";
import Editor from "@monaco-editor/react";
import { DiffEditor } from "@monaco-editor/react";
import { getLanguageForFile } from "../../utils/language";

type Props = {
  sources: Sources;
  name: string;
  data: CodeData;
  mode: PreferredMode;
  onModeSelected: (mode: PreferredMode) => void;
};

export type PreferredMode = "expected" | "actual" | "diff" | "raw_diff";

export const CodeComparator = (props: Props) => {
  function getEditor() {
    const commonEditorProps = {
      height: "90vh",
      language: getLanguageForFile(props.data.filePath),
      options: {
        readOnly: true,
      },
    } as const;

    if (props.mode === "diff") {
      return (
        <DiffEditor
          {...commonEditorProps}
          original={props.sources.expected ?? ""}
          modified={props.sources.actual ?? ""}
        />
      );
    } else if (props.mode === "actual") {
      return (
        <Editor {...commonEditorProps} value={props.sources.actual ?? ""} />
      );
    } else if (props.mode === "expected") {
      return (
        <Editor {...commonEditorProps} value={props.sources.expected ?? ""} />
      );
    } else if (props.mode === "raw_diff") {
      return (
        <Editor
          {...commonEditorProps}
          language="diff"
          value={props.sources.diff ?? "Not available"}
        />
      );
    }
  }

  return (
    <Card
      title={getTitle(props.name, props.data)}
      size="small"
      extra={
        <div style={{ display: "flex", gap: 4 }}>
          <Tooltip title="(←) Show expected code, the 'reference' code used as benchmark">
            <Button
              disabled={props.data.type === "new"}
              type={props.mode === "expected" ? "primary" : "default"}
              onClick={() => props.onModeSelected("expected")}
            >
              <CaretLeftOutlined /> Expected
            </Button>
          </Tooltip>
          <Tooltip title="(→) Show actual code, the one produced by this test run">
            <Button
              disabled={props.data.type === "removed"}
              type={props.mode === "actual" ? "primary" : "default"}
              onClick={() => props.onModeSelected("actual")}
            >
              <CaretRightOutlined /> Actual
            </Button>
          </Tooltip>
          <Tooltip title="(d) Show Difference">
            <Button
              disabled={
                props.data.type === "removed" || props.data.type === "new"
              }
              type={props.mode === "diff" ? "primary" : "default"}
              onClick={() => props.onModeSelected("diff")}
            >
              <DiffOutlined /> Difference
            </Button>
          </Tooltip>
          <Tooltip title="(o) Show Raw Difference, as exported by the diffing algorithm">
            <Button
              disabled={
                props.data.type === "removed" || props.data.type === "new"
              }
              type={props.mode === "raw_diff" ? "primary" : "default"}
              onClick={() => props.onModeSelected("raw_diff")}
            >
              <PicCenterOutlined /> Raw Diff
            </Button>
          </Tooltip>
        </div>
      }
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "scroll",
        height: "100%",
        padding: 0,
      }}
      headStyle={{
        flexShrink: 0,
      }}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {getEditor()}
    </Card>
  );
};

function getTitle(name: string, data: CodeData): ReactNode {
  return (
    <>
      <span style={{ marginRight: 8 }}>{name}</span>
      {data.tag && (
        <Tag
          color={
            data.sentiment ? getColorForSentiment(data.sentiment) : undefined
          }
        >
          {data.tag}
        </Tag>
      )}
      {data.type === "pair" && (
        <Tag>Similarity: {data.similarity.toFixed(6)}</Tag>
      )}
    </>
  );
}
