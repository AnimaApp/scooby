import { parse } from "path";
import { TestEntryType } from "../../types";

const SUPPORTED_CODE_EXTENSIONS = [
  "js",
  "jsx",
  "ts",
  "tsx",
  "json",
  "txt",
  "css",
  "html",
  "scss",
  "png",
];

export function getEntryType(extension: string): TestEntryType {
  if (extension === "html" || extension === "png") {
    return "image";
  }
  return "code";
}

export function getExtension(path: string): string {
  const extension = parse(path).ext?.split(".")?.[1];
  if (extension && SUPPORTED_CODE_EXTENSIONS.includes(extension)) {
    return extension;
  }

  throw new Error("unsupported entry type: " + path);
}
