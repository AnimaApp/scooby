import { Context, getContext } from "@animaapp/scooby-context";
import { getGitHubAPI } from "@animaapp/scooby-github-api";
import { getScoobyAPI, ScoobyAPI } from "@animaapp/scooby-api";
import { ReportStatus } from "./types";
import { HostedReport } from "../../scooby-shared/src";
import { GitHubAPI } from "../../scooby-github-api/src/types";

export async function updateGitHubStatus() {
  const context = await getContext();
  console.log("Loaded context: ", context);

  console.log("initializing API...");
  const api = await getScoobyAPI({
    repositoryName: context.repositoryName,
  });

  console.log("initializing GitHub API...");
  const githubAPI = await getGitHubAPI({
    repository: context.repositoryName,
    owner: context.repositoryOwner,
  });

  console.log("fetching reports...");
  const reports = await fetchReports(api, context.currentCommitHash);

  console.log("computing target github statuses...");
  const statuses = await computeReportStatuses(context, githubAPI, reports);

  console.log("posting commit statuses on GitHub...");
  for (const status of statuses) {
    await githubAPI.postCommitStatus(context.currentCommitHash, {
      name: status.name,
      description: status.description,
      state: status.state,
      targetUrl: status.url,
    });
  }

  console.log("done!");
}

async function computeReportStatuses(
  context: Context,
  githubAPI: GitHubAPI,
  reports: HostedReport[]
): Promise<ReportStatus[]> {
  if (context.isMainBranch) {
    console.log("approving all statuses as we are on the main branch");
    return computeMainBranchReportStatuses(context, reports);
  }

  if (reports.every((report) => report.summary.result === "success")) {
    console.log("all tests succeeded, reporting a successful result");
    return computeAllSuccessfulReportStatuses(context, reports);
  }

  const associatedPR = await githubAPI.getAssociatedPR(
    context.currentCommitHash
  );
  if (associatedPR === undefined) {
    console.log("no associated PR found, reporting actual results");
    return computeActualReportStatuses(context, reports);
  }

  const approvalStatus = await githubAPI.hasPRBeenApproved(associatedPR);
  if (!approvalStatus.approved) {
    console.log("no PR approval detected, reporting actual results");
    return computeActualReportStatuses(context, reports);
  }

  console.log("PR approval detected, approving all tests");
  return computeApprovedPRReportStatuses(context, reports, approvalStatus.user);
}

async function computeMainBranchReportStatuses(
  context: Context,
  reports: HostedReport[]
): Promise<ReportStatus[]> {
  return reports.map(
    (report): ReportStatus => ({
      name: report.name,
      state: "success",
      description: "Auto-approved as it's on main branch",
      url: getURLForReport(context, report.name),
    })
  );
}

async function computeAllSuccessfulReportStatuses(
  context: Context,
  reports: HostedReport[]
): Promise<ReportStatus[]> {
  return reports.map(
    (report): ReportStatus => ({
      name: report.name,
      state: "success",
      description: "All tests passed!",
      url: getURLForReport(context, report.name),
    })
  );
}

async function computeActualReportStatuses(
  context: Context,
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
      url: getURLForReport(context, report.name),
    })
  );
}

async function computeApprovedPRReportStatuses(
  context: Context,
  reports: HostedReport[],
  user?: string
): Promise<ReportStatus[]> {
  return reports.map(
    (report): ReportStatus => ({
      name: report.name,
      state: "success",
      description: user
        ? `Approved by @${user} (from PR review approval)`
        : "Approved by anonymous reviewer",
      url: getURLForReport(context, report.name),
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

function getURLForReport(context: Context, reportName: string): string {
  const baseUrl = readEnvVariable("SCOOBY_WEB_BASE_URL");
  const s3bucket = readEnvVariable("SCOOBY_AWS_S3_BUCKET");
  const s3region = readEnvVariable("SCOOBY_AWS_S3_REGION");

  if (!baseUrl) {
    throw new Error();
  }

  return `${baseUrl}/#/repo/${context.repositoryName}/commit/${context.currentCommitHash}/report/${reportName}/?_s3_region=${s3region}&_s3_bucket=${s3bucket}`;
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
