import {
  HostedFidelityReport,
  HostedRegressionReport,
  HostedReport,
  LocalFidelityReport,
  LocalRegressionReport,
} from "@animaapp/scooby-shared";

export type ScoobyAPI = {
  getReports(params: CommitContext): Promise<ReportId[]>;
  getReport(params: ReportContext): Promise<HostedReport>;

  uploadRegressionReport: (
    context: CommitContext,
    report: LocalRegressionReport
  ) => Promise<HostedRegressionReport>;
  uploadFidelityReport: (
    context: CommitContext,
    report: LocalFidelityReport
  ) => Promise<HostedFidelityReport>;

  uploadSnapshotArchive: (
    context: SnapshotContext,
    archivePath: string
  ) => Promise<void>;
  downloadSnapshotArchive: (
    context: SnapshotContext,
    targetArchivePath: string
  ) => Promise<boolean>;
};

export type CommitContext = {
  commitHash: string;
};

export type ReportContext = {
  commitHash: string;
  reportName: string;
};

export type SnapshotContext = {
  commitHash: string;
  snapshotName: string;
};

export type ReportId = string;
