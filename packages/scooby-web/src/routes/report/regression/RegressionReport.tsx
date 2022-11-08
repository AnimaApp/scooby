import {
  RegressionReport,
  HostedRegressionReport,
} from "@animaapp/scooby-shared";
import { EntryList } from "../../../components/EntryList";
import { VerticalSplitPane } from "../../../components/SplitPane";
import { Entry } from "../../../types";
import { Action } from "./actions";
import { ComparisonView } from "./comparison";
import { DetailsView } from "./details";

type Props = {
  report: HostedRegressionReport;
  entries: Entry[];
  selectedId?: string;
  dispatchAction: (action: Action) => void;
};

export function RegressionReport({
  report,
  entries,
  selectedId,
  dispatchAction,
}: Props) {
  const handleEntrySelected = (entry: Entry) => {
    dispatchAction({ type: "select-entry", entry });
  };

  return (
    <div style={{ height: "100%", display: "flex", alignItems: "stretch" }}>
      <VerticalSplitPane
        left={
          <EntryList
            entries={entries}
            selectedEntryId={selectedId}
            onEntrySelected={handleEntrySelected}
          />
        }
        center={<ComparisonView report={report} selectedId={selectedId} />}
        right={<DetailsView report={report} selectedId={selectedId} />}
      />
    </div>
  );
}
