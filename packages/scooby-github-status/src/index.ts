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
    return computeMainBranchReportStatuses(context, reports);
  }

  if (reports.every((report) => report.summary.result === "success")) {
    return computeAllSuccessfulReportStatuses(context, reports);
  }

  const associatedPR = await githubAPI.getAssociatedPR(
    context.currentCommitHash
  );
  if (associatedPR === undefined) {
    return computeActualReportStatuses(context, reports);
  }

  const approvalStatus = await githubAPI.hasPRBeenApproved(associatedPR);
  if (!approvalStatus.approved) {
    return computeActualReportStatuses(context, reports);
  }

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
  const baseUrl = process.env["SCOOBY_WEB_BASE_URL"];
  const s3bucket = process.env["SCOOBY_AWS_S3_BUCKET"];
  const s3region = process.env["SCOOBY_AWS_S3_REGION"];

  return `${baseUrl}/#/repo/${context.repositoryName}/commit/${context.currentCommitHash}/report/${reportName}/?_s3_region=${s3region}&_s3_bucket=${s3bucket}`;
}
