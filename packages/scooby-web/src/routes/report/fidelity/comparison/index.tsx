import {
  HostedFidelityReport,
  HostedFidelityTestPair,
} from "@animaapp/scooby-shared";
import { useMemo } from "react";
import ErrorPanel from "../../../../components/ErrorPanel";
import { CodeComparisonView } from "./CodeComparisonView";
import { ImageComparisonView } from "./ImageComparisonView";

type Props = {
  selectedId: string | undefined;
  report: HostedFidelityReport;
};

export const ComparisonView = ({ selectedId, report }: Props) => {
  const selectedPair = useMemo(
    () => (selectedId ? getPairById(selectedId, report) : undefined),
    [selectedId, report]
  );

  if (!selectedId) {
    return <h3>Select an entry to get started</h3>;
  }

  if (!selectedPair) {
    return (
      <ErrorPanel message={`Could not find an entry with id '${selectedId}'`} />
    );
  }

  if (selectedPair.type === "image") {
    return <ImageComparisonView pair={selectedPair} />;
  } else if (selectedPair.type === "code") {
    return <CodeComparisonView pair={selectedPair} />;
  }

  return (
    <ErrorPanel
      //@ts-ignore
      message={`Unable to show comparison, as there is no handler registered for type: '${selectedPair.type}'`}
    />
  );
};

function getPairById(
  id: string,
  report: HostedFidelityReport
): HostedFidelityTestPair | undefined {
  return report.pairs.find((pair) => pair.actual.id === id);
}
