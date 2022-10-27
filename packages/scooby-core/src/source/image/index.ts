import { ImageSourceEntry, TestEntry, ImageTestEntryType } from "../../types";
import { generateHTMLImageSources } from "./html";
import { generatePNGImageSources } from "./png";

export type GenerateImageSourcesOptions = {
  datasetType: ImageTestEntryType;
  maxThreads?: number;
};

export async function generateImageSources(
  entries: TestEntry[],
  options: GenerateImageSourcesOptions
): Promise<ImageSourceEntry[]> {
  if (
    !entries.every(
      (entry) =>
        entry.type.category === "image" &&
        entry.type.subtype === options.datasetType.subtype
    )
  ) {
    throw new Error(
      "dataset is malformed, found different types of image test entries. Expected all to be: " +
        options.datasetType.subtype
    );
  }

  if (options.datasetType.subtype === "png") {
    return generatePNGImageSources(entries);
  } else if (options.datasetType.subtype === "html") {
    return generateHTMLImageSources(entries, options);
  }

  throw new Error(
    "cannot generate image sources, there is no handler for dataset type: " +
      options.datasetType
  );
}
