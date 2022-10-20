import { getScoobyAPI, ScoobyAPI } from "@animaapp/scooby-api";
import { Review, ReviewApproval } from "@animaapp/scooby-shared";
import { getEnvironment } from "../environment";

type CommonContext = {
  commitHash: string;
  api: ScoobyAPI;
};

type ApproveReportsContext = CommonContext & {
  reports: string[] | "all";
};

export async function runApproveReports(reports: string[] | "all") {
  const environment = await getEnvironment();
  console.log("Loaded environment: ", environment);

  console.log("initializing API...");
  const api = await getScoobyAPI({
    repositoryName: environment.repositoryName,
  });

  await approveReports({
    api,
    commitHash: environment.currentCommitHash,
    reports,
  });
}

export async function approveReports(context: ApproveReportsContext) {
  console.log("determining reports...");
  const reports =
    context.reports === "all"
      ? await context.api.getReports({ commitHash: context.commitHash })
      : context.reports;

  const approvals: ReviewApproval[] = [];

  for (const report of reports) {
    approvals.push(
      ...(await generateReportApprovals({
        api: context.api,
        commitHash: context.commitHash,
        reportName: report,
      }))
    );
  }

  const review: Review = {
    approvals,
    rejections: [],
  };

  console.log("pushing review...");
  await context.api.postReview({ commitHash: context.commitHash }, review);
}

type ApproveReportContext = CommonContext & {
  reportName: string;
};

export async function generateReportApprovals(
  context: ApproveReportContext
): Promise<ReviewApproval[]> {
  console.log("fetching report...");
  const report = await context.api.getReport({
    commitHash: context.commitHash,
    reportName: context.reportName,
  });

  if (!report.items?.length) {
    console.warn("Could not approve report without items");
    return [];
  }

  const approvals: ReviewApproval[] = report.items.map((item) => ({
    createdAt: new Date().getTime(),
    commitHash: context.commitHash,
    id: item.id,
    hash: item.hash,
    report: context.reportName,
  }));

  return approvals;
}
