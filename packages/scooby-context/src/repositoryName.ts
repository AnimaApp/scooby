import simpleGit from "simple-git";

export async function getRepositoryName(): Promise<string> {
  const envRepositoryName = process.env["SCOOBY_REPOSITORY_NAME"];
  if (envRepositoryName) {
    return envRepositoryName;
  }

  const gitRemoteName = await extractRepositoryNameFromGitRemote();
  if (gitRemoteName) {
    return gitRemoteName;
  }

  throw new Error("unable to determine repository name");
}

export async function extractRepositoryNameFromGitRemote(): Promise<
  string | undefined
> {
  const git = simpleGit();
  const remoteUrl = (await git.getConfig("remote.origin.url")).value;
  if (!remoteUrl) {
    return;
  }

  const nameRegex = /.*\/(.*)\.git$/;
  const match = nameRegex.exec(remoteUrl);
  if (!match?.[1]) {
    return;
  }

  return match[1];
}
