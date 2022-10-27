import React from "react";
import { PropsWithChildren } from "react";
import OriginalSplitPane, {
  SplitPaneProps,
  SplitPaneState,
} from "react-split-pane";

export class PatchedSplitPane extends React.Component<
  PropsWithChildren<SplitPaneProps>,
  SplitPaneState
> {}

export function SplitPane(props: PropsWithChildren<SplitPaneProps>) {
  return <OriginalSplitPane {...props}>{props.children}</OriginalSplitPane>;
}
