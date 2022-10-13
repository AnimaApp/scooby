import {
  RegressionReport,
  HostedRegressionReport,
} from "@animaapp/scooby-shared";
import ErrorPanel from "../../../components/ErrorPanel";
import {
  ImageComparator,
  ImageData,
} from "../../../components/ImageComparator";
import { ImageEntry, ImageEntryList } from "../../../components/ImageEntryList";
import { Action } from "./actions";

type Props = {
  report: HostedRegressionReport;
  entries: ImageEntry[];
  selectedId?: string;
  dispatchAction: (action: Action) => void;
};

export function RegressionReport({
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
  report: HostedRegressionReport
): { imageData: ImageData; name: string } | undefined {
  const changed = report.results.changed.find((pair) => pair.actual.id === id);
  if (changed) {
    return {
      name: changed.actual.id,
      imageData: {
        type: "pair",
        tag: "changed",
        sentiment: "danger",
        actualUrl: changed.actual.image.url,
        expectedUrl: changed.expected.image.url,
        diffUrl: changed.comparison.diff.url,
        overlapUrl: changed.comparison.overlap.url,
        similarity: changed.comparison.similarity,
      },
    };
  }

  const unchanged = report.results.unchanged.find(
    (pair) => pair.actual.id === id
  );
  if (unchanged) {
    return {
      name: unchanged.actual.id,
      imageData: {
        type: "pair",
        tag: "unchanged",
        sentiment: "success",
        actualUrl: unchanged.actual.image.url,
        expectedUrl: unchanged.expected.image.url,
        diffUrl: unchanged.comparison.diff.url,
        overlapUrl: unchanged.comparison.overlap.url,
        similarity: unchanged.comparison.similarity,
      },
    };
  }

  const newEntry = report.results.new.find((entry) => entry.id === id);
  if (newEntry) {
    return {
      name: newEntry.id,
      imageData: {
        type: "new",
        newUrl: newEntry.image.url,
        tag: "new",
        sentiment: "danger",
      },
    };
  }

  const removed = report.results.removed.find((entry) => entry.id === id);
  if (removed) {
    return {
      name: removed.id,
      imageData: {
        type: "removed",
        removedUrl: removed.image.url,
        tag: "removed",
        sentiment: "danger",
      },
    };
  }
}
