import { z } from "zod";
import { HostedRegressionReport, HostedReport } from "./types";

const baseReportSchema = z.object({
  name: z.string(),
  createdAt: z.number(),
  commitHash: z.string(),
  type: z.string(),
});

const hostedResource = z.object({
  type: z.literal("hosted"),
  url: z.string().url(),
});

const regressionTestEntrySchema = z.object({
  id: z.string(),
  groupId: z.string(),
  tags: z.array(z.string()),
  image: hostedResource,
});

const regressionTestPairSchema = z.object({
  expected: regressionTestEntrySchema,
  actual: regressionTestEntrySchema,
  comparison: z.object({
    similarity: z.number(),
    normalizedExpected: hostedResource,
    normalizedActual: hostedResource,
    diff: hostedResource,
    overlap: hostedResource,
  }),
});

const regressionReportSchema = baseReportSchema.extend({
  type: z.literal("regression"),
  baseCommitHash: z.string(),
  results: z.object({
    new: z.array(regressionTestEntrySchema),
    removed: z.array(regressionTestEntrySchema),
    changed: z.array(regressionTestPairSchema),
    unchanged: z.array(regressionTestPairSchema),
  }),
});

export function parseHostedReport(report: unknown): HostedReport {
  const baseReport = baseReportSchema.parse(report);

  if (baseReport.type === "regression") {
    return parseRegressionReport(report);
  }

  throw new Error(`unable to parse report of type: ${baseReport.type}`);
}

function parseRegressionReport(report: unknown): HostedRegressionReport {
  return regressionReportSchema.parse(report);
}
