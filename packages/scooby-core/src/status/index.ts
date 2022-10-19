import { getScoobyAPI, ScoobyAPI } from "@animaapp/scooby-api";
import { getGitHubAPI } from "@animaapp/scooby-github-api";
import { HostedReport } from "@animaapp/scooby-shared";
import { getEnvironment } from "../environment";
import { Environment } from "../types";

export type ReportStatus = {
  name: string;
  state: "success" | "failure";
  description: string;
  url: string;
};

export async function updateStatus() {
  const environment = await getEnvironment();
  console.log("Loaded environment: ", environment);

  console.log("initializing API...");
  const api = await getScoobyAPI({
    repositoryName: environment.repositoryName,
  });

  console.log("initializing GitHub API...");
  const githubAPI = await getGitHubAPI({
    repository: environment.repositoryName,
    owner: environment.repositoryOwner,
  });

  console.log("fetching reports...");
  const reports = await fetchReports(api, environment.currentCommitHash);

  console.log("computing target github statuses...");
  const statuses = await computeReportStatuses(environment, reports);

  console.log("posting commit statuses on GitHub...");
  for (const status of statuses) {
    await githubAPI.postCommitStatus(environment.currentCommitHash, {
      name: status.name,
      description: status.description,
      state: status.state,
      targetUrl: status.url,
    });
  }

  console.log("done!");
}

async function computeReportStatuses(
  environment: Environment,
  reports: HostedReport[]
): Promise<ReportStatus[]> {
  if (environment.isMainBranch) {
    console.log("approving all statuses as we are on the main branch");
    return computeMainBranchReportStatuses(environment, reports);
  }

  return computeActualReportStatuses(environment, reports);
}

async function computeMainBranchReportStatuses(
  environment: Environment,
  reports: HostedReport[]
): Promise<ReportStatus[]> {
  return reports.map(
    (report): ReportStatus => ({
      name: report.name,
      state: "success",
      description: "Auto-approved as it's on main branch",
      url: getURLForReport(environment, report.name),
    })
  );
}

async function computeActualReportStatuses(
  environment: Environment,
  reports: HostedReport[]
): Promise<ReportStatus[]> {
  return reports.map(
    (report): ReportStatus => ({
      name: report.name,
      state: report.summary.result === "success" ? "success" : "failure",
      description:
        report.summary.result === "success"
          ? "All tests passed!"
          : "Some tests failed, for more information please see the report",
      url: getURLForReport(environment, report.name),
    })
  );
}

async function fetchReports(
  api: ScoobyAPI,
  commit: string
): Promise<HostedReport[]> {
  const reportsIds = await api.getReports({
    commitHash: commit,
  });

  const reports: HostedReport[] = [];

  for (const reportId of reportsIds) {
    const report = await api.getReport({
      commitHash: commit,
      reportName: reportId,
    });

    reports.push(report);
  }

  return reports;
}

function getURLForReport(environment: Environment, reportName: string): string {
  const baseUrl = readEnvVariable("SCOOBY_WEB_BASE_URL");
  const s3bucket = readEnvVariable("SCOOBY_AWS_S3_BUCKET");
  const s3region = readEnvVariable("SCOOBY_AWS_S3_REGION");

  if (!baseUrl) {
    throw new Error();
  }

  return `${baseUrl}/#/repo/${environment.repositoryName}/commit/${environment.currentCommitHash}/report/${reportName}/?_s3_region=${s3region}&_s3_bucket=${s3bucket}`;
}

function readEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `unable to read '${name}' env variable, please make sure to provide it`
    );
  }

  return value;
}
