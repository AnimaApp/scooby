import { Environment } from "../types";
import { getBaseCommitHash, getBranchName, getCurrentCommitHash } from "./git";
import { getRepositoryName } from "./repositoryName";
import { getRepositoryOwner } from "./repositoryOwner";

export * from "./repositoryName";

export async function getEnvironment(): Promise<Environment> {
  const baseCommitHash = await getBaseCommitHash();
  const currentCommitHash = await getCurrentCommitHash();
  const branchName = await getBranchName();
  const isMainBranch = branchName === "main" || branchName === "master";

  return {
    baseCommitHash,
    currentCommitHash,
    branchName,
    isMainBranch,
    repositoryName: await getRepositoryName(),
    repositoryOwner: await getRepositoryOwner(),
  };
}
