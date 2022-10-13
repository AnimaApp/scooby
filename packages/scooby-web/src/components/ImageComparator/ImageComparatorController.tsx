import { useState } from "react";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { ImageComparator, PreferredMode } from "./ImageComparator";
import { Sentiment } from "@animaapp/scooby-shared";

type Props = {
  name: string;
  data: ImageData;
};

type BaseImageData = {
  tag?: string;
  sentiment?: Sentiment;
};
export type ImageData = BaseImageData &
  (
    | {
        type: "pair";
        expectedUrl: string;
        actualUrl: string;
        diffUrl: string;
        overlapUrl: string;
        similarity: number;
      }
    | {
        type: "new";
        newUrl: string;
      }
    | {
        type: "removed";
        removedUrl: string;
      }
  );

export const ImageComparatorController = (props: Props) => {
  const [mode, setMode] = useState<PreferredMode>("diff");

  useHotkeys("ArrowLeft", () => setMode("expected"));
  useHotkeys("ArrowRight", () => setMode("actual"));
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
