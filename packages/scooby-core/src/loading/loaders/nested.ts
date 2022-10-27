import path from "path";
import { readdir } from "fs/promises";
import { Loader } from ".";
import { TestEntry } from "../../types";
import { loadOptions } from "../options";
import { getTestExtension, getTypeForEntry } from "./util";

export const nestedLoader: Loader = {
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

      const testExtension = getTestExtension(
        subEntries.map((subEntry) => subEntry.name)
      );
      if (!testExtension) {
        return false;
      }

      // In this mode, we can only have one main file with the given extension
      const numberOfFilesWithTestExtension = subEntries.filter(
        (subEntry) => path.extname(subEntry.name) === `.${testExtension}`
      ).length;
      if (numberOfFilesWithTestExtension > 1) {
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

      const mainFile = getMainFile(subEntries.map((entry) => entry.name));
      if (!mainFile) {
        throw new Error("could not find test file in path: " + dirPath);
      }

      const optionsFile = subEntries.find(
        (entry) => entry.name === "scooby.json"
      );
      const options = optionsFile
        ? await loadOptions(path.join(dirPath, "scooby.json"))
        : undefined;

      const absolutePath = path.join(dirPath, mainFile);

      entries.push({
        id: dirEntry.name,
        type: getTypeForEntry(mainFile),
        path: absolutePath,
        relativePath: path.relative(testsPath, absolutePath),
        ...(options && { options }),
      });
    }

    return entries;
  },
};

function getMainFile(entries: string[]): string | undefined {
  const htmlFile = entries.find((entry) => entry.endsWith(".html"));
  if (htmlFile) {
    return htmlFile;
  }

  const imageFile = entries.find((entry) => entry.endsWith(".png"));
  if (imageFile) {
    return imageFile;
  }
}
