import {
  HostedRegressionReport,
  LocalRegressionReport,
} from "@animaapp/scooby-shared";

export type ScoobyAPI = {
  uploadRegressionReport: (
    context: UploadReportContext,
    report: LocalRegressionReport
  ) => Promise<HostedRegressionReport>;

  uploadSnapshotArchive: (
    context: SnapshotContext,
    archivePath: string
  ) => Promise<void>;
  downloadSnapshotArchive: (
    context: SnapshotContext,
    targetArchivePath: string
  ) => Promise<boolean>;
};

export type UploadReportContext = {
  commitHash: string;
};

export type UploadReportResourceContext = {
  commitHash: string;
  reportName: string;
};

export type SnapshotContext = {
  commitHash: string;
  snapshotName: string;
};
