import {
  CommitStatusOverview,
  HostedFidelityRegressionReport,
  HostedFidelityReport,
  HostedRegressionReport,
  HostedReport,
  LocalFidelityRegressionReport,
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
  postAggregateReview(context: CommitContext, review: Review): Promise<void>;

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
  uploadFidelityRegressionReport: (
    context: CommitContext,
    report: LocalFidelityRegressionReport
  ) => Promise<HostedFidelityRegressionReport>;

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
