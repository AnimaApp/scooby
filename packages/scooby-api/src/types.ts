import {
  CommitStatusOverview,
  HostedFidelityReport,
  HostedRegressionReport,
  HostedReport,
  LocalFidelityReport,
  LocalRegressionReport,
  Review,
} from "@animaapp/scooby-shared";

export type ScoobyAPI = {
  getReports(params: CommitContext): Promise<ReportId[]>;
  getReport(params: ReportContext): Promise<HostedReport>;

  getReview(params: CommitContext): Promise<Review | undefined>;
  postReview(
    context: CommitContext,
    review: Review,
    options?: PostReviewOptions
  ): Promise<void>;

  postCommitStatusOverview(
    params: CommitContext,
    overview: CommitStatusOverview
  ): Promise<void>;

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

export type PostReviewOptions = {
  // If true, avoid merging reviews and override it directly
  overwriteExisting?: boolean;
};

export type ReportId = string;
