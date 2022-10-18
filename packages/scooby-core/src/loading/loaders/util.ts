import { TestEntryType } from "../../types";

export function getTypeForEntry(path: string): TestEntryType {
  if (path.endsWith(".png")) {
    return "png";
  } else if (path.endsWith(".html")) {
    return "html";
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

  const jsonFile = entries.find(
    (entry) => entry.endsWith(".json") && !entry.endsWith("scooby.json")
  );
  if (jsonFile) {
    return "json";
  }
}
