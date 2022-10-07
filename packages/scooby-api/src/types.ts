import {
  HostedRegressionReport,
  LocalRegressionReport,
} from "@animaapp/scooby-types";

export type ScoobyAPI = {
  uploadRegressionReport: (
    context: UploadReportContext,
    report: LocalRegressionReport
  ) => Promise<HostedRegressionReport>;
};

export type UploadReportContext = {
  commitHash: string;
};
