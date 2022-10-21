import {
  HostedReport,
  CommitStatusOverview,
  Review,
} from "@animaapp/scooby-shared";
import { APICreationOptions } from ".";
import { ReportContext } from "./types";
import { RestScoobyWebAPI } from "./rest";
import { S3ScoobyWebAPI } from "./s3";
import { CommitContext, ScoobyWebAPI } from "./types";

export class MixedScoobyWebAPI implements ScoobyWebAPI {
  private s3Api: S3ScoobyWebAPI;
  private restApi: RestScoobyWebAPI;

  constructor(options: APICreationOptions) {
    this.s3Api = new S3ScoobyWebAPI(options);
    this.restApi = new RestScoobyWebAPI(options);
  }

  getReports(params: CommitContext): Promise<string[]> {
    return this.s3Api.getReports(params);
  }
  getReport(params: ReportContext): Promise<HostedReport> {
    return this.s3Api.getReport(params);
  }
  getCommitStatusOverview(
    params: CommitContext
  ): Promise<CommitStatusOverview | undefined> {
    return this.s3Api.getCommitStatusOverview(params);
  }
  getAggregateReview(params: CommitContext): Promise<Review | undefined> {
    return this.s3Api.getAggregateReview(params);
  }
  approveReport(params: ReportContext): Promise<void> {
    return this.restApi.approveReport(params);
  }
}
