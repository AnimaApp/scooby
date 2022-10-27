import { HostedFidelityReport } from "@animaapp/scooby-shared";
import { EntryList } from "../../../components/EntryList";
import { VerticalSplitPane } from "../../../components/SplitPane";
import { Entry } from "../../../types";
import { Action } from "./actions";
import { ComparisonView } from "./comparison";

type Props = {
  report: HostedFidelityReport;
  entries: Entry[];
  selectedId?: string;
  dispatchAction: (action: Action) => void;
};

export function FidelityReport({
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
      <VerticalSplitPane>
        <EntryList
          entries={entries}
          selectedEntryId={selectedId}
          onEntrySelected={handleEntrySelected}
        />
        <ComparisonView report={report} selectedId={selectedId} />
      </VerticalSplitPane>
    </div>
  );
}
