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

export function getTestExtension(entries: string[]): string | undefined {
  const htmlFile = entries.find((entry) => entry.endsWith(".html"));
  if (htmlFile) {
    return "html";
  }

  const pngFile = entries.find((entry) => entry.endsWith(".png"));
  if (pngFile) {
    return "png";
  }

  for (const codeExtension of SUPPORTED_CODE_EXTENSIONS) {
    const codeFile = entries.find(
      (entry) =>
        entry.endsWith(`.${codeExtension}`) && !entry.includes(".scooby.")
    );
    if (codeFile) {
      return codeExtension;
    }
  }
}
