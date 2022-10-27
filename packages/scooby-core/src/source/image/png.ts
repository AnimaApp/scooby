import { ImageSourceEntry, TestEntry } from "../../types";

export async function generatePNGImageSources(
  entries: TestEntry[]
): Promise<ImageSourceEntry[]> {
  const output: ImageSourceEntry[] = [];

  for (const entry of entries) {
    if (entry.type.category !== "image" || entry.type.subtype !== "png") {
      throw new Error(
        "unable to load PNG test entry, found found entry type: " +
          JSON.stringify(entry.type)
      );
    }

    output.push({
      type: "image",
      id: entry.id,
      groupId: entry.id,
      path: entry.path,
      relativePath: entry.relativePath,
      tags: entry.options?.tags ?? [],
    });
  }

  return output;
}
