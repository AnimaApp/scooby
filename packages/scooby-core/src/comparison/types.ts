import { CodeSourceEntry, ImageSourceEntry, SourceEntry } from "../types";
import { CodeComparisonOptions, CodeComparisonResult } from "./code/diff";
import { ImageComparisonOptions, ImageComparisonResult } from "./image/diff";

export type BatchComparisonOptions = {
  maxThreads?: number;
  imageComparisonOptions?: ImageComparisonOptions;
  codeComparisonOptions?: CodeComparisonOptions;
};

type BaseTaskRequest<TSource> = {
  expected: TSource;
  actual: TSource;
};

type BaseTaskResult<TComparison, TSource> = {
  comparison: TComparison;
  expected: TSource;
  actual: TSource;
};

export type ImageComparisonTaskRequest = BaseTaskRequest<ImageSourceEntry> & {
  type: "image";
  options?: ImageComparisonOptions;
};
export type ImageComparisonTaskResult = BaseTaskResult<
  ImageComparisonResult,
  ImageSourceEntry
> & {
  type: "image";
};

export type CodeComparisonTaskRequest = BaseTaskRequest<CodeSourceEntry> & {
  type: "code";
  options?: CodeComparisonOptions;
};
export type CodeComparisonTaskResult = BaseTaskResult<
  CodeComparisonResult,
  CodeSourceEntry
> & {
  type: "code";
};

export type ComparisonTaskRequest =
  | ImageComparisonTaskRequest
  | CodeComparisonTaskRequest;
export type ComparisonTaskResult =
  | ImageComparisonTaskResult
  | CodeComparisonTaskResult;

export type BaseBatchComparisonEntry<
  TEntry extends SourceEntry,
  TComparison
> = {
  expected: TEntry;
  actual: TEntry;
  comparison: TComparison;
};
export type ImageBatchComparisonEntry = BaseBatchComparisonEntry<
  ImageSourceEntry,
  ImageComparisonResult
> & {
  type: "image";
};
export type CodeBatchComparisonEntry = BaseBatchComparisonEntry<
  CodeSourceEntry,
  CodeComparisonResult
> & {
  type: "code";
};
export type BatchComparisonEntry =
  | ImageBatchComparisonEntry
  | CodeBatchComparisonEntry;

export type BaseBatchComparisonResult<
  TComparisonEntry extends BatchComparisonEntry
> = {
  comparisons: TComparisonEntry[];
};
export type ImageBatchComparisonResult =
  BaseBatchComparisonResult<ImageBatchComparisonEntry> & {
    type: "image";
  };
export type CodeBatchComparisonResult =
  BaseBatchComparisonResult<CodeBatchComparisonEntry> & {
    type: "code";
  };
export type EmptyBatchComparisonResult = { type: "empty"; comparisons: [] };

export type BatchComparisonResult =
  | ImageBatchComparisonResult
  | CodeBatchComparisonResult
  | EmptyBatchComparisonResult;
