// ROUTE PARAMS

export type CommitParams = {
  repository: string;
  commit: string;
};

export type ReportParams = CommitParams & {
  reportName: string;
};
