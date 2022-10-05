import { existsSync } from "fs";

import { TestEntry } from "../types";
import { getLoaderForPath } from "./loaders";

export async function loadTestEntries(path: string): Promise<TestEntry[]> {
  if (!existsSync(path)) {
    throw new Error(`the given test path does not exist: '${path}'`);
  }

  const loader = await getLoaderForPath(path);

  return loader.load(path);
}
