import { GitHubAPIOptions } from "../options";
import { GitHubAPI } from "../types";
import { OctokitGitHubAPI } from "./octokit";

export function getRestGitHubAPI(options: GitHubAPIOptions): GitHubAPI {
  return new OctokitGitHubAPI(options);
}
