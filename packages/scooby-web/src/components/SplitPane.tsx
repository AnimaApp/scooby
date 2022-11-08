import React from "react";
import Split from "react-split";

type Props = {
  left?: React.ReactNode;
  center: React.ReactNode;
  right?: React.ReactNode;
};

export function VerticalSplitPane({ left, center, right }: Props) {
  function getChildren() {
    if (left && center && right) {
      return [left, center, right];
    } else if (left && center) {
      return [left, center];
    } else if (center && right) {
      return [center, right];
    } else {
      return [center];
    }
  }

  function getSizes() {
    if (left && center && right) {
      return [15, 70, 15];
    } else if (left && center) {
      return [20, 80];
    } else if (center && right) {
      return [80, 20];
    } else {
      return [100];
    }
  }

  function getMinSizes() {
    if (left && center && right) {
      return [150, 500, 50];
    } else if (left && center) {
      return [150, 500];
    } else if (center && right) {
      return [500, 150];
    } else {
      return [500];
    }
  }

  return (
    <Split
      style={{ width: "100%" }}
      className="split"
      minSize={getMinSizes()}
      sizes={getSizes()}
      children={getChildren().map((child) => (
        <div>{child}</div>
      ))}
      elementStyle={(dimension, size, gutterSize) => ({
        width: "calc(" + size + "vw - " + gutterSize + "px)",
      })}
    />
  );
}
