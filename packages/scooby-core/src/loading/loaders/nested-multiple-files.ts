import path from "path";
import { readdir } from "fs/promises";
import { Loader } from ".";
import { TestEntry } from "../../types";
import { loadOptions } from "../options";
import { getTestExtension, getTypeForEntry } from "./util";

export const nestedMultipleFilesLoader: Loader = {
  async isCompatible(testsPath: string): Promise<boolean> {
    return true;
  },

  async load(directory: string): Promise<TestEntry[]> {
    const entries: TestEntry[] = [];
    const dirEntries = await readdir(directory, { withFileTypes: true });
    const folders = dirEntries.filter(item => item.isDirectory()).map(folder => folder.name);
    const files = dirEntries.filter(item => !item.isDirectory()).map(file => file.name);

    for(const folder of folders){
      const directoryTests = await this.load(path.join(directory, folder));
      entries.push(...directoryTests);
    }

    const testExtension = "html";
    const baseOptionsFile = files.find((entry) => entry === "scooby.json");
    const baseOptions = baseOptionsFile
      ? await loadOptions(path.join(directory, "scooby.json"))
      : undefined;

    const testFiles = files.filter((subEntry) => subEntry.endsWith(testExtension));
    for (const testFile of testFiles) {
      const name = path.parse(testFile);

      const specificOptionsFile = files.find(
        (entry) => entry === `${name}.scooby.json`
      );
      const specificOptions = specificOptionsFile
        ? await loadOptions(path.join(directory, `${name}.scooby.json`))
        : undefined;

      const options = {
        ...baseOptions,
        ...specificOptions,
      };

      const absolutePath = path.join(directory, testFile);

      entries.push({
        id: `${directory}-${name}`,
        type: getTypeForEntry(testFile),
        path: absolutePath,
        relativePath: path.relative(directory, absolutePath),
        ...(options && Object.keys(options).length > 0 && { options }),
      });
    }

    return entries;
  },
};
