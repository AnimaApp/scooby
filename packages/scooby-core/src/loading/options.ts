import path from "path";
import { TypeOf, z } from "zod";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { TestEntryOptions } from "../types";
import { LocalResource, Metadata } from "@animaapp/scooby-shared";

const baseMetadataSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
});
const textMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("text"),
  text: z.string(),
});
const linkMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("link"),
  url: z.string(),
});
const imageMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("image"),
  image_path: z.string(),
});
const codeMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("code"),
  code_path: z.string(),
});
const fileMetadataSchema = baseMetadataSchema.extend({
  type: z.literal("file"),
  file_path: z.string(),
});
const metadataSchema = z.discriminatedUnion("type", [
  textMetadataSchema,
  linkMetadataSchema,
  imageMetadataSchema,
  codeMetadataSchema,
  fileMetadataSchema,
]);

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
  metadata: z.optional(z.array(metadataSchema)),
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
      ...(validated.metadata?.length && {
        metadata: loadMetadata(optionsPath, validated.metadata),
      }),
    };
  } catch (e) {
    throw new Error("cannot load options, invalid format: " + e);
  }
}

function loadMetadata(
  optionsPath: string,
  metadata: TypeOf<typeof metadataSchema>[]
): Metadata<LocalResource>[] {
  return metadata.map((entry): Metadata<LocalResource> => {
    switch (entry.type) {
      case "text":
        return {
          ...entry,
        };
      case "link":
        return {
          ...entry,
        };
      case "image":
        return {
          type: "image",
          name: entry.name,
          ...(entry.description && { description: entry.description }),
          image: {
            type: "local",
            path: resolveResourcePath(optionsPath, entry.image_path),
          },
        };
      case "code":
        return {
          type: "code",
          name: entry.name,
          ...(entry.description && { description: entry.description }),
          code: {
            type: "local",
            path: resolveResourcePath(optionsPath, entry.code_path),
          },
        };
      case "file":
        return {
          type: "file",
          name: entry.name,
          ...(entry.description && { description: entry.description }),
          file: {
            type: "local",
            path: resolveResourcePath(optionsPath, entry.file_path),
          },
        };
    }
  });
}

function resolveResourcePath(
  optionsPath: string,
  resourcePath: string
): string {
  const resolvedPath = resolveAbsolutePath(optionsPath, resourcePath);

  if (!existsSync(resolvedPath)) {
    throw new Error(
      `unable to resolve resource '${resourcePath}' in options file '${optionsPath}', file not found`
    );
  }

  return resolvedPath;
}

function resolveAbsolutePath(
  optionsPath: string,
  resourcePath: string
): string {
  if (path.isAbsolute(resourcePath)) {
    return resourcePath;
  }

  const optionsDir = path.dirname(optionsPath);
  return path.resolve(path.join(optionsDir, resourcePath));
}
