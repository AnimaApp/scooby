import { GitHubAPIOptions, prepareOptions } from "./options";
import { GitHubAPI } from "./types";
import { getRestGitHubAPI } from "./api";

export async function getGitHubAPI(
  options?: Partial<GitHubAPIOptions>
): Promise<GitHubAPI> {
  const effectiveOptions = prepareOptions(options);

  return getRestGitHubAPI(effectiveOptions);
}
