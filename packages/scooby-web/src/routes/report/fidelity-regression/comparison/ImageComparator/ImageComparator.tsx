import {
  DiffOutlined,
  FieldTimeOutlined,
  PictureOutlined,
  StarOutlined,
  StepBackwardOutlined,
} from "@ant-design/icons";
import { Button, Card, Tag, Tooltip, Image, Spin } from "antd";
import { ReactNode } from "react";
import { getColorForSentiment } from "../../../../../utils/colors";
import { ImageData } from "./ImageComparatorController";

type Props = {
  name: string;
  imageData: ImageData;
  mode: PreferredMode;
  onModeSelected: (mode: PreferredMode) => void;
};

export type PreferredMode =
  | "truth"
  | "actual"
  | "fidelity"
  | "changes"
  | "before";

export const ImageComparator = (props: Props) => {
  function getImageSource() {
    if (props.imageData.type === "new") {
      if (props.mode === "truth") {
        return props.imageData.truthUrl;
      } else if (props.mode === "actual") {
        return props.imageData.actualUrl;
      } else if (props.mode === "fidelity") {
        return props.imageData.fidelityDiffUrl;
      }
    } else if (props.imageData.type === "removed") {
      return props.imageData.removedUrl;
    } else {
      if (props.mode === "before") {
        return props.imageData.referenceUrl;
      } else if (props.mode === "truth") {
        return props.imageData.truthUrl;
      } else if (props.mode === "actual") {
        return props.imageData.actualUrl;
      } else if (props.mode === "changes") {
        return props.imageData.changesDiffUrl;
      } else if (props.mode === "fidelity") {
        return props.imageData.fidelityDiffUrl;
      }
    }
  }

  function getImageSources() {
    if (props.imageData.type === "new") {
      return [
        props.imageData.actualUrl,
        props.imageData.truthUrl,
        props.imageData.fidelityDiffUrl,
      ];
    } else if (props.imageData.type === "removed") {
      return [props.imageData.removedUrl];
    } else {
      return [
        props.imageData.actualUrl,
        props.imageData.truthUrl,
        props.imageData.fidelityDiffUrl,
        props.imageData.changesDiffUrl,
        props.imageData.referenceUrl,
      ];
    }
  }

  function getImages() {
    return [...new Set(getImageSources())].map((source) => {
      const displayStyle = getImageSource() === source ? undefined : "none";
      return (
        <Image
          key={source}
          style={{
            maxWidth: "80vw",
            display: displayStyle,
          }}
          src={source}
          placeholder={<Spin style={{ display: displayStyle }} />}
        />
      );
    });
  }

  return (
    <Card
      title={getTitle(props.name, props.imageData)}
      size="small"
      extra={
        <div style={{ display: "flex", gap: 4 }}>
          <Tooltip title="(t) Show the 'source of truth' image used to calculate the fidelity">
            <Button
              disabled={props.imageData.type === "removed"}
              type={props.mode === "truth" ? "primary" : "default"}
              onClick={() => props.onModeSelected("truth")}
            >
              <StarOutlined /> Truth
            </Button>
          </Tooltip>
          <Tooltip title="(a) Show actual image, the one produced by this test run">
            <Button
              disabled={props.imageData.type === "removed"}
              type={props.mode === "actual" ? "primary" : "default"}
              onClick={() => props.onModeSelected("actual")}
            >
              <PictureOutlined /> Actual
            </Button>
          </Tooltip>
          <Tooltip title="(f) Show the Fidelity diff between the source of truth and the actual image">
            <Button
              disabled={props.imageData.type === "removed"}
              type={props.mode === "fidelity" ? "primary" : "default"}
              onClick={() => props.onModeSelected("fidelity")}
            >
              <DiffOutlined /> Fidelity
            </Button>
          </Tooltip>
          <Tooltip title="(c) Show the Changes (regression) diff between the reference image (the one on main) and the actual image">
            <Button
              disabled={
                props.imageData.type === "removed" ||
                props.imageData.type === "new"
              }
              type={props.mode === "changes" ? "primary" : "default"}
              onClick={() => props.onModeSelected("changes")}
            >
              <FieldTimeOutlined /> Changes
            </Button>
          </Tooltip>
          <Tooltip title="(b) Show the reference image (the one on main) against which the 'actual' image is compared to find regressions">
            <Button
              disabled={props.imageData.type === "new"}
              type={props.mode === "before" ? "primary" : "default"}
              onClick={() => props.onModeSelected("before")}
            >
              <StepBackwardOutlined /> Before
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
      {getImages()}
    </Card>
  );
};

function getTitle(name: string, imageData: ImageData): ReactNode {
  return (
    <div style={{ display: "flex", maxWidth: 600 }}>
      <Tooltip title={name}>
        <span
          style={{
            marginRight: 8,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {name}
        </span>
      </Tooltip>
      {imageData.tag && (
        <Tag
          color={
            imageData.sentiment
              ? getColorForSentiment(imageData.sentiment)
              : undefined
          }
        >
          {imageData.tag}
        </Tag>
      )}
      {"fidelity" in imageData && (
        <Tag>Fidelity: {imageData.fidelity.toFixed(6)}</Tag>
      )}
    </div>
  );
}
