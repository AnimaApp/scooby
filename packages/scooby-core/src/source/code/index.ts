import {
  CodeSourceEntry,
  TestEntry,
  CodeTestEntryType,
  Formatter,
} from "../../types";
import { batchPrepareCodeSources, PrepareCodeSourceRequest } from "./batch";

export type GenerateImageSourcesOptions = {
  datasetType: CodeTestEntryType;
  maxThreads?: number;
  formatter?: Formatter;
};

export async function generateCodeSources(
  entries: TestEntry[],
  options: GenerateImageSourcesOptions
): Promise<CodeSourceEntry[]> {
  if (!entries.every((entry) => entry.type.category === "code")) {
    throw new Error(
      "dataset is malformed, some entries are not in the 'code' category"
    );
  }

  const requests: PrepareCodeSourceRequest[] = entries.map(
    (entry): PrepareCodeSourceRequest => ({
      id: entry.id,
      sourcePath: entry.path,
      formatter: options.formatter,
    })
  );
  const results = await batchPrepareCodeSources(requests, {
    maxThreads: options.maxThreads,
  });

  return results.map((result) => {
    const matchedTestEntry = entries.find((entry) => entry.id === result.id);
    if (!matchedTestEntry) {
      throw new Error(
        "invariant violation, could not find matching code test entry when finishing up code sources with id: " +
          result.id
      );
    }

    return {
      type: "code",
      id: matchedTestEntry.id,
      groupId: matchedTestEntry.id,
      path: result.preparedSourcePath,
      tags: matchedTestEntry.options?.tags ?? [],
      relativePath: matchedTestEntry.relativePath,
      metadata: matchedTestEntry.options?.metadata,
    };
  });
}
