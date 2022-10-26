import { ScoobyAPI } from "@animaapp/scooby-api";

export type ImageTestEntryType = {
  category: "image";
  subtype: "png" | "html";
};

export type CodeTestEntryType = {
  category: "code";
  extension: string;
};

export type TestEntryType = ImageTestEntryType | CodeTestEntryType;

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

export type BaseSourceEntry = {
  id: string;
  groupId: string;
  tags: string[];
};

export type ImageSourceEntry = BaseSourceEntry & {
  type: "image";
  path: string;
};

export type CodeSourceEntry = BaseSourceEntry & {
  type: "code";
  path: string;
};

export type SourceEntry = ImageSourceEntry | CodeSourceEntry;

export type Formatter = "prettier" | "json" | "none";

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
