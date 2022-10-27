import { CommitContext, getScoobyAPI, ScoobyAPI } from "@animaapp/scooby-api";
import { HostedReport, LocalReport, Report } from "@animaapp/scooby-shared";
import { getEnvironment } from "../environment";
import { Environment, ReportContext } from "../types";
import { isRunningOnReferenceCommit } from "../utils/commit";
import { runFidelityReport } from "./fidelity";
import { printFidelityReport } from "./fidelity/print";
import { isValidName } from "./name";
import { runRegressionReport } from "./regression";
import { printRegressionReport } from "./regression/print";

const REPORTS = {
  fidelity: runFidelityReport,
  regression: runRegressionReport,
} as const;

export async function runReport<T extends keyof typeof REPORTS>(
  type: T,
  params: Parameters<typeof REPORTS[T]>[1]
) {
  const environment = await getEnvironment();
  console.log("Loaded environment:", environment);

  console.log("initializing API...");
  const api = await getScoobyAPI({
    repositoryName: environment.repositoryName,
  });

  const context: ReportContext = {
    environment,
    api,
  };

  return _processReport(type, params, context);
}

export async function _processReport<T extends keyof typeof REPORTS>(
  type: T,
  params: Parameters<typeof REPORTS[T]>[1],
  context: ReportContext
): Promise<Report> {
  if (!isValidName(params.name)) {
    throw new Error(
      `invalid report name: '${params.name}', names can only contain alphanumeric characters and hyphen '-' symbols`
    );
  }

  const localReport = await REPORTS[type](context, params as any);

  printReport(localReport);

  if (shouldUploadReport(context.environment)) {
    const hostedReport = await uploadReport(
      {
        commitHash: context.environment.currentCommitHash,
      },
      localReport,
      context.api
    );

    return hostedReport;
  }

  return localReport;
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

function printReport(report: LocalReport) {
  switch (report.type) {
    case "fidelity":
      return printFidelityReport(report);
    case "regression":
      return printRegressionReport(report);
  }
}
