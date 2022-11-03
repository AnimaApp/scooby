import path from "path";
import { readdir } from "fs/promises";
import { TestEntry } from "../../types";
import { loadOptions } from "../options";
import { getTypeForEntry } from "./util";

export const load = async (
  directory: string,
  fileType: string,
  relativePath: string = ""
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

  console.log(folders, files, fileType);

  for (const folder of folders) {
    const directoryTests = await load(
      directory,
      fileType,
      (relativePath = folder)
    );
    entries.push(...directoryTests);
  }

  const baseOptionsFile = files.find((entry) => entry === "scooby.json");
  const baseOptions = baseOptionsFile
    ? await loadOptions(path.join(absolutePath, "scooby.json"))
    : undefined;

  const testFiles = files.filter((subEntry) => subEntry.endsWith(fileType));
  for (const testFile of testFiles) {
    const name = path.parse(testFile).name;

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
      ? `${relativePath.replace("/", "-")}-${name}`
      : name;

    entries.push({
      id: id,
      type: getTypeForEntry(testFile),
      path: absoluteFilePath,
      relativePath: path.relative(directory, absoluteFilePath),
      ...(options && Object.keys(options).length > 0 && { options }),
    });
  }

  return entries;
};
