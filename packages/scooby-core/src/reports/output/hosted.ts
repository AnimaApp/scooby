import { CommitContext, ScoobyAPI } from "@animaapp/scooby-api";
import { HostedReport, LocalReport } from "@animaapp/scooby-shared";
import { Environment, ReportContext } from "../../types";
import { isRunningOnReferenceCommit } from "../../utils/commit";

export async function buildHostedReportOutput(
  report: LocalReport,
  context: ReportContext
): Promise<HostedReport> {
  if (!shouldUploadReport(context.environment)) {
    throw new Error(
      "unable to upload report as doing so could result in a corrupted dataset."
    );
  }

  return uploadReport(
    {
      commitHash: context.environment.currentCommitHash,
    },
    report,
    context.api
  );
}

function shouldUploadReport(environment: Environment): boolean {
  const runningOnReferenceCommit = isRunningOnReferenceCommit(
    environment.currentCommitHash,
    environment.baseCommitHash
  );

  const isRunningOnCI = process.env["CI"] === "true";

  if (environment.isMainBranch) {
    if (isRunningOnCI) {
      return true;
    } else {
      console.warn(
        "skipping report upload as it's being done from main branch without running from the CI. This is usually a mistake, and would overwrite the reference data on main."
      );
      return false;
    }
  }

  if (runningOnReferenceCommit) {
    console.warn(
      `this report is running on the same commit used as reference (${environment.baseCommitHash}), therefore no report will be uploaded to the API to avoid conflicts.`
    );
    return false;
  }

  return true;
}

async function uploadReport(
  context: CommitContext,
  report: LocalReport,
  api: ScoobyAPI
): Promise<HostedReport> {
  switch (report.type) {
    case "fidelity":
      return api.uploadFidelityReport(context, report);
    case "regression":
      return api.uploadRegressionReport(context, report);
  }
}
