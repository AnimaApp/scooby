import { S3 } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import {
  LocalRegressionReport,
  HostedRegressionReport,
  LocalResource,
  HostedResource,
  buildReportResourcePath,
  Report,
  buildReportJSONPath,
} from "@animaapp/scooby-shared";
import { readFile } from "fs/promises";
import { ScoobyAPIOptions } from "../options";
import {
  ScoobyAPI,
  UploadReportContext,
  UploadReportResourceContext,
} from "../types";
import {
  BucketOptions,
  getAWSBucketOptions,
  getAWSCredentials,
} from "./awsConfig";
import {
  buildHostedRegressionReport,
  getAllLocalResourcesForRegression,
} from "./resources";

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

  async uploadRegressionReport(
    context: UploadReportContext,
    report: LocalRegressionReport
  ): Promise<HostedRegressionReport> {
    const resources = getAllLocalResourcesForRegression(report);

    console.log("uploading resources...");
    const hostedResourcesMap = await this.uploadReportResources(
      {
        ...context,
        reportName: report.name,
      },
      resources
    );

    const hostedReport = buildHostedRegressionReport(
      report,
      hostedResourcesMap
    );

    await this.uploadReportJSON(context, hostedReport);

    return hostedReport;
  }

  async uploadReportResources(
    context: UploadReportResourceContext,
    resources: LocalResource[]
  ): Promise<Record<string, HostedResource>> {
    const hostedResources: Record<string, HostedResource> = {};

    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];
      console.log(`${i + 1}/${resources.length} - uploading: ${resource.path}`);
      const hostedResource = await this.uploadReportResource(context, resource);
      hostedResources[resource.path] = hostedResource;
    }

    return hostedResources;
  }

  async uploadReportResource(
    context: UploadReportResourceContext,
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
    context: UploadReportContext,
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

  async uploadBody(key: string, body: string): Promise<string> {
    await this.client.putObject({
      Bucket: this.bucketOptions.bucket,
      Key: key,
      Body: body,
      ACL: "public-read",
    });

    return `https://${this.bucketOptions.bucket}.s3.${this.bucketOptions.region}.amazonaws.com/${key}`;
  }

  async uploadFile(key: string, localFilePath: string): Promise<string> {
    const file = await readFile(localFilePath);

    await this.client.putObject({
      Bucket: this.bucketOptions.bucket,
      Key: key,
      Body: file,
      ACL: "public-read",
    });

    return `https://${this.bucketOptions.bucket}.s3.${this.bucketOptions.region}.amazonaws.com/${key}`;
  }
}
