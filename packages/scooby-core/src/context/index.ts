import { GitResolver } from "@animaapp/scooby-git-resolver";
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
  const gitResolver = new GitResolver();

  const baseCommitHash = await gitResolver.getBaseCommitHash();
  const currentCommitHash = await gitResolver.getCurrentCommitHash();
  const branchName = await gitResolver.getBranchName();
  const isMainBranch = branchName === "main" || branchName === "master";

  return {
    baseCommitHash,
    currentCommitHash,
    branchName,
    isMainBranch,
    repositoryName: await getRepositoryName(),
  };
}
