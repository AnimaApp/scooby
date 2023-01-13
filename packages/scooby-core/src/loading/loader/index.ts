import path from "path";
import { readdir } from "fs/promises";
import { TestEntry } from "../../types";
import { loadOptions } from "../options";
import { getExtension } from "./util";

export const load = async (
  directory: string,
  fileTypes: string[],
  relativePath = ""
) => {
  const entries: TestEntry[] = [];
  const absolutePath = path.join(directory, relativePath);
  const dirEntries = await readdir(absolutePath, { withFileTypes: true });
  const folders = dirEntries
    .filter((item) => item.isDirectory())
    .map((folder) => folder.name);
  const files = dirEntries
    .filter((item) => !item.isDirectory())
    .map((file) => file.name);

  for (const folder of folders) {
    // Skip *.scooby directories
    if (folder.endsWith(".scooby")) {
      continue;
    }

    const directoryTests = await load(
      directory,
      fileTypes,
      `${relativePath}/${folder}`
    );
    entries.push(...directoryTests);
  }

  const baseOptionsFile = files.find((entry) => entry === "scooby.json");
  const baseOptions = baseOptionsFile
    ? await loadOptions(path.join(absolutePath, "scooby.json"))
    : undefined;

  const testFiles = files.filter((subEntry) =>
    fileTypes.some((fileType) => subEntry.endsWith("." + fileType))
  );
  for (const testFile of testFiles) {
    let name = path.parse(testFile).name;

    // Skip *.scooby.* files
    if (name.endsWith(".scooby")) {
      continue;
    }

    // When loading multiple file types, we want to add the extension as suffix to prevent
    // name conflicts (for example test.jsx and test.css would both resolve to "test" otherwise).
    // We are adding the suffix only to the secondary file types for backward compatibility purposes
    // (as changing the ID of a test entry would break existing regression tests).
    if (
      fileTypes.length > 1 &&
      fileTypes.slice(1).some((fileType) => testFile.endsWith("." + fileType))
    ) {
      const extension = path.parse(testFile).ext.slice(1);
      name = `${name}-${extension}`;
    }

    const specificOptionsFile = files.find(
      (entry) => entry === `${name}.scooby.json`
    );
    const specificOptions = specificOptionsFile
      ? await loadOptions(path.join(absolutePath, `${name}.scooby.json`))
      : undefined;

    const options = {
      ...baseOptions,
      ...specificOptions,
    };

    const absoluteFilePath = path.join(absolutePath, testFile);
    const id = relativePath
      ? `${relativePath.replace("/", "-").substring(1)}-${name}`
      : name;

    entries.push({
      id: id,
      extension: getExtension(testFile),
      path: absoluteFilePath,
      relativePath: path.relative(directory, absoluteFilePath),
      ...(options && Object.keys(options).length > 0 && { options }),
    });
  }

  return entries;
};
