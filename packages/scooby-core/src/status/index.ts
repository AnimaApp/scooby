import { getScoobyAPI, ScoobyAPI } from "@animaapp/scooby-api";
import { getGitHubAPI } from "@animaapp/scooby-github-api";
import { GitHubAPI } from "@animaapp/scooby-github-api/src/types";
import { getEnvironment } from "../environment";
import { readEnvVariable } from "../utils/env";
import { computeReportStatuses } from "./compute";
import { fetchReports } from "./reports";
import { getAggregatedReview } from "./review";

export type ReportStatus = {
  name: string;
  state: "success" | "failure";
  description: string;
  url: string;
};

export async function runUpdateStatus() {
  const environment = await getEnvironment();
  console.log("Loaded environment: ", environment);

  console.log("initializing API...");
  const api = await getScoobyAPI({
    repositoryName: environment.repositoryName,
  });

  console.log("initializing GitHub API...");
  const githubApi = await getGitHubAPI({
    repository: environment.repositoryName,
    owner: environment.repositoryOwner,
  });

  await updateStatus({
    api,
    githubApi,
    commitHash: environment.currentCommitHash,
    isMainBranch: environment.isMainBranch,
    repositoryName: environment.repositoryName,
    s3bucket: readEnvVariable("SCOOBY_AWS_S3_BUCKET"),
    s3region: readEnvVariable("SCOOBY_AWS_S3_REGION"),
    webBaseUrl: readEnvVariable("SCOOBY_WEB_BASE_URL"),
  });

  console.log("done!");
}

type UpdateStatusContext = {
  isMainBranch: boolean;
  commitHash: string;
  repositoryName: string;

  s3bucket: string;
  s3region: string;
  webBaseUrl: string;

  api: ScoobyAPI;
  githubApi: GitHubAPI;
};

export async function updateStatus(context: UpdateStatusContext) {
  console.log("fetching reports...");
  const reports = await fetchReports(context.api, context.commitHash);

  console.log("getting aggregate review...");
  const review = await getAggregatedReview(
    context.commitHash,
    context.api,
    context.githubApi
  );

  console.log("computing statuses...");
  const statuses = await computeReportStatuses(
    {
      commitHash: context.commitHash,
      isMainBranch: context.isMainBranch,
      repositoryName: context.repositoryName,
      s3bucket: context.s3bucket,
      s3region: context.s3region,
      webBaseUrl: context.webBaseUrl,
    },
    reports,
    review
  );

  console.log("posting commit statuses on GitHub...");
  for (const status of statuses) {
    await context.githubApi.postCommitStatus(context.commitHash, {
      name: status.name,
      description: status.description,
      state: status.state,
      targetUrl: status.url,
    });
  }
}
