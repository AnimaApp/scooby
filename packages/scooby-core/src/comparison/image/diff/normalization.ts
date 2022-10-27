import sharp from "sharp";
import { NormalizationStrategy } from ".";
import { ImageSize } from "../../../types";
import { createTemporaryFile } from "../../../utils/temp";

export type NormalizationResult = {
  normalizedExpectedPath: string;
  normalizedActualPath: string;
  normalizedSize: ImageSize;
  originalExpectedSize: ImageSize;
  originalActualSize: ImageSize;
};

export async function normalizeImages(
  expectedPath: string,
  actualPath: string,
  strategy: NormalizationStrategy
): Promise<NormalizationResult> {
  const originalExpectedSize = await getImageSize(expectedPath);
  const originalActualSize = await getImageSize(actualPath);

  if (areImageSizesEqual(originalExpectedSize, originalActualSize)) {
    // Images are sized equally, no normalization is necessary
    return {
      normalizedActualPath: actualPath,
      normalizedExpectedPath: expectedPath,
      normalizedSize: originalActualSize,
      originalActualSize,
      originalExpectedSize,
    };
  } else {
    return performNormalization(
      expectedPath,
      actualPath,
      originalExpectedSize,
      originalActualSize,
      strategy
    );
  }
}

function areImageSizesEqual(expected: ImageSize, actual: ImageSize): boolean {
  return expected.width === actual.width && expected.height === actual.height;
}

export async function performNormalization(
  expectedPath: string,
  actualPath: string,
  originalExpectedSize: ImageSize,
  originalActualSize: ImageSize,
  strategy: NormalizationStrategy
): Promise<NormalizationResult> {
  const minimumContainingSize = getMinimumContainingSize(
    originalExpectedSize,
    originalActualSize
  );

  const normalizedExpectedPath = await createTemporaryFile(
    "normalized-expected-",
    ".png"
  );
  const normalizedActualPath = await createTemporaryFile(
    "normalized-actual-",
    ".png"
  );

  await normalizeImage(
    expectedPath,
    originalExpectedSize,
    normalizedExpectedPath,
    minimumContainingSize,
    strategy
  );
  await normalizeImage(
    actualPath,
    originalActualSize,
    normalizedActualPath,
    minimumContainingSize,
    strategy
  );

  return {
    normalizedActualPath,
    normalizedExpectedPath,
    normalizedSize: minimumContainingSize,
    originalActualSize,
    originalExpectedSize,
  };
}

async function getImageSize(imagePath: string): Promise<ImageSize> {
  const { info: referenceInfo } = await sharp(imagePath).toBuffer({
    resolveWithObject: true,
  });
  return {
    height: referenceInfo.height,
    width: referenceInfo.width,
  };
}

function getMinimumContainingSize(
  expectedSize: ImageSize,
  actualSize: ImageSize
): ImageSize {
  const minHeight = Math.max(expectedSize.height, actualSize.height);
  const minWidth = Math.max(expectedSize.width, actualSize.width);

  return {
    height: minHeight,
    width: minWidth,
  };
}

async function normalizeImage(
  imagePath: string,
  imageSize: ImageSize,
  targetPath: string,
  targetSize: ImageSize,
  strategy: NormalizationStrategy
) {
  if (strategy === "expand-bottom-right") {
    return await extendImageBottomRight(
      imagePath,
      imageSize,
      targetPath,
      targetSize
    );
  } else if (strategy === "expand-keeping-centered") {
    return await extendImageKeepingCentered(
      imagePath,
      imageSize,
      targetPath,
      targetSize
    );
  }

  throw new Error("invalid normalization strategy received: " + strategy);
}

async function extendImageKeepingCentered(
  imagePath: string,
  imageSize: ImageSize,
  targetPath: string,
  targetSize: ImageSize
) {
  const horizontal = targetSize.width - imageSize.width;
  const vertical = targetSize.height - imageSize.height;

  await sharp(imagePath)
    .extend({
      bottom: Math.ceil(vertical / 2),
      right: Math.ceil(horizontal / 2),
      left: Math.floor(horizontal / 2),
      top: Math.floor(vertical / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(targetPath);
}

async function extendImageBottomRight(
  imagePath: string,
  imageSize: ImageSize,
  targetPath: string,
  targetSize: ImageSize
) {
  const rightExtend = targetSize.width - imageSize.width;
  const bottomExtend = targetSize.height - imageSize.height;

  await sharp(imagePath)
    .extend({
      bottom: bottomExtend,
      right: rightExtend,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(targetPath);
}
