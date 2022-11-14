import { ReportOutputTargetOrAuto } from "@animaapp/scooby-core";
import { OutputType } from "./flags";

export function convertFlagsToReportOutputTarget(
  reportName: string,
  flags: { output: OutputType }
): ReportOutputTargetOrAuto {
  switch (flags.output) {
    case "auto":
      return {
        type: "auto",
      };
    case "zip":
      return {
        type: "zip",
        path: `${reportName}.zip`,
      };
    case "hosted":
      return {
        type: "hosted",
      };
  }
}
