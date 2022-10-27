import { HostedFidelityReport } from "@animaapp/scooby-shared";
import { EntryList } from "../../../components/EntryList";
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
    <div style={{ flex: 1, display: "flex", alignItems: "stretch" }}>
      <div style={{ display: "flex", height: "calc(100vh - 170px)" }}>
        <EntryList
          entries={entries}
          selectedEntryId={selectedId}
          onEntrySelected={handleEntrySelected}
        />
      </div>
      <div
        style={{
          flex: 1,
          marginLeft: 8,
          marginRight: 8,
          height: "calc(100vh - 170px)",
        }}
      >
        <ComparisonView report={report} selectedId={selectedId} />
      </div>
    </div>
  );
}
