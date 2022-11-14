import {
  HostedReport,
  CommitStatusOverview,
  Review,
  parseHostedReport,
} from "@animaapp/scooby-shared";
import * as zip from "@zip.js/zip.js";
import { ScoobyWebAPI } from "./types";

export class ZipScoobyWebAPI implements ScoobyWebAPI {
  private reader: zip.ZipReader<unknown>;
  constructor(archiveBuffer: ArrayBuffer) {
    this.reader = new zip.ZipReader(
      new zip.BlobReader(
        new Blob([new Uint8Array(archiveBuffer, 0, archiveBuffer.byteLength)])
      )
    );
  }

  async getReports(): Promise<string[]> {
    const report = await this.getReport();
    return [report.name];
  }

  async getReport(): Promise<HostedReport> {
    const entries = await this.reader.getEntries();
    if (!entries?.length) {
      throw new Error("could not find entries in this zip archive");
    }

    const reportEntry = entries.find(
      (entry) => entry.filename === "report.json"
    );
    if (!reportEntry) {
      throw new Error("the given zip archive does not contain a report entry");
    }

    const reportContentBlob = await reportEntry.getData(new zip.BlobWriter());
    const reportContent = await reportContentBlob.text();
    const report = parseHostedReport(JSON.parse(reportContent));
    return report;
  }

  async getCommitStatusOverview(): Promise<CommitStatusOverview | undefined> {
    const report = await this.getReport();
    return {
      createdAt: new Date().getTime(),
      reports: {
        [report.name]: {
          status: report.summary.result,
          message: "Based on ZIP archive local run",
        },
      },
    };
  }

  async getAggregateReview(): Promise<Review | undefined> {
    return {
      approvals: [],
      rejections: [],
    };
  }
  async approveReport(): Promise<void> {
    return;
  }
}
