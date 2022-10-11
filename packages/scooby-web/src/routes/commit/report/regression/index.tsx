import {
  HostedRegressionTestEntry,
  HostedRegressionReport,
  HostedRegressionTestPair,
} from "@animaapp/scooby-shared";
import { useCallback, useMemo } from "react";
import { ImageEntry } from "../../../../components/ImageEntryList";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useUpdateParams } from "../../../hooks/useUpdateParams";
import { Action } from "./actions";
import { RegressionReport, RegressionReportState } from "./RegressionReport";

type Props = {
  report: HostedRegressionReport;
};

type QueryParams = {
  id?: string;
};

export function RegressionReportController({ report }: Props) {
  const listEntries: ImageEntry[] = useMemo(() => {
    return [
      ...report.results.changed
        .map(mapRegressionPairToImageEntry)
        .map((entry) => ({ ...entry, changed: true, tag: "changed" })),
      ...report.results.new
        .map(mapRegressionEntryToImageEntry)
        .map((entry) => ({ ...entry, changed: true, tag: "new" })),
      ...report.results.removed
        .map(mapRegressionEntryToImageEntry)
        .map((entry) => ({ ...entry, changed: true, tag: "removed" })),
      ...report.results.unchanged
        .map(mapRegressionPairToImageEntry)
        .map((entry) => ({ ...entry, changed: false, tag: "unchanged" })),
    ];
  }, [report.results]);

  const params = useQueryParams<QueryParams>();
  const state = useMemo(() => convertParamsToViewState(params), [params]);
  const { updateParams } = useUpdateParams();

  const handleAction = useCallback(
    (action: Action) => {
      if (action.type === "select-entry") {
        updateParams({ id: action.entry.id });
      }
    },
    [state]
  );

  return (
    <RegressionReport
      report={report}
      entries={listEntries}
      state={state}
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

function convertParamsToViewState(params: QueryParams): RegressionReportState {
  if (!params.id) {
    return {
      state: "summary",
    };
  }

  return {
    state: "selection",
    id: params.id,
  };
}
