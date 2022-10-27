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

export function VerticalSplitPane(props: PropsWithChildren<SplitPaneProps>) {
  return (
    // @ts-ignore
    <OriginalSplitPane
      style={{ flex: 1, height: undefined, position: undefined }}
      minSize={200}
      {...props}
    >
      {props.children}
    </OriginalSplitPane>
  );
}
