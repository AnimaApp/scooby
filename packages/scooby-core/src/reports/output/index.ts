import { LocalReport, Report } from "@animaapp/scooby-shared";
import { ReportContext, ReportOutputTarget } from "../../types";
import { buildHostedReportOutput } from "./hosted";
import { buildZipReportOutput } from "./zip";

export async function buildReportOutput(
  report: LocalReport,
  context: ReportContext,
  outputTarget: ReportOutputTarget
): Promise<Report> {
  switch (outputTarget.type) {
    case "hosted":
      return buildHostedReportOutput(report, context);
    case "zip":
      return buildZipReportOutput(report, outputTarget);
  }
}
