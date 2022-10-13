import {
  HostedRegressionTestEntry,
  HostedRegressionReport,
  HostedRegressionTestPair,
} from "@animaapp/scooby-shared";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { useCallback, useEffect, useMemo } from "react";
import { ImageEntry } from "../../../components/ImageEntryList";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useUpdateParams } from "../../hooks/useUpdateParams";
import { Action } from "./actions";
import { RegressionReport } from "./RegressionReport";

type Props = {
  report: HostedRegressionReport;
};

type QueryParams = {
  id?: string;
};

export function RegressionReportController({ report }: Props) {
  const entries: ImageEntry[] = useMemo(() => {
    return [
      ...report.results.changed
        .map(mapRegressionPairToImageEntry)
        .map(
          (entry) =>
            ({ ...entry, sentiment: "danger", tag: "changed" } as const)
        ),
      ...report.results.new
        .map(mapRegressionEntryToImageEntry)
        .map(
          (entry) => ({ ...entry, sentiment: "danger", tag: "new" } as const)
        ),
      ...report.results.removed
        .map(mapRegressionEntryToImageEntry)
        .map(
          (entry) =>
            ({ ...entry, sentiment: "danger", tag: "removed" } as const)
        ),
      ...report.results.unchanged
        .map(mapRegressionPairToImageEntry)
        .map(
          (entry) =>
            ({ ...entry, sentiment: "success", tag: "unchanged" } as const)
        ),
    ];
  }, [report.results]);

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
      const firstId = findFirstId(report);
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
    <RegressionReport
      report={report}
      entries={entries}
      selectedId={selectedId}
      dispatchAction={handleAction}
    />
  );
}

function mapRegressionEntryToImageEntry(
  entry: HostedRegressionTestEntry
): ImageEntry {
  return {
    id: entry.id,
    thumbnailUrl: entry.image.url,
  };
}

function mapRegressionPairToImageEntry(
  pair: HostedRegressionTestPair
): ImageEntry {
  return {
    id: pair.actual.id,
    thumbnailUrl: pair.comparison.diff.url,
  };
}

function findFirstId(report: HostedRegressionReport): string {
  const changedFirstId = report.results.changed?.[0];
  if (changedFirstId) {
    return changedFirstId.actual.id;
  }
  const newFirstId = report.results.new?.[0];
  if (newFirstId) {
    return newFirstId.id;
  }
  const removedFirstId = report.results.removed?.[0];
  if (removedFirstId) {
    return removedFirstId.id;
  }
  const unchangedFirstId = report.results.unchanged?.[0];
  if (unchangedFirstId) {
    return unchangedFirstId.actual.id;
  }

  throw new Error("this report has no entry");
}
