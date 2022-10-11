import { HostedReport } from "@animaapp/scooby-shared";

export type ScoobyWebAPI = {
  getReports(params: CommitContext): Promise<HostedReport[]>;
  getReport(params: ReportContext): Promise<HostedReport>;
};

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
