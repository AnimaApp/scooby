import {
  buildReportJSONPath,
  parseReport,
  RegressionReport,
} from "@animaapp/scooby-shared";
import { S3 } from "@aws-sdk/client-s3";
import { CommitContext, ReportContext, ScoobyWebAPI } from "../types";
import { getS3Config, S3Config } from "./config";

export class S3ScoobyWebAPI implements ScoobyWebAPI {
  private client: S3;
  private config: S3Config;

  constructor() {
    this.config = getS3Config();
    this.client = new S3({
      region: this.config.region,
      // To make public S3 requests
      signer: { sign: async (request) => request },
    });
  }

  getReports(params: CommitContext): Promise<RegressionReport[]> {
    throw new Error("Method not implemented.");
  }

  async getReport(params: ReportContext): Promise<RegressionReport> {
    const key = buildReportJSONPath({
      commitHash: params.commit,
      reportName: params.reportName,
      repository: params.repository,
    });

    const body = await this.getJSONObject(key);

    return parseReport(body);
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
