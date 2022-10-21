import { HostedRegressionReport, Review } from "@animaapp/scooby-shared";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { useCallback, useEffect, useMemo } from "react";
import { ImageEntry } from "../../../components/ImageEntryList";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useUpdateParams } from "../../hooks/useUpdateParams";
import { Action } from "./actions";
import { generateImageEntries } from "./entries";
import { RegressionReport } from "./RegressionReport";

type Props = {
  report: HostedRegressionReport;
  review: Review | undefined;
};

type QueryParams = {
  id?: string;
};

export function RegressionReportController({ report, review }: Props) {
  const entries: ImageEntry[] = useMemo(
    () => generateImageEntries(report, review),
    [report, review]
  );

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
