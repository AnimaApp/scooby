import { TestEntryType } from "../../types";

export function getTypeForEntry(path: string): TestEntryType {
  if (path.endsWith(".png")) {
    return "png";
  } else if (path.endsWith(".html")) {
    return "html";
  }

  throw new Error("unsupported entry type: " + path);
}
