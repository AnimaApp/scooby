import { z } from "zod";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { TestEntryOptions } from "../types";

const optionsSchema = z.object({
  viewports: z.optional(
    z.array(
      z.object({
        width: z.number(),
        height: z.number(),
      })
    )
  ),
  tags: z.optional(z.array(z.string())),
});

export async function loadOptions(
  optionsPath: string
): Promise<TestEntryOptions> {
  if (!existsSync(optionsPath)) {
    throw new Error("cannot load options, path doesn't exist");
  }

  const content = await readFile(optionsPath, "utf-8");

  try {
    const parsed = JSON.parse(content);
    const validated = optionsSchema.parse(parsed);

    return {
      ...(validated.viewports?.length && {
        viewports: validated.viewports.map((viewport) => ({
          height: viewport.height,
          width: viewport.width,
        })),
      }),
    };
  } catch (e) {
    throw new Error("cannot load options, invalid format: " + e);
  }
}
