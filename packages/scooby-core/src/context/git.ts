import simpleGit from "simple-git";

export async function getBranchName(): Promise<string> {
  const git = simpleGit();
  const revParseResponse = await git.revparse(["--abbrev-ref", "HEAD"]);
  return revParseResponse;
}

export async function getCurrentCommitHash(): Promise<string> {
  const git = simpleGit();
  const revParseResponse = await git.revparse("HEAD");
  return revParseResponse;
}

export async function getBaseCommitHash(): Promise<string> {
  const git = simpleGit({ trimmed: true });

  const defaultBranch = await getDefaultBranch();
  const currentCommit = await getCurrentCommitHash();

  const baseCommitHash = await git.raw([
    "merge-base",
    defaultBranch,
    currentCommit,
  ]);
  return baseCommitHash;
}

export async function getDefaultBranch(): Promise<string> {
  // TODO: Might need to make it more generic in the future
  return "main";
}
