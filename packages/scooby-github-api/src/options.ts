import { z } from "zod";

const optionsSchema = z.object({
  owner: z.string(),
  repository: z.string(),
  accessToken: z.string(),
});

export type GitHubAPIOptions = z.infer<typeof optionsSchema>;

export function prepareOptions(
  options: Partial<GitHubAPIOptions> | undefined
): GitHubAPIOptions {
  const validatedOptions = optionsSchema.parse({
    ...getOptionsFromEnvVariables(),
    ...options,
  });

  return validatedOptions;
}

function getOptionsFromEnvVariables(): Partial<GitHubAPIOptions> {
  return {
    repository: process.env?.["SCOOBY_REPOSITORY_NAME"],
    owner: process.env?.["SCOOBY_REPOSITORY_OWNER"],
    accessToken: process.env?.["SCOOBY_GITHUB_ACCESS_TOKEN"],
  };
}
