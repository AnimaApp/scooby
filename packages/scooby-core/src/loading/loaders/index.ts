import { TestEntry } from "../../types";
import { basicLoader } from "./basic";
import { nestedLoader } from "./nested";
import { nestedMultipleFilesLoader } from "./nested-multiple-files";

export type Loader = {
  isCompatible: (testsPath: string) => Promise<boolean>;
  load: (testsPath: string, fileType?: string) => Promise<TestEntry[]>;
};

const LOADERS: Loader[] = [
  nestedLoader,
  nestedMultipleFilesLoader,
  basicLoader,
];

export async function getLoaderForPath(path: string): Promise<Loader> {
  for (const loader of LOADERS) {
    const isCompatible = await loader.isCompatible(path);
    if (isCompatible) {
      return loader;
    }
  }

  throw new Error(`no suitable test loader found for path: ${path}`);
}
