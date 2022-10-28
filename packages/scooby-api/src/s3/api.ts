import { GetObjectCommandOutput, NoSuchKey, S3 } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";
import {
  LocalRegressionReport,
  HostedRegressionReport,
  LocalResource,
  HostedResource,
  buildReportResourcePath,
  Report,
  buildReportJSONPath,
  buildSnapshotArchivePath,
  LocalFidelityReport,
  HostedFidelityReport,
  buildReportsPath,
  HostedReport,
  parseHostedReport,
  Review,
  buildReviewJSONPath,
  parseReview,
  CommitStatusOverview,
  buildCommitStatusOverviewJSONPath,
  buildAggregateReviewJSONPath,
} from "@animaapp/scooby-shared";
import { readFile } from "fs/promises";
import { ScoobyAPIOptions } from "../options";
import {
  ScoobyAPI,
  SnapshotContext,
  CommitContext,
  ReportContext,
  ReportId,
  PostReviewOptions,
} from "../types";
import {
  BucketOptions,
  getAWSBucketOptions,
  getAWSCredentials,
} from "./awsConfig";
import { Readable } from "stream";
import { buildHostedReport, getAllLocalResources } from "./resources";
import fastq, { queueAsPromised } from "fastq";

export class S3ScoobyAPI implements ScoobyAPI {
  private options: ScoobyAPIOptions;
  private client: S3;
  private bucketOptions: BucketOptions;

  constructor(options: ScoobyAPIOptions) {
    this.options = options;

    this.bucketOptions = getAWSBucketOptions(options);
    const credentials = getAWSCredentials(options);
    this.client = new S3({
      credentials,
      region: this.bucketOptions.region,
    });

    console.log("using AWS S3 bucket: " + this.bucketOptions.bucket);
  }

  async getReports(params: CommitContext): Promise<ReportId[]> {
    const key = `${buildReportsPath({
      commitHash: params.commitHash,
      repository: this.options.repositoryName,
    })}/`;

    const subdirectories = await this.listSubdirectories(key);
    return subdirectories;
  }

  async getReport(params: ReportContext): Promise<HostedReport> {
    const key = buildReportJSONPath({
      commitHash: params.commitHash,
      reportName: params.reportName,
      repository: this.options.repositoryName,
    });

    const body = await this.getJSONObject(key);

    return parseHostedReport(body);
  }

  async getReview(params: CommitContext): Promise<Review | undefined> {
    const key = buildReviewJSONPath({
      commitHash: params.commitHash,
      repository: this.options.repositoryName,
    });

    try {
      const body = await this.getJSONObject(key);
      return parseReview(body);
    } catch (error) {
      if (error instanceof NoSuchKey) {
        return;
      }

      throw error;
    }
  }

  async postReview(
    context: CommitContext,
    review: Review,
    options?: PostReviewOptions | undefined
  ): Promise<void> {
    let baseReview: Review | undefined = undefined;
    if (!options?.overwriteExisting) {
      baseReview = await this.getReview(context);
    }
    if (!baseReview) {
      baseReview = { approvals: [], rejections: [] };
    }

    baseReview.approvals.push(...review.approvals);
    baseReview.rejections.push(...review.rejections);

    const targetPath = buildReviewJSONPath({
      commitHash: context.commitHash,
      repository: this.options.repositoryName,
    });
    await this.uploadBody(targetPath, JSON.stringify(baseReview));
  }

  async postAggregateReview(
    context: CommitContext,
    review: Review
  ): Promise<void> {
    const targetPath = buildAggregateReviewJSONPath({
      commitHash: context.commitHash,
      repository: this.options.repositoryName,
    });
    await this.uploadBody(targetPath, JSON.stringify(review));
  }

  async postCommitStatusOverview(
    context: CommitContext,
    overview: CommitStatusOverview
  ): Promise<void> {
    const targetPath = buildCommitStatusOverviewJSONPath({
      commitHash: context.commitHash,
      repository: this.options.repositoryName,
    });

    await this.uploadBody(targetPath, JSON.stringify(overview));
  }

  async uploadRegressionReport(
    context: CommitContext,
    report: LocalRegressionReport
  ): Promise<HostedRegressionReport> {
    const resources = getAllLocalResources(report);

    console.log("uploading resources...");
    const hostedResourcesMap = await this.uploadReportResources(
      {
        ...context,
        reportName: report.name,
      },
      resources
    );

    const hostedReport = buildHostedReport<HostedRegressionReport>(
      report,
      hostedResourcesMap
    );

    await this.uploadReportJSON(context, hostedReport);

    return hostedReport;
  }

  async uploadFidelityReport(
    context: CommitContext,
    report: LocalFidelityReport
  ): Promise<HostedFidelityReport> {
    const resources = getAllLocalResources(report);

    console.log("uploading resources...");
    const hostedResourcesMap = await this.uploadReportResources(
      {
        ...context,
        reportName: report.name,
      },
      resources
    );

    const hostedReport = buildHostedReport<HostedFidelityReport>(
      report,
      hostedResourcesMap
    );

    await this.uploadReportJSON(context, hostedReport);

    return hostedReport;
  }

  async uploadReportResources(
    context: ReportContext,
    resources: LocalResource[]
  ): Promise<Record<string, HostedResource>> {
    const hostedResources: Record<string, HostedResource> = {};

    type Task = {
      index: number;
      total: number;
      resource: LocalResource;
    };

    const queue: queueAsPromised<Task> = fastq.promise(
      async ({ index, total, resource }: Task) => {
        console.log(`${index + 1}/${total} - uploading: ${resource.path}`);
        const hostedResource = await this.uploadReportResource(
          context,
          resource
        );
        hostedResources[resource.path] = hostedResource;
      },
      this.options.maxConcurrentUploads
    );

    const tasks = resources.map((resource, index) =>
      queue.push({ index, total: resources.length, resource })
    );

    await Promise.all(tasks);

    return hostedResources;
  }

  async uploadReportResource(
    context: ReportContext,
    resource: LocalResource
  ): Promise<HostedResource> {
    const randomId = uuidv4();
    const parsedFilename = path.parse(resource.path);
    const targetFilename = `${randomId}${parsedFilename.ext}`;
    const targetPath = buildReportResourcePath({
      commitHash: context.commitHash,
      filename: targetFilename,
      reportName: context.reportName,
      repository: this.options.repositoryName,
    });

    const resourceUrl = await this.uploadFile(targetPath, resource.path);

    return {
      type: "hosted",
      url: resourceUrl,
    };
  }

  async uploadReportJSON(
    context: CommitContext,
    report: Report
  ): Promise<string> {
    const targetPath = buildReportJSONPath({
      commitHash: context.commitHash,
      reportName: report.name,
      repository: this.options.repositoryName,
    });

    const resourceUrl = await this.uploadBody(
      targetPath,
      JSON.stringify(report)
    );

    return resourceUrl;
  }

  async uploadSnapshotArchive(
    context: SnapshotContext,
    archivePath: string
  ): Promise<void> {
    const targetPath = buildSnapshotArchivePath({
      commitHash: context.commitHash,
      snapshotName: context.snapshotName,
      repository: this.options.repositoryName,
    });

    await this.uploadFile(targetPath, archivePath);
  }

  async downloadSnapshotArchive(
    context: SnapshotContext,
    targetArchivePath: string
  ): Promise<boolean> {
    const targetPath = buildSnapshotArchivePath({
      commitHash: context.commitHash,
      snapshotName: context.snapshotName,
      repository: this.options.repositoryName,
    });

    try {
      const archive = await this.client.getObject({
        Bucket: this.bucketOptions.bucket,
        Key: targetPath,
      });

      await writeFile(targetArchivePath, getBody(archive));

      return true;
    } catch (error) {
      if (error instanceof NoSuchKey) {
        return false;
      }

      throw error;
    }
  }

  async listSubdirectories(key: string): Promise<string[]> {
    const output = await this.client.listObjectsV2({
      Bucket: this.bucketOptions.bucket,
      Prefix: key,
      Delimiter: "/",
    });

    if (!output.CommonPrefixes) {
      return [];
    }

    return output.CommonPrefixes.flatMap(({ Prefix }) => {
      if (!Prefix) {
        return [];
      }

      const tokens = Prefix.split("/");
      const directory = tokens[tokens.length - 2];

      if (!directory) {
        return [];
      }

      return [directory];
    });
  }

  async getJSONObject(key: string): Promise<unknown> {
    const object = await this.client.getObject({
      Bucket: this.bucketOptions.bucket,
      Key: key,
    });

    const stream = getBody(object);
    const string = await streamToString(stream);

    return JSON.parse(string);
  }

  async uploadBody(key: string, body: string): Promise<string> {
    await this.client.putObject({
      Bucket: this.bucketOptions.bucket,
      Key: key,
      Body: body,
    });

    return `https://${this.bucketOptions.bucket}.s3.${this.bucketOptions.region}.amazonaws.com/${key}`;
  }

  async uploadFile(key: string, localFilePath: string): Promise<string> {
    const file = await readFile(localFilePath);

    await this.client.putObject({
      Bucket: this.bucketOptions.bucket,
      Key: key,
      Body: file,
    });

    return `https://${this.bucketOptions.bucket}.s3.${this.bucketOptions.region}.amazonaws.com/${key}`;
  }
}

function getBody(response: GetObjectCommandOutput): Readable {
  const body = response.Body;
  if (!body) {
    throw new Error("unable to get object body, body field is empty");
  }

  return body && (body as Readable);
}

function streamToString(stream: Readable): Promise<string> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
