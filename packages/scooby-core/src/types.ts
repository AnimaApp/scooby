import { ScoobyAPI } from "@animaapp/scooby-api";

export type TestEntryType = "png" | "html";

export type TestEntry = {
  id: string;
  type: TestEntryType;
  path: string;
  options?: TestEntryOptions;
};

export type TestEntryOptions = {
  viewports?: Viewport[];
  tags?: string[];
};

export type Viewport = {
  width: number;
  height: number;
};

export type ImageSize = {
  width: number;
  height: number;
};

export type ImageSourceEntry = {
  id: string;
  groupId: string;
  tags: string[];
  path: string;
};

export type SourceEntry = ImageSourceEntry;

// Reports

export type Environment = {
  currentCommitHash: string;
  baseCommitHash: string;
  branchName: string;
  isMainBranch: boolean;
  latestMainBranchCommitHashes: string[];
  repositoryName: string;
  repositoryOwner: string;
};

export type ReportContext = {
  environment: Environment;
  api: ScoobyAPI;
};

export type BaseReportParams = {
  name: string;
};
