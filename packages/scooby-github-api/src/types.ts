export type GitHubAPI = {
  getAssociatedPR(commit: string): Promise<number | undefined>;
  getAssociatedCommits(commit: string): Promise<string[] | undefined>;
  postCommitStatus(commit: string, status: CommitStatus): Promise<void>;
  hasPRBeenApproved(pr: number): Promise<PRApprovalStatus>;
};

export type CommitStatus = {
  name: string;
  state: "success" | "failure" | "pending";
  targetUrl: string;
  description: string;
};

export type PRApprovalStatus =
  | { approved: true; user?: string }
  | { approved: false };
