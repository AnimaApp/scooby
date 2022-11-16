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
        type: "triple";
        truthUrl: string;
        actualUrl: string;
        referenceUrl: string;
        fidelityDiffUrl: string;
        changesDiffUrl: string;
        fidelity: number;
      }
    | {
        type: "new";
        truthUrl: string;
        actualUrl: string;
        fidelity: number;
        fidelityDiffUrl: string;
      }
    | {
        type: "removed";
        removedUrl: string;
      }
  );

export const ImageComparatorController = (props: Props) => {
  const [mode, setMode] = useState<PreferredMode>("fidelity");

  useHotkeys("t", () => setMode("truth"));
  useHotkeys("a", () => setMode("actual"));
  useHotkeys("f", () => setMode("fidelity"));
  useHotkeys("c", () => setMode("changes"));
  useHotkeys("b", () => setMode("before"));

  return (
    <ImageComparator
      name={props.name}
      imageData={props.data}
      mode={mode}
      onModeSelected={setMode}
    />
  );
};
