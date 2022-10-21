import { HostedFidelityReport, Review } from "@animaapp/scooby-shared";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { useCallback, useEffect, useMemo } from "react";
import { ImageEntry } from "../../../components/ImageEntryList";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useUpdateParams } from "../../hooks/useUpdateParams";
import { Action } from "./actions";
import { generateImageEntries } from "./entries";
import { FidelityReport } from "./FidelityReport";

type Props = {
  report: HostedFidelityReport;
  review: Review | undefined;
};

type QueryParams = {
  id?: string;
};

export function FidelityReportController({ report, review }: Props) {
  const entries: ImageEntry[] = useMemo(() => {
    return generateImageEntries(report, review);
  }, [report, review]);

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
    if (!params.id && entries.length) {
      const firstId = findFirstId(entries);
      updateParams({ id: firstId });
    }
  }, [params.id, entries]);

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

function findFirstId(entries: ImageEntry[]): string {
  const firstId = entries?.[0];
  if (firstId) {
    return firstId.id;
  }

  throw new Error("this report has no entry");
}
