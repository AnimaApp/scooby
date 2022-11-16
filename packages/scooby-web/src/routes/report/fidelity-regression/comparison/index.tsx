import { HostedFidelityRegressionReport } from "@animaapp/scooby-shared";
import ErrorPanel from "../../../../components/ErrorPanel";
import { ImageComparisonView } from "./ImageComparisonView";

type Props = {
  selectedId: string | undefined;
  report: HostedFidelityRegressionReport;
};

export const ComparisonView = ({ selectedId, report }: Props) => {
  if (!selectedId) {
    return <h3>Select an entry to get started</h3>;
  }

  if (report.results.type === "image") {
    return (
      <ImageComparisonView results={report.results} selectedId={selectedId} />
    );
  } else if (report.results.type === "code") {
    return (
      <p>
        The Fidelity-Regression code view has not yet been implemented, please
        reach out to the Core team if you need it.
      </p>
    );
  }

  return (
    <ErrorPanel
      //@ts-ignore
      message={`Unable to show comparison, as there is no handler registered for type: '${report.results.type}'`}
    />
  );
};
