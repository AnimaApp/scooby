import {
  HostedResource,
  ImageFidelityRegressionReportResults,
} from "@animaapp/scooby-shared";
import { useMemo } from "react";
import ErrorPanel from "../../../../components/ErrorPanel";
import { ImageComparator, ImageData } from "./ImageComparator";

type Props = {
  selectedId: string;
  results: ImageFidelityRegressionReportResults<HostedResource>;
};

export const ImageComparisonView = ({ selectedId, results }: Props) => {
  const selectedItem = useMemo(
    () => getImageDataById(selectedId, results),
    [selectedId, results]
  );

  if (!selectedItem) {
    return (
      <ErrorPanel
        message={`Could not find image entry with id: '${selectedId}'`}
      />
    );
  }

  return (
    <ImageComparator name={selectedItem.name} data={selectedItem.imageData} />
  );
};

function getImageDataById(
  id: string,
  results: ImageFidelityRegressionReportResults<HostedResource>
): { imageData: ImageData; name: string } | undefined {
  const changed = results.changed.find((pair) => pair.actual.id === id);
  if (changed) {
    return {
      name: changed.actual.id,
      imageData: {
        type: "triple",
        tag: "changed",
        sentiment: "danger",
        actualUrl: changed.actual.image.url,
        truthUrl: changed.expected.image.url,
        referenceUrl: changed.reference.image.url,
        fidelity: changed.fidelityComparison.similarity,
        changesDiffUrl: changed.regressionComparison.diff.url,
        fidelityDiffUrl: changed.fidelityComparison.diff.url,
      },
    };
  }

  const unchanged = results.unchanged.find((pair) => pair.actual.id === id);
  if (unchanged) {
    return {
      name: unchanged.actual.id,
      imageData: {
        type: "triple",
        tag: "unchanged",
        sentiment: "success",
        actualUrl: unchanged.actual.image.url,
        truthUrl: unchanged.expected.image.url,
        referenceUrl: unchanged.reference.image.url,
        fidelity: unchanged.fidelityComparison.similarity,
        changesDiffUrl: unchanged.regressionComparison.diff.url,
        fidelityDiffUrl: unchanged.fidelityComparison.diff.url,
      },
    };
  }

  const newEntry = results.new.find((entry) => entry.actual.id === id);
  if (newEntry) {
    return {
      name: newEntry.actual.id,
      imageData: {
        type: "new",
        actualUrl: newEntry.actual.image.url,
        truthUrl: newEntry.expected.image.url,
        fidelity: newEntry.fidelityComparison.similarity,
        fidelityDiffUrl: newEntry.fidelityComparison.diff.url,
        tag: "new",
        sentiment: "danger",
      },
    };
  }

  const removed = results.removed.find((entry) => entry.id === id);
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
