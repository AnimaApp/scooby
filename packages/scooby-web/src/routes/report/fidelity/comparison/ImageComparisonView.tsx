import { HostedResource, ImageFidelityTestPair } from "@animaapp/scooby-shared";
import { useMemo } from "react";
import { ImageComparator } from "../../../../components/ImageComparator";

type Props = {
  pair: ImageFidelityTestPair<HostedResource>;
};

export const ImageComparisonView = ({ pair }: Props) => {
  const imageData = useMemo(
    () =>
      ({
        type: "pair",
        actualUrl: pair.actual.image.url,
        expectedUrl: pair.expected.image.url,
        diffUrl: pair.comparison.diff.url,
        overlapUrl: pair.comparison.overlap.url,
        similarity: pair.comparison.similarity,
      } as const),
    [pair]
  );

  return <ImageComparator name={pair.actual.id} data={imageData} />;
};
