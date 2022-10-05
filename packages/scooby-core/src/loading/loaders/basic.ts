import path from "path";
import { existsSync } from "fs";
import { readdir } from "fs/promises";
import { Loader } from ".";
import { TestEntry } from "../../types";
import { loadOptions } from "../options";

export const basicLoader: Loader = {
  async isCompatible(testsPath: string): Promise<boolean> {
    const entries = await readdir(testsPath, { withFileTypes: true });

    if (!entries.every((entry) => entry.isFile())) {
      return false;
    }

    return true;
  },

  async load(testsPath: string): Promise<TestEntry[]> {
    const dirEntries = await readdir(testsPath, { withFileTypes: true });

    const testExtension = getTestExtension(
      dirEntries.map((entry) => entry.name)
    );
    if (!testExtension) {
      throw new Error(
        "could not resolve test file type, make sure at least one file is HTML, PNG, JPG or JSON"
      );
    }

    const entries: TestEntry[] = [];

    for (const dirEntry of dirEntries) {
      if (!dirEntry.name.endsWith(testExtension)) {
        continue;
      }

      const id = path.parse(dirEntry.name).name;

      const optionsFile = path.join(testsPath, `${id}.snoopy.json`);
      const options = existsSync(optionsFile)
        ? await loadOptions(optionsFile)
        : undefined;

      entries.push({
        id,
        path: path.join(testsPath, dirEntry.name),
        options,
      });
    }

    return entries;
  },
};

function getTestExtension(entries: string[]): string | undefined {
  const htmlFile = entries.find((entry) => entry.endsWith(".html"));
  if (htmlFile) {
    return "html";
  }

  const pngFile = entries.find((entry) => entry.endsWith(".png"));
  if (pngFile) {
    return "png";
  }

  const jpgFile = entries.find((entry) => entry.endsWith(".jpg"));
  if (jpgFile) {
    return "jpg";
  }

  const jsonFile = entries.find(
    (entry) => entry.endsWith(".json") && !entry.endsWith(".scooby.json")
  );
  if (jsonFile) {
    return "json";
  }
}
