type GetReportURLContext = {
  repositoryName: string;
  commitHash: string;
  reportName: string;
  s3bucket: string;
  s3region: string;
  webBaseUrl: string;
};

export function getURLForReport(context: GetReportURLContext): string {
  return `${context.webBaseUrl}/#/repo/${context.repositoryName}/commit/${context.commitHash}/report/${context.reportName}/?_s3_region=${context.s3region}&_s3_bucket=${context.s3bucket}`;
}
