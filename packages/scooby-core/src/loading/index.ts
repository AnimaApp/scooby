import { existsSync } from "fs";

import { TestEntry } from "../types";
import { load } from "./loaders/loader";

export async function loadTestEntries(
  path: string,
  fileType?: string
): Promise<TestEntry[]> {
  if (!existsSync(path)) {
    throw new Error(`the given test path does not exist: '${path}'`);
  }

  const entries = await load(path, (fileType = fileType));

  if (!entries.length) {
    throw new Error(`no test entries found in path: ${path}`);
  }

  return entries;
}
