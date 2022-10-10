import { getBaseCommitHash, getBranchName, getCurrentCommitHash } from "./git";
import { getRepositoryName } from "./repositoryName";

export * from "./repositoryName";

export type Context = {
  currentCommitHash: string;
  baseCommitHash: string | undefined;
  branchName: string;
  isMainBranch: boolean;
  repositoryName: string;
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
  };
}
