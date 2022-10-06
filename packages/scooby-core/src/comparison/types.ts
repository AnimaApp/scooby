import { ImageComparisonOptions, ImageComparisonResult } from "../image-diff";
import { ImageSourceEntry } from "../types";

export type BatchComparisonOptions = {
  maxThreads?: number;
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

export type ComparisonTaskRequest = ImageComparisonTaskRequest;
export type ComparisonTaskResult = ImageComparisonTaskResult;
