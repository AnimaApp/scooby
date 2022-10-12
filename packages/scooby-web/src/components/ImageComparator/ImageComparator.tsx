import {
  CaretLeftOutlined,
  CaretRightOutlined,
  DiffOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import { Button, Card, Tag, Tooltip, Image, Spin } from "antd";
import { ReactNode } from "react";
import { ImageData } from "./ImageComparatorController";

type Props = {
  name: string;
  imageData: ImageData;
  mode: PreferredMode;
  onModeSelected: (mode: PreferredMode) => void;
};

export type PreferredMode = "expected" | "actual" | "diff" | "overlap";

export const ImageComparator = (props: Props) => {
  function getImageSource() {
    if (props.imageData.type === "new") {
      return props.imageData.newUrl;
    } else if (props.imageData.type === "removed") {
      return props.imageData.removedUrl;
    } else {
      if (props.mode === "expected") {
        return props.imageData.expectedUrl;
      } else if (props.mode === "actual") {
        return props.imageData.actualUrl;
      } else if (props.mode === "diff") {
        return props.imageData.diffUrl;
      } else if (props.mode === "overlap") {
        return props.imageData.overlapUrl;
      }
    }
  }

  return (
    <Card
      title={getTitle(props.name, props.imageData)}
      size="small"
      extra={
        <div style={{ display: "flex", gap: 4 }}>
          <Tooltip title="(←) Show expected image, the 'reference' image used as benchmark">
            <Button
              disabled={props.imageData.type === "new"}
              type={props.mode === "expected" ? "primary" : "default"}
              onClick={() => props.onModeSelected("expected")}
            >
              <CaretLeftOutlined /> Expected
            </Button>
          </Tooltip>
          <Tooltip title="(⭢) Show actual image, the one produced by this test run">
            <Button
              disabled={props.imageData.type === "removed"}
              type={props.mode === "actual" ? "primary" : "default"}
              onClick={() => props.onModeSelected("actual")}
            >
              <CaretRightOutlined /> Actual
            </Button>
          </Tooltip>
          <Tooltip title="(d) Show Difference">
            <Button
              disabled={
                props.imageData.type === "removed" ||
                props.imageData.type === "new"
              }
              type={props.mode === "diff" ? "primary" : "default"}
              onClick={() => props.onModeSelected("diff")}
            >
              <DiffOutlined /> Difference
            </Button>
          </Tooltip>
          <Tooltip title="(o) Show Overlap">
            <Button
              disabled={
                props.imageData.type === "removed" ||
                props.imageData.type === "new"
              }
              type={props.mode === "overlap" ? "primary" : "default"}
              onClick={() => props.onModeSelected("overlap")}
            >
              <PicCenterOutlined /> Overlap
            </Button>
          </Tooltip>
        </div>
      }
      bodyStyle={{
        background:
          "repeating-conic-gradient(#ededed 0% 25%, transparent 0% 50%) 50% / 20px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "scroll",
        height: "100%",
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
      <Image
        key={getImageSource()}
        style={{ maxWidth: "80vw" }}
        src={getImageSource()}
        placeholder={<Spin />}
      />
    </Card>
  );
};

function getTitle(name: string, imageData: ImageData): ReactNode {
  let message = "unchanged";
  let color = "green";
  if (imageData.type === "new") {
    message = "new";
    color = "orange";
  } else if (imageData.type === "removed") {
    message = "removed";
    color = "orange";
  } else if (imageData.type === "pair" && imageData.changed) {
    message = "changed";
    color = "red";
  }

  return (
    <>
      {name}
      <Tag color={color} style={{ marginLeft: 8 }}>
        {message}
      </Tag>
      {imageData.type === "pair" && (
        <Tag>Similarity: {imageData.similarity.toFixed(6)}</Tag>
      )}
    </>
  );
}
