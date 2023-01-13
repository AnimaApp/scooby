import { ScoobyAPI } from "@animaapp/scooby-api";
import { LocalResource, Metadata } from "@animaapp/scooby-shared";

export type TestEntryType = "code" | "image";

export type TestEntry = {
  id: string;
  extension: string;
  path: string;
  relativePath: string;
  type?: TestEntryType;
  options?: TestEntryOptions;
};

export type TestEntryOptions = {
  viewports?: Viewport[];
  tags?: string[];
  metadata?: Metadata<LocalResource>[];
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
  relativePath: string;
  metadata?: Metadata<LocalResource>[];
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
  latestBaseCommitHashes: string[];
  repositoryName: string;
  repositoryOwner: string;
};

export type ReportContext = {
  environment: Environment;
  api: ScoobyAPI;
  isLocalRun: boolean;
};

export type BaseReportParams = {
  name: string;
};

export type HostedReportOutputTarget = {
  type: "hosted";
};

export type ZipReportOutputTarget = {
  type: "zip";
  path: string;
};

export type ReportOutputTarget =
  | HostedReportOutputTarget
  | ZipReportOutputTarget;

export type ReportOutputTargetOrAuto = ReportOutputTarget | { type: "auto" };

export type FidelityMatchingType = "flexible" | "default";
