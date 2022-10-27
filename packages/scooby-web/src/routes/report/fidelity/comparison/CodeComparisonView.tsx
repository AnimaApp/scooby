import { HostedResource, CodeFidelityTestPair } from "@animaapp/scooby-shared";
import { useMemo } from "react";
import { CodeComparator } from "../../../../components/CodeComparator";

type Props = {
  pair: CodeFidelityTestPair<HostedResource>;
};

export const CodeComparisonView = ({ pair }: Props) => {
  const codeData = useMemo(
    () =>
      ({
        type: "pair",
        similarity: pair.comparison.similarity,
        actualUrl: pair.actual.code.url,
        expectedUrl: pair.expected.code.url,
        rawDiffUrl: pair.comparison.diff?.url,
      } as const),
    [pair]
  );

  return <CodeComparator name={pair.actual.id} data={codeData} />;
};
