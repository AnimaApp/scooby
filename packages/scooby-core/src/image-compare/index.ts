import { ImageSize } from "../types";
import { calculateImageDiff } from "./diffing";
import { normalizeImages } from "./normalization";
import { calculateImageOverlap } from "./overlap";

export type ImageComparisonOptions = {
  normalizationStrategy: NormalizationStrategy;
};

export type ImageComparisonResult = {
  similarity: number;

  originalExpectedPath: string;
  originalExpectedSize: ImageSize;
  originalActualPath: string;
  originalActualSize: ImageSize;
  normalizedExpectedPath: string;
  normalizedActualPath: string;
  normalizedSize: ImageSize;
  diffImagePath: string;
  overlapImagePath: string;
};

export type NormalizationStrategy =
  | "expand-bottom-right"
  | "expand-keeping-centered";

const DEFAULT_COMPARISON_OPTIONS: ImageComparisonOptions = {
  normalizationStrategy: "expand-bottom-right",
};

export async function compareImages(
  expectedPath: string,
  actualPath: string,
  options: Partial<ImageComparisonOptions>
): Promise<ImageComparisonResult> {
  const effectiveOptions: ImageComparisonOptions = {
    ...DEFAULT_COMPARISON_OPTIONS,
    ...options,
  };

  const {
    normalizedExpectedPath,
    normalizedActualPath,
    normalizedSize,
    originalActualSize,
    originalExpectedSize,
  } = await normalizeImages(
    expectedPath,
    actualPath,
    effectiveOptions.normalizationStrategy
  );

  const { diffImagePath, similarity } = await calculateImageDiff(
    normalizedExpectedPath,
    normalizedActualPath,
    normalizedSize
  );

  const { overlapImagePath } = await calculateImageOverlap(
    normalizedExpectedPath,
    normalizedActualPath
  );

  return {
    diffImagePath,
    similarity,
    normalizedActualPath,
    normalizedExpectedPath,
    normalizedSize,
    originalActualPath: actualPath,
    originalActualSize,
    originalExpectedPath: expectedPath,
    originalExpectedSize,
    overlapImagePath,
  };
}
