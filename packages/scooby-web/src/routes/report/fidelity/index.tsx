import {
  HostedFidelityReport,
  HostedFidelityTestPair,
  Sentiment,
} from "@animaapp/scooby-shared";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { useCallback, useEffect, useMemo } from "react";
import { ImageEntry } from "../../../components/ImageEntryList";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useUpdateParams } from "../../hooks/useUpdateParams";
import { Action } from "./actions";
import { FidelityReport } from "./FidelityReport";

type Props = {
  report: HostedFidelityReport;
};

type QueryParams = {
  id?: string;
};

export function FidelityReportController({ report }: Props) {
  const sortedPairs = useMemo(() => {
    const sortedPairs = [...report.pairs];
    sortedPairs.sort(
      (a, b) => a.comparison.similarity - b.comparison.similarity
    );
    return sortedPairs;
  }, [report.pairs]);

  const entries: ImageEntry[] = useMemo(() => {
    return sortedPairs.map(mapFidelityPairToImageEntry);
  }, [sortedPairs]);

  const params = useQueryParams<QueryParams>();
  const selectedId = params.id;
  const { updateParams } = useUpdateParams();

  const handleAction = useCallback(
    (action: Action) => {
      if (action.type === "select-entry") {
        updateParams({ id: action.entry.id });
      }
    },
    [params]
  );

  useEffect(() => {
    if (!params.id) {
      const firstId = findFirstId(sortedPairs);
      updateParams({ id: firstId });
    }
  }, [params.id]);

  useHotkeys("ArrowDown", (event) => {
    event.preventDefault();
    const currentIndex = entries.findIndex((entry) => entry.id === selectedId);
    const nextIndex = currentIndex + 1;
    const nextEntry = entries[nextIndex];
    if (nextEntry) {
      handleAction({ type: "select-entry", entry: nextEntry });
    }
  });

  useHotkeys("ArrowUp", (event) => {
    event.preventDefault();
    const currentIndex = entries.findIndex((entry) => entry.id === selectedId);
    const prevIndex = currentIndex - 1;
    const prevEntry = entries[prevIndex];
    if (prevEntry) {
      handleAction({ type: "select-entry", entry: prevEntry });
    }
  });

  return (
    <FidelityReport
      report={report}
      entries={entries}
      selectedId={selectedId}
      dispatchAction={handleAction}
    />
  );
}

function mapFidelityPairToImageEntry(pair: HostedFidelityTestPair): ImageEntry {
  let sentiment: Sentiment = "success";
  if (pair.comparison.similarity < 0.5) {
    sentiment = "danger";
  } else if (pair.comparison.similarity < 1) {
    sentiment = "warning";
  }

  return {
    id: pair.actual.id,
    thumbnailUrl:
      pair.comparison.similarity === 1
        ? pair.comparison.normalizedActual.url
        : pair.comparison.diff.url,
    sentiment,
    tag: pair.comparison.similarity.toFixed(6),
  };
}

function findFirstId(pairs: HostedFidelityTestPair[]): string {
  const firstId = pairs?.[0];
  if (firstId) {
    return firstId.actual.id;
  }

  throw new Error("this report has no entry");
}
