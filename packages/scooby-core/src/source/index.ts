import { getEntryType } from "../loading/loader/util";
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

  let datasetType;
  if (options.datasetType) {
    datasetType = options.datasetType;
  } else {
    datasetType = getDatasetType(entries);
  }

  if (datasetType === "image") {
    return generateImageSources(entries, {
      maxThreads: options.maxThreads,
    });
  } else if (datasetType === "code") {
    return generateCodeSources(entries, {
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
  const entryTypes = entries.map(({ extension }) => getEntryType(extension));

  if (entryTypes.every((val) => val === entryTypes[0])) {
    return entryTypes[0];
  }

  throw new Error(
    "dataset is malformed, found different categories of test entries."
  );
}
