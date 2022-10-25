import { Environment } from "../types";
import {
  getBaseCommitHash,
  getBranchName,
  getCurrentCommitHash,
  getLatestMainBranchCommitHashes,
} from "./git";
import { getRepositoryName } from "./repositoryName";
import { getRepositoryOwner } from "./repositoryOwner";

export * from "./repositoryName";

export async function getEnvironment(): Promise<Environment> {
  const baseCommitHash = await getBaseCommitHash();
  const currentCommitHash = await getCurrentCommitHash();
  const latestMainBranchCommitHashes = await getLatestMainBranchCommitHashes();
  const branchName = await getBranchName();
  const isMainBranch = branchName === "main" || branchName === "master";

  return {
    baseCommitHash,
    currentCommitHash,
    branchName,
    isMainBranch,
    latestMainBranchCommitHashes,
    repositoryName: await getRepositoryName(),
    repositoryOwner: await getRepositoryOwner(),
  };
}
