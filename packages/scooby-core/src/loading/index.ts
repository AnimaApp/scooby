import { existsSync } from "fs";

import { TestEntry } from "../types";
import { getLoaderForPath } from "./loaders";

export async function loadTestEntries(path: string, fileType?: string): Promise<TestEntry[]> {
  if (!existsSync(path)) {
    throw new Error(`the given test path does not exist: '${path}'`);
  }

  const loader = await getLoaderForPath(path);

  const entries = await loader.load(path, fileType=fileType);

  if (!entries.length) {
    throw new Error(`no test entries found in path: ${path}`);
  }

  return entries;
}
