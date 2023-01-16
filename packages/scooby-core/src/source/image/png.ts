import { ImageSourceEntry, TestEntry } from "../../types";

export async function generatePNGImageSources(
  entries: TestEntry[]
): Promise<ImageSourceEntry[]> {
  const output: ImageSourceEntry[] = [];

  for (const entry of entries) {
    if (entry.extension !== "png") {
      throw new Error(
        "unable to load PNG test entry, found found entry type: " +
          entry.extension
      );
    }

    output.push({
      type: "image",
      id: entry.id,
      groupId: entry.id,
      path: entry.path,
      relativePath: entry.relativePath,
      tags: entry.options?.tags ?? [],
      metadata: entry.options?.metadata,
    });
  }

  return output;
}
