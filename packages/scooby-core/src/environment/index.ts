import { Environment } from "../types";
import {
  getBaseCommitHash,
  getBranchName,
  getCurrentCommitHash,
  getLatestBaseCommitHashes,
} from "./git";
import { getRepositoryName } from "./repositoryName";
import { getRepositoryOwner } from "./repositoryOwner";

export * from "./repositoryName";

export async function getEnvironment(): Promise<Environment> {
  const baseCommitHash = await getBaseCommitHash();
  const currentCommitHash = await getCurrentCommitHash();
  const latestBaseCommitHashes = await getLatestBaseCommitHashes();
  const branchName = await getBranchName();
  const isMainBranch = branchName === "main" || branchName === "master";

  return {
    baseCommitHash,
    currentCommitHash,
    branchName,
    isMainBranch,
    latestBaseCommitHashes,
    repositoryName: await getRepositoryName(),
    repositoryOwner: await getRepositoryOwner(),
  };
}
