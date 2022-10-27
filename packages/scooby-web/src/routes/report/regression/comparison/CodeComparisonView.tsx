import { HostedResource, CodeFidelityTestPair } from "@animaapp/scooby-shared";
import { useMemo } from "react";
// import { CodeComparator } from "../../../../components/CodeComparator";

type Props = {
  pair: CodeFidelityTestPair<HostedResource>;
};

export const CodeComparisonView = ({ pair }: Props) => {
  return <h1>TODO</h1>;
  // const imageData = useMemo(
  //   () =>
  //     ({
  //       type: "pair",
  //       actualUrl: pair.actual.image.url,
  //       expectedUrl: pair.expected.image.url,
  //       diffUrl: pair.comparison.diff.url,
  //       overlapUrl: pair.comparison.overlap.url,
  //       similarity: pair.comparison.similarity,
  //     } as const),
  //   [pair]
  // );

  return <CodeComparator name={pair.actual.id} data={imageData} />;
};
