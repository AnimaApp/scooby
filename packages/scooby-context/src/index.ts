import { getBaseCommitHash, getBranchName, getCurrentCommitHash } from "./git";
import { getRepositoryName } from "./repositoryName";
import { getRepositoryOwner } from "./repositoryOwner";

export * from "./repositoryName";

export type Context = {
  currentCommitHash: string;
  baseCommitHash: string;
  branchName: string;
  isMainBranch: boolean;
  repositoryName: string;
  repositoryOwner: string;
};

export async function getContext(): Promise<Context> {
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
