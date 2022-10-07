import { S3 } from "@aws-sdk/client-s3";
import {
  LocalRegressionReport,
  HostedRegressionReport,
} from "@animaapp/scooby-types";
import { readFile } from "fs/promises";
import { ScoobyAPIOptions } from "../options";
import { ScoobyAPI, UploadReportContext } from "../types";
import {
  BucketOptions,
  getAWSBucketOptions,
  getAWSCredentials,
} from "./awsConfig";

export class S3ScoobyAPI implements ScoobyAPI {
  private options: ScoobyAPIOptions;
  private client: S3;
  private bucketOptions: BucketOptions;

  constructor(options: ScoobyAPIOptions) {
    this.options = options;

    const credentials = getAWSCredentials(options);
    this.client = new S3({
      credentials,
    });

    this.bucketOptions = getAWSBucketOptions(options);
    console.log("using AWS S3 bucket: " + this.bucketOptions.bucket);
  }

  async uploadRegressionReport(
    context: UploadReportContext,
    report: LocalRegressionReport
  ): Promise<HostedRegressionReport> {
    // TODO
    throw new Error("not yet implemented");
  }

  async uploadFile(key: string, filePath: string): Promise<string> {
    const file = await readFile(filePath);

    await this.client.putObject({
      Bucket: this.bucketOptions.bucket,
      Key: key,
      Body: file,
    });

    const region = await this.client.config.region();

    return `https://${this.bucketOptions.bucket}.s3.${region}.amazonaws.com/${key}`;
  }
}
// We should probably move the path generation logic inside a separate package, so that the frontend can use it as well to generate URLs
