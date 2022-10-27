import {
  HostedResource,
  ImageRegressionReportResults,
} from "@animaapp/scooby-shared";
import { useMemo } from "react";
import ErrorPanel from "../../../../components/ErrorPanel";
import {
  ImageComparator,
  ImageData,
} from "../../../../components/ImageComparator";

type Props = {
  selectedId: string;
  results: ImageRegressionReportResults<HostedResource>;
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
  results: ImageRegressionReportResults<HostedResource>
): { imageData: ImageData; name: string } | undefined {
  const changed = results.changed.find((pair) => pair.actual.id === id);
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

  const unchanged = results.unchanged.find((pair) => pair.actual.id === id);
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

  const newEntry = results.new.find((entry) => entry.id === id);
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
