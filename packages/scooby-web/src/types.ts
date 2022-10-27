// ROUTE PARAMS

import { Sentiment } from "@animaapp/scooby-shared";

export type CommitParams = {
  repository: string;
  commit: string;
};

export type ReportParams = CommitParams & {
  reportName: string;
};

export type BaseEntry = {
  id: string;
  sentiment?: Sentiment;
  tag?: string;
  status?: EntryStatus;
  path?: string;
};

export type EntryStatus = "approved" | "changes_requested";

export type ImageEntry = BaseEntry & {
  type: "image";
  thumbnailUrl: string;
};

export type CodeEntry = BaseEntry & {
  type: "code";
};

export type Entry = ImageEntry | CodeEntry;
