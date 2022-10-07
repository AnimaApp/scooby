import simpleGit from "simple-git";

export async function getCommitHash(): Promise<string> {
  const git = simpleGit();
  const revParseResponse = await git.revparse("HEAD");
  return revParseResponse;
}
