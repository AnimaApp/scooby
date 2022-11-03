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
];

export function getTypeForEntry(path: string): TestEntryType {
  if (path.endsWith(".png")) {
    return { category: "image", subtype: "png" };
  } else if (path.endsWith(".html")) {
    return { category: "image", subtype: "html" };
  } else {
    const extension = parse(path).ext?.split(".")?.[1];
    if (extension && SUPPORTED_CODE_EXTENSIONS.includes(extension)) {
      return {
        category: "code",
        extension,
      };
    }
  }

  throw new Error("unsupported entry type: " + path);
}
