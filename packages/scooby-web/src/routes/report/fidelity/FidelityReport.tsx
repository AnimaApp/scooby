import { HostedFidelityReport } from "@animaapp/scooby-shared";
import ErrorPanel from "../../../components/ErrorPanel";
import {
  ImageComparator,
  ImageData,
} from "../../../components/ImageComparator";
import { ImageEntry, ImageEntryList } from "../../../components/ImageEntryList";
import { Action } from "./actions";

type Props = {
  report: HostedFidelityReport;
  entries: ImageEntry[];
  selectedId?: string;
  dispatchAction: (action: Action) => void;
};

export function FidelityReport({
  report,
  entries,
  selectedId,
  dispatchAction,
}: Props) {
  function renderView() {
    if (!selectedId) {
      return <h3>Select an image to get started</h3>;
    }

    const data = getImageDataById(selectedId, report);
    if (!data) {
      return (
        <ErrorPanel message={`Could not find entry with id ${selectedId}`} />
      );
    }
    return <ImageComparator name={data.name} data={data.imageData} />;
  }

  const handleEntrySelected = (entry: ImageEntry) => {
    dispatchAction({ type: "select-entry", entry });
  };

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "stretch" }}>
      <div style={{ display: "flex", height: "calc(100vh - 170px)" }}>
        <ImageEntryList
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
        {renderView()}
      </div>
    </div>
  );
}

function getImageDataById(
  id: string,
  report: HostedFidelityReport
): { imageData: ImageData; name: string } | undefined {
  const pair = report.pairs.find((pair) => pair.actual.id === id);
  if (pair) {
    return {
      name: pair.actual.id,
      imageData: {
        type: "pair",
        actualUrl: pair.actual.image.url,
        expectedUrl: pair.expected.image.url,
        diffUrl: pair.comparison.diff.url,
        overlapUrl: pair.comparison.overlap.url,
        similarity: pair.comparison.similarity,
      },
    };
  }
}
