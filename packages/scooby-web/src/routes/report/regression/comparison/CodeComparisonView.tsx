import {
  HostedResource,
  CodeRegressionReportResults,
} from "@animaapp/scooby-shared";
import { useMemo } from "react";
import ErrorPanel from "../../../../components/ErrorPanel";
import {
  CodeComparator,
  CodeData,
} from "../../../../components/CodeComparator";

type Props = {
  selectedId: string;
  results: CodeRegressionReportResults<HostedResource>;
};

export const CodeComparisonView = ({ selectedId, results }: Props) => {
  const selectedItem = useMemo(
    () => getCodeDataById(selectedId, results),
    [selectedId, results]
  );

  if (!selectedItem) {
    return (
      <ErrorPanel
        message={`Could not find code entry with id: '${selectedId}'`}
      />
    );
  }

  return (
    <CodeComparator name={selectedItem.name} data={selectedItem.codeData} />
  );
};

function getCodeDataById(
  id: string,
  results: CodeRegressionReportResults<HostedResource>
): { codeData: CodeData; name: string } | undefined {
  const changed = results.changed.find((pair) => pair.actual.id === id);
  if (changed) {
    return {
      name: changed.actual.id,
      codeData: {
        type: "pair",
        tag: "changed",
        sentiment: "danger",
        actualUrl: changed.actual.code.url,
        expectedUrl: changed.expected.code.url,
        rawDiffUrl: changed.comparison.diff?.url,
        similarity: changed.comparison.similarity,
      },
    };
  }

  const unchanged = results.unchanged.find((pair) => pair.actual.id === id);
  if (unchanged) {
    return {
      name: unchanged.actual.id,
      codeData: {
        type: "pair",
        tag: "unchanged",
        sentiment: "success",
        actualUrl: unchanged.actual.code.url,
        expectedUrl: unchanged.expected.code.url,
        rawDiffUrl: unchanged.comparison.diff?.url,
        similarity: unchanged.comparison.similarity,
      },
    };
  }

  const newEntry = results.new.find((entry) => entry.id === id);
  if (newEntry) {
    return {
      name: newEntry.id,
      codeData: {
        type: "new",
        newUrl: newEntry.code.url,
        tag: "new",
        sentiment: "danger",
      },
    };
  }

  const removed = results.removed.find((entry) => entry.id === id);
  if (removed) {
    return {
      name: removed.id,
      codeData: {
        type: "removed",
        removedUrl: removed.code.url,
        tag: "removed",
        sentiment: "danger",
      },
    };
  }
}
