import { Formatter, TestEntry, TestEntryType } from "../types";
import { SourceEntry } from "../types";
import { generateCodeSources } from "./code";
import { generateImageSources } from "./image";

export type GenerateSourcesOptions = {
  maxThreads?: number;
  formatter?: Formatter;
  datasetType?: string;
};

export async function generateSources(
  entries: TestEntry[],
  options: GenerateSourcesOptions
): Promise<SourceEntry[]> {
  if (entries.length === 0) {
    return [];
  }

  const datasetType = getDatasetType(entries);
  if (options.datasetType && (options.datasetType === "code" || options.datasetType ==="image")) {
    datasetType.category = options.datasetType;
  }

  if (datasetType.category === "image") {
    return generateImageSources(entries, {
      datasetType,
      maxThreads: options.maxThreads,
    });
  } else if (datasetType.category === "code") {
    return generateCodeSources(entries, {
      datasetType,
      maxThreads: options.maxThreads,
      formatter: options.formatter,
    });
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

  if (!entries.every((entry) => entry.type.category === entryType.category)) {
    throw new Error(
      "dataset is malformed, found different categories of test entries. Expected all to be: " +
        entryType.category
    );
  }

  return entryType;
}
