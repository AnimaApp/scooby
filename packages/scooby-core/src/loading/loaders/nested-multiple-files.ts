import path from "path";
import { readdir } from "fs/promises";
import { Loader } from ".";
import { TestEntry } from "../../types";
import { loadOptions } from "../options";
import { getTestExtension, getTypeForEntry } from "./util";

export const nestedMultipleFilesLoader: Loader = {
  async isCompatible(testsPath: string): Promise<boolean> {
    const entries = await readdir(testsPath, { withFileTypes: true });

    if (!entries.every((entry) => entry.isDirectory())) {
      return false;
    }

    for (const entry of entries) {
      const subEntries = await readdir(path.join(testsPath, entry.name), {
        withFileTypes: true,
      });

      if (!subEntries.every((subEntry) => subEntry.isFile())) {
        return false;
      }
    }

    return true;
  },

  async load(testsPath: string): Promise<TestEntry[]> {
    const dirEntries = await readdir(testsPath, { withFileTypes: true });

    const entries: TestEntry[] = [];

    for (const dirEntry of dirEntries) {
      const dirPath = path.join(testsPath, dirEntry.name);
      const subEntries = await readdir(dirPath, {
        withFileTypes: true,
      });

      const testExtension = getTestExtension(
        subEntries.map((subEntry) => subEntry.name)
      );
      if (!testExtension) {
        throw new Error(
          "could not determine test extension in path: " + dirPath
        );
      }

      const baseOptionsFile = subEntries.find(
        (entry) => entry.name === "scooby.json"
      );
      const baseOptions = baseOptionsFile
        ? await loadOptions(path.join(dirPath, "scooby.json"))
        : undefined;

      const testFiles = subEntries
        .filter((subEntry) => subEntry.name.endsWith(testExtension))
        .map((subEntry) => subEntry.name);

      for (const testFile of testFiles) {
        const name = path.parse(testFile).name;

        const specificOptionsFile = subEntries.find(
          (entry) => entry.name === `${name}.scooby.json`
        );
        const specificOptions = specificOptionsFile
          ? await loadOptions(path.join(dirPath, `${name}.scooby.json`))
          : undefined;

        const options = {
          ...baseOptions,
          ...specificOptions,
        };

        const absolutePath = path.join(dirPath, testFile);

        entries.push({
          id: `${dirEntry.name}-${name}`,
          type: getTypeForEntry(testFile),
          path: absolutePath,
          relativePath: path.relative(testsPath, absolutePath),
          ...(options && Object.keys(options).length > 0 && { options }),
        });
      }
    }

    return entries;
  },
};
