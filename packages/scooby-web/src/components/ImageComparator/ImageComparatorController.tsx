import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { ImageComparator, PreferredMode } from "./ImageComparator";

type Props = {
  name: string;
  data: ImageData;
};

export type ImageData =
  | {
      type: "pair";
      expectedUrl: string;
      actualUrl: string;
      diffUrl: string;
      overlapUrl: string;
      similarity: number;
      changed: boolean;
    }
  | {
      type: "new";
      newUrl: string;
    }
  | {
      type: "removed";
      removedUrl: string;
    };

export const ImageComparatorController = (props: Props) => {
  const [mode, setMode] = useState<PreferredMode>("diff");

  useHotkeys("left", () => setMode("expected"));
  useHotkeys("right", () => setMode("actual"));
  useHotkeys("d", () => setMode("diff"));
  useHotkeys("o", () => setMode("overlap"));

  return (
    <ImageComparator
      name={props.name}
      imageData={props.data}
      mode={mode}
      onModeSelected={setMode}
    />
  );
};
