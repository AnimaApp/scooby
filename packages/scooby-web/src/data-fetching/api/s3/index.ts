import {
  buildReportJSONPath,
  buildReportsPath,
  HostedRegressionReport,
  parseHostedReport,
} from "@animaapp/scooby-shared";
import { S3 } from "@aws-sdk/client-s3";
import { APICreationOptions } from "..";
import { CommitContext, ReportContext, ReportId, ScoobyWebAPI } from "../types";
import { getS3Config, S3Config } from "./config";

export class S3ScoobyWebAPI implements ScoobyWebAPI {
  private client: S3;
  private config: S3Config;

  constructor(options: APICreationOptions) {
    this.config = getS3Config(options);
    this.client = new S3({
      region: this.config.region,
      // To make public S3 requests
      signer: { sign: async (request) => request },
    });
  }

  async getReports(params: CommitContext): Promise<ReportId[]> {
    const key = `${buildReportsPath({
      commitHash: params.commit,
      repository: params.repository,
    })}/`;

    const subdirectories = await this.listSubdirectories(key);
    return subdirectories;
  }

  async getReport(params: ReportContext): Promise<HostedRegressionReport> {
    const key = buildReportJSONPath({
      commitHash: params.commit,
      reportName: params.reportName,
      repository: params.repository,
    });

    const body = await this.getJSONObject(key);

    return parseHostedReport(body);
  }

  async getJSONObject(key: string): Promise<unknown> {
    const object = await this.client.getObject({
      Bucket: this.config.bucket,
      Key: key,
    });

    if (!object.Body) {
      throw new Error(`object has no body, key: ${key}`);
    }

    const stream = object.Body as ReadableStream;
    const string = await streamToString(stream);

    return JSON.parse(string);
  }

  async listSubdirectories(key: string): Promise<string[]> {
    const output = await this.client.listObjectsV2({
      Bucket: this.config.bucket,
      Prefix: key,
      Delimiter: "/",
    });

    if (!output.CommonPrefixes) {
      throw new Error("unable to list objects, common prefixes are empty");
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
}

// From: https://github.com/aws/aws-sdk-js-v3/issues/1877#issuecomment-764404713
function streamToString(stream: ReadableStream): Promise<string> {
  return new Promise((resolve, reject) => {
    if (stream instanceof ReadableStream === false) {
      reject(
        "Expected stream to be instance of ReadableStream, but got " +
          typeof stream
      );
    }
    let text = "";
    const decoder = new TextDecoder("utf-8");

    const reader = stream.getReader();
    const processRead = ({ done, value }: any) => {
      if (done) {
        resolve(text);
        return;
      }

      text += decoder.decode(value);

      reader.read().then(processRead);
    };

    reader.read().then(processRead);
  });
}
