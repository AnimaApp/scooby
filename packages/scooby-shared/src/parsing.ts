import { z } from "zod";
import { HostedReport } from "./types";

const baseStatisticSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  sentiment: z.enum(["success", "danger", "warning", "info"]),
});

const fractionStatisticSchema = baseStatisticSchema.extend({
  type: z.literal("fraction"),
  numerator: z.number(),
  denominator: z.number(),
});

const gaugeStatisticSchema = baseStatisticSchema.extend({
  type: z.literal("gauge"),
  value: z.number(),
});

const statisticSchema = z.discriminatedUnion("type", [
  fractionStatisticSchema,
  gaugeStatisticSchema,
]);

const summarySchema = z.object({
  result: z.enum(["success", "failure"]),
  stats: z.array(statisticSchema),
});

const baseReportSchema = z.object({
  name: z.string(),
  createdAt: z.number(),
  commitHash: z.string(),
  type: z.string(),
  summary: summarySchema,
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

const fidelityTestEntrySchema = z.object({
  id: z.string(),
  groupId: z.string(),
  tags: z.array(z.string()),
  image: hostedResource,
});

const fidelityTestPairSchema = z.object({
  expected: fidelityTestEntrySchema,
  actual: fidelityTestEntrySchema,
  comparison: z.object({
    similarity: z.number(),
    normalizedExpected: hostedResource,
    normalizedActual: hostedResource,
    diff: hostedResource,
    overlap: hostedResource,
  }),
});

const fidelityReportSchema = baseReportSchema.extend({
  type: z.literal("fidelity"),
  overallFidelityScore: z.number(),
  pairs: z.array(fidelityTestPairSchema),
});

const reportSchema = z.discriminatedUnion("type", [
  regressionReportSchema,
  fidelityReportSchema,
]);

export function parseHostedReport(report: unknown): HostedReport {
  return reportSchema.parse(report);
}
