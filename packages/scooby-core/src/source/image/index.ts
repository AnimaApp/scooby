import { ImageSourceEntry, TestEntry, TestEntryType } from "../../types";
import { generateHTMLImageSources } from "./html";
import { generatePNGImageSources } from "./png";

export type GenerateImageSourcesOptions = {
  maxThreads?: number;
};

export async function generateImageSources(
  entries: TestEntry[],
  options: GenerateImageSourcesOptions
): Promise<ImageSourceEntry[]> {
  const datasetType = getDatasetType(entries);

  if (datasetType === "png") {
    return generatePNGImageSources(entries);
  } else if (datasetType === "html") {
    return generateHTMLImageSources(entries, options);
  }

  throw new Error(
    "cannot generate image sources, there is no handler for dataset type: " +
      datasetType
  );
}

export function getDatasetType(entries: TestEntry[]): TestEntryType {
  const entryType = entries?.[0].type;
  if (!entryType) {
    throw new Error("unable to determine dataset entry type, dataset is empty");
  }

  if (!entries.every((entry) => entry.type === entryType)) {
    throw new Error(
      "dataset is malformed, found different types of test entries. Expected all to be: " +
        entryType
    );
  }

  return entryType;
}
