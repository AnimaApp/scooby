import { useMemo, useState } from "react";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { CodeComparator, PreferredMode } from "./CodeComparator";
import { Sentiment } from "@animaapp/scooby-shared";
import { useSources } from "./useSource";
import Loader from "../Loader";
import ErrorPanel from "../ErrorPanel";

type Props = {
  name: string;
  data: CodeData;
};

type BaseCodeData = {
  tag?: string;
  sentiment?: Sentiment;
};
export type CodeData = BaseCodeData &
  (
    | {
        type: "pair";
        similarity: number;
        expectedUrl: string;
        actualUrl: string;
        rawDiffUrl?: string;
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

export const CodeComparatorController = (props: Props) => {
  const [mode, setMode] = useState<PreferredMode>(
    props.data.type === "pair"
      ? "diff"
      : props.data.type === "new"
      ? "actual"
      : "expected"
  );

  const sourcesUrls = useMemo(() => {
    if (props.data.type === "new") {
      return { actualUrl: props.data.newUrl };
    } else if (props.data.type === "removed") {
      return { expectedUrl: props.data.removedUrl };
    } else {
      return {
        expectedUrl: props.data.expectedUrl,
        actualUrl: props.data.actualUrl,
        diffUrl: props.data.rawDiffUrl,
      };
    }
  }, [props.data]);

  const { sources, isLoading, error } = useSources(sourcesUrls);

  useHotkeys("ArrowLeft", () => setMode("expected"));
  useHotkeys("ArrowRight", () => setMode("actual"));
  useHotkeys("d", () => setMode("diff"));
  useHotkeys("o", () => setMode("raw_diff"));

  if (isLoading) {
    return <Loader />;
  }

  if (error || !sources) {
    return <ErrorPanel message={`Unable to load code: ${error}`} />;
  }

  return (
    <CodeComparator
      name={props.name}
      data={props.data}
      sources={sources}
      mode={mode}
      onModeSelected={setMode}
    />
  );
};
