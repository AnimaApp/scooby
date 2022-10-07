export function buildRepositoryPath(context: { repository: string }): string {
  return `repositories/${context.repository}`;
}

export function buildCommitPath(context: {
  repository: string;
  commitHash: string;
}): string {
  return `${buildRepositoryPath(context)}/commits/${context.commitHash}`;
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

// Regression tests

export function buildReportResourcePath(context: {
  repository: string;
  commitHash: string;
  reportName: string;
  filename: string;
}): string {
  return `${buildReportPath(context)}/resources/${context.filename}`;
}
