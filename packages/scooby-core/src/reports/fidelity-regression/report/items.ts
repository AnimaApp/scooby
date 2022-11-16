import {
  LocalResource,
  ReportItem,
  ReportItemStatus,
  FidelityRegressionReportResults,
  LocalFidelityRegressionTestEntry,
} from "@animaapp/scooby-shared";
import { calculateFileMD5 } from "../../../utils/hash";

export async function generateItems(
  results: FidelityRegressionReportResults<LocalResource>
): Promise<ReportItem[]> {
  const items: ReportItem[] = [];

  for (const item of results.new) {
    items.push(await generateReportItem(item.actual, "failure"));
  }

  for (const item of results.removed) {
    items.push(await generateReportItem(item, "failure"));
  }

  for (const item of results.changed) {
    items.push(await generateReportItem(item.actual, "failure"));
  }

  for (const item of results.unchanged) {
    items.push(await generateReportItem(item.actual, "success"));
  }

  return items;
}

async function generateReportItem(
  entry: LocalFidelityRegressionTestEntry,
  status: ReportItemStatus
): Promise<ReportItem> {
  return {
    id: entry.id,
    status,
    hash: await calculateHash(entry),
  };
}

async function calculateHash(
  entry: LocalFidelityRegressionTestEntry
): Promise<string> {
  switch (entry.type) {
    case "image":
      return calculateFileMD5(entry.image.path);
    case "code":
      return calculateFileMD5(entry.code.path);
  }
}
