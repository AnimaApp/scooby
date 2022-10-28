import { z } from "zod";

const optionsSchema = z.object({
  provider: z.enum(["s3"]),
  repositoryName: z.string(),
  awsCredentials: z.optional(
    z.object({
      accessKeyId: z.string(),
      secretAccessKey: z.string(),
    })
  ),
  awsS3Bucket: z.optional(
    z.object({
      name: z.string(),
      region: z.string(),
    })
  ),
  maxConcurrentUploads: z.number().int(),
});

export type ScoobyAPIOptions = z.infer<typeof optionsSchema>;

const DEFAULT_OPTIONS: Partial<ScoobyAPIOptions> = {
  provider: "s3",
  maxConcurrentUploads: 8,
};

export function validateOptions(
  options: Partial<ScoobyAPIOptions> | undefined
): ScoobyAPIOptions {
  const validatedOptions = optionsSchema.parse({
    ...DEFAULT_OPTIONS,
    ...options,
  });

  return validatedOptions;
}
