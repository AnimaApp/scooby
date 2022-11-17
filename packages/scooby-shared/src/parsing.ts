import { z } from "zod";
import {
  CommitStatusOverview,
  GlobalEnvironmentSetup,
  HostedReport,
  Review,
} from "./types";

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

const reportItem = z.object({
  id: z.string(),
  hash: z.string(),
  status: z.enum(["success", "failure"]),
});

const baseReportSchema = z.object({
  name: z.string(),
  createdAt: z.number(),
  commitHash: z.string(),
  type: z.string(),
  summary: summarySchema,
  items: z.array(reportItem),
});

const hostedResource = z.object({
  type: z.literal("hosted"),
  url: z.string().url(),
});

const baseMetadataSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
});
const textMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("text"),
  text: z.string(),
});
const linkMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("link"),
  url: z.string(),
});
const imageMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("image"),
  image: hostedResource,
});
const codeMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("code"),
  code: hostedResource,
});
const fileMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("file"),
  file: hostedResource,
});
const metadataSchema = z.discriminatedUnion("type", [
  textMetadataSchema,
  linkMetadataSchema,
  imageMetadataSchema,
  codeMetadataSchema,
  fileMetadataSchema,
]);

const baseReportEntrySchema = z.object({
  id: z.string(),
  groupId: z.string(),
  tags: z.array(z.string()),
  path: z.string().default("path"),
  metadata: z.optional(z.array(metadataSchema)),
});
const reportImageEntrySchema = baseReportEntrySchema.extend({
  type: z.literal("image").default("image"),
  image: hostedResource,
});
const reportCodeEntrySchema = baseReportEntrySchema.extend({
  type: z.literal("code"),
  code: hostedResource,
});
const reportImageComparisonSchema = z.object({
  type: z.literal("image").default("image"),
  similarity: z.number(),
  normalizedExpected: hostedResource,
  normalizedActual: hostedResource,
  diff: hostedResource,
  overlap: hostedResource,
});
const reportCodeComparisonSchema = z.object({
  type: z.literal("code"),
  similarity: z.number(),
  diff: z.optional(hostedResource),
});

const imageRegressionEntrySchema = reportImageEntrySchema;
const codeRegressionEntrySchema = reportCodeEntrySchema;
const imageRegressionTestPairSchema = z.object({
  type: z.literal("image").default("image"),
  expected: imageRegressionEntrySchema,
  actual: imageRegressionEntrySchema,
  comparison: reportImageComparisonSchema,
});
const codeRegressionTestPairSchema = z.object({
  type: z.literal("code"),
  expected: codeRegressionEntrySchema,
  actual: codeRegressionEntrySchema,
  comparison: reportCodeComparisonSchema,
});

const regressionReportSchema = baseReportSchema.extend({
  type: z.literal("regression"),
  baseCommitHash: z.string(),
  results: z.union([
    z.object({
      type: z.literal("image").default("image"),
      new: z.array(imageRegressionEntrySchema),
      removed: z.array(imageRegressionEntrySchema),
      changed: z.array(imageRegressionTestPairSchema),
      unchanged: z.array(imageRegressionTestPairSchema),
    }),
    z.object({
      type: z.literal("code"),
      new: z.array(codeRegressionEntrySchema),
      removed: z.array(codeRegressionEntrySchema),
      changed: z.array(codeRegressionTestPairSchema),
      unchanged: z.array(codeRegressionTestPairSchema),
    }),
  ]),
});

const imageFidelityEntrySchema = reportImageEntrySchema;
const codeFidelityEntrySchema = reportCodeEntrySchema;
const imageFidelityTestPairSchema = z.object({
  type: z.literal("image").default("image"),
  outcome: z.enum(["success", "failure"]).default("success"),
  expected: imageFidelityEntrySchema,
  actual: imageFidelityEntrySchema,
  comparison: reportImageComparisonSchema,
});
const codeFidelityTestPairSchema = z.object({
  type: z.literal("code"),
  outcome: z.enum(["success", "failure"]).default("success"),
  expected: codeFidelityEntrySchema,
  actual: codeFidelityEntrySchema,
  comparison: reportCodeComparisonSchema,
});

const fidelityReportSchema = baseReportSchema.extend({
  type: z.literal("fidelity"),
  overallFidelityScore: z.number(),
  pairs: z.array(
    z.union([codeFidelityTestPairSchema, imageFidelityTestPairSchema])
  ),
});

const imageFidelityRegressionEntrySchema = reportImageEntrySchema;
const codeFidelityRegressionEntrySchema = reportCodeEntrySchema;
const imageFidelityRegressionTestPairSchema = z.object({
  type: z.literal("image"),
  expected: imageFidelityRegressionEntrySchema,
  actual: imageFidelityRegressionEntrySchema,
  fidelityComparison: reportImageComparisonSchema,
});
const codeFidelityRegressionTestPairSchema = z.object({
  type: z.literal("code"),
  expected: codeFidelityRegressionEntrySchema,
  actual: codeFidelityRegressionEntrySchema,
  fidelityComparison: reportCodeComparisonSchema,
});
const imageFidelityRegressionTestTripleSchema = z.object({
  type: z.literal("image"),
  expected: imageFidelityRegressionEntrySchema,
  actual: imageFidelityRegressionEntrySchema,
  reference: imageFidelityRegressionEntrySchema,
  fidelityComparison: reportImageComparisonSchema,
  regressionComparison: reportImageComparisonSchema,
});
const codeFidelityRegressionTestTripleSchema = z.object({
  type: z.literal("code"),
  expected: codeFidelityRegressionEntrySchema,
  actual: codeFidelityRegressionEntrySchema,
  reference: codeFidelityRegressionEntrySchema,
  fidelityComparison: reportCodeComparisonSchema,
  regressionComparison: reportCodeComparisonSchema,
});

const fidelityRegressionReportSchema = baseReportSchema.extend({
  type: z.literal("fidelity-regression"),
  baseCommitHash: z.string(),
  overallFidelityScore: z.number(),
  results: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("image"),
      new: z.array(imageFidelityRegressionTestPairSchema),
      removed: z.array(imageFidelityRegressionEntrySchema),
      changed: z.array(imageFidelityRegressionTestTripleSchema),
      unchanged: z.array(imageFidelityRegressionTestTripleSchema),
    }),
    z.object({
      type: z.literal("code"),
      new: z.array(codeFidelityRegressionTestPairSchema),
      removed: z.array(codeFidelityRegressionEntrySchema),
      changed: z.array(codeFidelityRegressionTestTripleSchema),
      unchanged: z.array(codeFidelityRegressionTestTripleSchema),
    }),
  ]),
});

const reportSchema = z.discriminatedUnion("type", [
  regressionReportSchema,
  fidelityReportSchema,
  fidelityRegressionReportSchema,
]);

export function parseHostedReport(report: unknown): HostedReport {
  return reportSchema.parse(report);
}

const reviewSchema = z.object({
  approvals: z.array(
    z.object({
      report: z.string(),
      id: z.string(),
      hash: z.string(),
      commitHash: z.string(),
      createdAt: z.number(),
    })
  ),
  rejections: z.array(
    z.object({
      report: z.string(),
      id: z.string(),
      hash: z.string(),
      commitHash: z.string(),
      createdAt: z.number(),
    })
  ),
});

export function parseReview(review: unknown): Review {
  return reviewSchema.parse(review);
}

const commitStatusOverviewSchema = z.object({
  createdAt: z.number(),
  reports: z.record(
    z.object({
      status: z.enum(["success", "failure", "approved", "changes_requested"]),
      message: z.string(),
    })
  ),
});

export function parseCommitStatusOverview(
  overview: unknown
): CommitStatusOverview {
  return commitStatusOverviewSchema.parse(overview);
}

const globalEnviornmentSetupSchema = z.object({
  s3: z.optional(
    z.object({
      bucket: z.string(),
      region: z.string(),
    })
  ),
  restApi: z.optional(
    z.object({
      baseUrl: z.string(),
      accessToken: z.string(),
    })
  ),
});

export function parseGlobalEnvironmentSetup(
  setup: unknown
): GlobalEnvironmentSetup {
  return globalEnviornmentSetupSchema.parse(setup);
}
