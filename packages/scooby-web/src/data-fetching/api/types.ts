import {
  CommitStatusOverview,
  HostedReport,
  Review,
} from "@animaapp/scooby-shared";

export type ReadScoobyWebAPI = {
  getReports(params: CommitContext): Promise<ReportId[]>;
  getReport(params: ReportContext): Promise<HostedReport>;
  getCommitStatusOverview(
    params: CommitContext
  ): Promise<CommitStatusOverview | undefined>;
  getAggregateReview(params: CommitContext): Promise<Review | undefined>;
};

export type ReviewScoobyWebAPI = {
  approveReport(params: ReportContext): Promise<void>;
};

export type ScoobyWebAPI = ReadScoobyWebAPI & ReviewScoobyWebAPI;

export type ReportId = string;

export type CommitContext = {
  repository: string;
  commit: string;
};

export type ReportContext = CommitContext & {
  reportName: string;
};

export type APIRequest = keyof ScoobyWebAPI;
export type APIRequestParams<TRequest extends APIRequest> = Parameters<
  ScoobyWebAPI[TRequest]
>[0];
export type APIResponse<TRequest extends APIRequest> = Awaited<
  ReturnType<ScoobyWebAPI[TRequest]>
>;
