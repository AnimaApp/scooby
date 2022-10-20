import { ScoobyAPI } from "@animaapp/scooby-api";
import { HostedReport } from "@animaapp/scooby-shared";

export async function fetchReports(
  api: ScoobyAPI,
  commit: string
): Promise<HostedReport[]> {
  const reportsIds = await api.getReports({
    commitHash: commit,
  });

  const reports: HostedReport[] = [];

  for (const reportId of reportsIds) {
    const report = await api.getReport({
      commitHash: commit,
      reportName: reportId,
    });

    reports.push(report);
  }

  return reports;
}
