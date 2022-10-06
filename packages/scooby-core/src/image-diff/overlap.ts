import sharp from "sharp";
import { createTemporaryFile } from "../utils/temp";

export type ImageOverlapResult = {
  overlapImagePath: string;
};

export async function calculateImageOverlap(
  normalizedExpectedPath: string,
  normalizedActualPath: string
): Promise<ImageOverlapResult> {
  const overlay = await sharp(normalizedActualPath)
    .composite([
      {
        input: Buffer.from([255, 255, 255, 128]),
        raw: {
          width: 1,
          height: 1,
          channels: 4,
        },
        tile: true,
        blend: "dest-in",
      },
    ])
    .toBuffer();

  const overlapImagePath = await createTemporaryFile("overlap", ".png");

  await sharp(normalizedExpectedPath)
    .composite([{ input: overlay, gravity: "northwest" }])
    .toFile(overlapImagePath);

  return {
    overlapImagePath,
  };
}
