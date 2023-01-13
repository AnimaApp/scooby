import { ImageSourceEntry, TestEntry, ImageTestEntryType } from "../../types";
import { generateHTMLImageSources } from "./html";
import { generatePNGImageSources } from "./png";

export type GenerateImageSourcesOptions = {
  maxThreads?: number;
};

function getExtension(entries: TestEntry[]): string {
  const extensions = entries.map(({ extension }) => extension);

  if (extensions.every((val) => val === extensions[0])) {
    return extensions[0];
  }

  throw new Error(
    "dataset is malformed, found different extensions of test entries."
  );
}

export async function generateImageSources(
  entries: TestEntry[],
  options: GenerateImageSourcesOptions
): Promise<ImageSourceEntry[]> {
  const extension = getExtension(entries);

  if (extension === "png") {
    return generatePNGImageSources(entries);
  } else if (extension === "html") {
    return generateHTMLImageSources(entries, options);
  }

  throw new Error(
    "cannot generate image sources, there is no handler for dataset type: " +
      extension
  );
}
