import { APICreationOptions } from "..";
import { ReportContext, ReviewScoobyWebAPI } from "../types";
import { getRestAPIConfig, RestAPIConfig } from "./config";

export class RestScoobyWebAPI implements ReviewScoobyWebAPI {
  private config: RestAPIConfig;

  constructor(options: APICreationOptions) {
    this.config = getRestAPIConfig(options);
  }

  async approveReport(params: ReportContext): Promise<void> {
    await this.postAPIRequest("/api/review/approve", {
      environment: this.config.environment,
      repositoryName: params.repository,
      commitHash: params.commit,
      reports: [params.reportName],
    });
  }

  async postAPIRequest(endpoint: string, body: unknown): Promise<Response> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.accessToken}`,
      },
      body: JSON.stringify(body),
    };

    return fetch(`${this.config.baseUrl}${endpoint}`, options);
  }
}
