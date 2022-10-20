export function buildRepositoryPath(context: { repository: string }): string {
  return `repositories/${context.repository}`;
}

export function buildCommitPath(context: {
  repository: string;
  commitHash: string;
}): string {
  return `${buildRepositoryPath(context)}/commits/${context.commitHash}`;
}

export function buildReportsPath(context: {
  repository: string;
  commitHash: string;
}): string {
  return `${buildCommitPath(context)}/reports`;
}

export function buildReportPath(context: {
  repository: string;
  commitHash: string;
  reportName: string;
}): string {
  return `${buildCommitPath(context)}/reports/${context.reportName}`;
}

export function buildReportJSONPath(context: {
  repository: string;
  commitHash: string;
  reportName: string;
}): string {
  return `${buildReportPath(context)}/report.json`;
}

export function buildReviewJSONPath(context: {
  repository: string;
  commitHash: string;
}): string {
  return `${buildCommitPath(context)}/review.json`;
}

export function buildCommitStatusOverviewJSONPath(context: {
  repository: string;
  commitHash: string;
}): string {
  return `${buildCommitPath(context)}/status.json`;
}

export function buildSnapshotPath(context: {
  repository: string;
  commitHash: string;
  snapshotName: string;
}): string {
  return `${buildCommitPath(context)}/snapshots/${context.snapshotName}`;
}

export function buildSnapshotArchivePath(context: {
  repository: string;
  commitHash: string;
  snapshotName: string;
}): string {
  return `${buildSnapshotPath(context)}/archive.zip`;
}

// Regression tests

export function buildReportResourcePath(context: {
  repository: string;
  commitHash: string;
  reportName: string;
  filename: string;
}): string {
  return `${buildReportPath(context)}/resources/${context.filename}`;
}
