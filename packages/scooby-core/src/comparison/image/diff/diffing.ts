import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { readFile, writeFile } from "fs/promises";
import { ImageSize } from "../../../types";
import { createTemporaryFile } from "../../../utils/temp";

export type ImageDiffingResult = {
  diffImagePath: string;
  similarity: number;
};

export async function calculateImageDiff(
  normalizedExpectedPath: string,
  normalizedActualPath: string,
  normalizedSize: ImageSize
): Promise<ImageDiffingResult> {
  const expectedImage = await loadImage(normalizedExpectedPath);
  const actualImage = await loadImage(normalizedActualPath);

  const diffBuffer = new PNG({
    width: normalizedSize.width,
    height: normalizedSize.height,
  });

  const numDiffPixel = pixelmatch(
    expectedImage,
    actualImage,
    diffBuffer.data,
    normalizedSize.width,
    normalizedSize.height
  );

  const diffPixelRatio =
    numDiffPixel / (normalizedSize.width * normalizedSize.height);
  const similarity = 1 - diffPixelRatio;

  const diffImagePath = await createTemporaryFile("diff-image", ".png");
  await writeFile(diffImagePath, PNG.sync.write(diffBuffer));

  return {
    diffImagePath,
    similarity,
  };
}

async function loadImage(imagePath: string): Promise<Buffer> {
  return await PNG.sync.read(await readFile(imagePath)).data;
}
