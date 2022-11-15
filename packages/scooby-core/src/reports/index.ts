import { getScoobyAPI } from "@animaapp/scooby-api";
import { LocalReport, Report } from "@animaapp/scooby-shared";
import { getEnvironment } from "../environment";
import {
  ReportContext,
  ReportOutputTarget,
  ReportOutputTargetOrAuto,
} from "../types";
import { runFidelityReport } from "./fidelity";
import { printFidelityReport } from "./fidelity/print";
import { isValidName } from "./name";
import { buildReportOutput } from "./output";
import { runRegressionReport } from "./regression";
import { printRegressionReport } from "./regression/print";

const REPORTS = {
  fidelity: runFidelityReport,
  regression: runRegressionReport,
} as const;

export async function runReport<T extends keyof typeof REPORTS>(
  type: T,
  params: Parameters<typeof REPORTS[T]>[1] & {
    output: ReportOutputTargetOrAuto;
  }
) {
  const environment = await getEnvironment();
  console.log("Loaded environment:", environment);

  console.log("initializing API...");
  const api = await getScoobyAPI({
    repositoryName: environment.repositoryName,
  });

  const outputTarget: ReportOutputTarget = resolveOutputTarget(
    params.output,
    params.name
  );
  console.log(`target output: ${outputTarget.type}`);

  const context: ReportContext = {
    environment,
    api,
    isLocalRun: outputTarget.type !== "hosted",
  };

  return _processReport(type, params, context, outputTarget);
}

export async function _processReport<T extends keyof typeof REPORTS>(
  type: T,
  params: Parameters<typeof REPORTS[T]>[1],
  context: ReportContext,
  outputTarget: ReportOutputTarget
): Promise<Report> {
  if (!isValidName(params.name)) {
    throw new Error(
      `invalid report name: '${params.name}', names can only contain alphanumeric characters and hyphen '-' symbols`
    );
  }

  const localReport = await REPORTS[type](context, params as any);

  printReport(localReport);

  return buildReportOutput(localReport, context, outputTarget);
}

function printReport(report: LocalReport) {
  switch (report.type) {
    case "fidelity":
      return printFidelityReport(report);
    case "regression":
      return printRegressionReport(report);
  }
}

function resolveOutputTarget(
  output: ReportOutputTargetOrAuto,
  reportName: string
): ReportOutputTarget {
  if (output.type !== "auto") {
    return output;
  }

  const isRunningOnCI = process.env["CI"] === "true";
  if (isRunningOnCI) {
    return {
      type: "hosted",
    };
  } else {
    return {
      type: "zip",
      path: `${reportName}.zip`,
    };
  }
}
