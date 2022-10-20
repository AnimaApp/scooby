import {
  HostedReport,
  Review,
  Report,
  ReportItem,
} from "@animaapp/scooby-shared";
import { ReportStatus } from ".";
import { getURLForReport } from "./url";

type ComputeReportStatusesContext = {
  repositoryName: string;
  commitHash: string;
  isMainBranch: boolean;

  s3bucket: string;
  s3region: string;
  webBaseUrl: string;
};

export async function computeReportStatuses(
  context: ComputeReportStatusesContext,
  reports: HostedReport[],
  review: Review
): Promise<ReportStatus[]> {
  if (context.isMainBranch) {
    console.log("approving all statuses as we are on the main branch");
    return computeMainBranchReportStatuses(context, reports);
  }

  return computeActualReportStatuses(context, reports, review);
}

async function computeMainBranchReportStatuses(
  context: ComputeReportStatusesContext,
  reports: HostedReport[]
): Promise<ReportStatus[]> {
  return reports.map(
    (report): ReportStatus => ({
      name: report.name,
      state: "success",
      description: "Auto-approved because on main branch",
      url: getURLForReport({ ...context, reportName: report.name }),
    })
  );
}

async function computeActualReportStatuses(
  context: ComputeReportStatusesContext,
  reports: HostedReport[],
  review: Review
): Promise<ReportStatus[]> {
  return reports.map((report): ReportStatus => {
    const result = computeReportStatus(report, review);

    return {
      name: report.name,
      state: result.state,
      description: result.message,
      url: getURLForReport({ ...context, reportName: report.name }),
    };
  });
}

type ReportStatusResult = {
  state: "success" | "failure";
  message: string;
};

function computeReportStatus(
  report: Report,
  review: Review
): ReportStatusResult {
  if (!report.items) {
    // Fallback to the summary result if no items are available
    return {
      state: report.summary.result === "success" ? "success" : "failure",
      message:
        report.summary.result === "success"
          ? "All tests passed!"
          : "Some tests failed, for more information please see the report",
    };
  }

  const rejectedItems: ReportItem[] = [];
  const failedItems: ReportItem[] = [];

  for (const item of report.items) {
    if (item.status === "success") {
      if (hasBeenRejected(report.name, review, item)) {
        rejectedItems.push(item);
      }
    } else {
      if (!hasBeenApproved(report.name, review, item)) {
        failedItems.push(item);
      }
    }
  }

  if (rejectedItems.length > 0) {
    return {
      state: "failure",
      message: `Changes requested on ${rejectedItems.length} items, please visit the report for more information.`,
    };
  } else if (failedItems.length > 0) {
    return {
      state: "failure",
      message: `${failedItems.length} items have unapproved failures, please visit the report for more information.`,
    };
  } else {
    return {
      state: "success",
      message: "All tests passed!",
    };
  }
}

function hasBeenApproved(
  report: string,
  review: Review,
  item: ReportItem
): boolean {
  return (
    review.approvals.find(
      (approval) =>
        approval.report === report &&
        approval.id === item.id &&
        approval.hash === item.hash
    ) !== undefined
  );
}

function hasBeenRejected(
  report: string,
  review: Review,
  item: ReportItem
): boolean {
  return (
    review.rejections.find(
      (rejection) =>
        rejection.report === report &&
        rejection.id === item.id &&
        rejection.hash === item.hash
    ) !== undefined
  );
}
