import { HostedRegressionReport } from "@animaapp/scooby-shared";
import ErrorPanel from "../../../../components/ErrorPanel";
import { ImageComparisonView } from "./ImageComparisonView";

type Props = {
  selectedId: string | undefined;
  report: HostedRegressionReport;
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
    // TODO
    // return (
    //   <ImageComparisonView results={report.results} selectedId={selectedId} />
    // );
  }

  return (
    <ErrorPanel
      //@ts-ignore
      message={`Unable to show comparison, as there is no handler registered for type: '${report.results.type}'`}
    />
  );
};
