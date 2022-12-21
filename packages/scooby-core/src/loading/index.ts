import { existsSync } from "fs";

import { TestEntry } from "../types";
import { load } from "./loader/index";

export async function loadTestEntries(
  path: string,
  fileTypes: string[]
): Promise<TestEntry[]> {
  if (!existsSync(path)) {
    throw new Error(`the given test path does not exist: '${path}'`);
  }

  const entries = await load(path, fileTypes);

  if (!entries.length) {
    throw new Error(`no test entries found in path: ${path}`);
  }

  return entries;
}
