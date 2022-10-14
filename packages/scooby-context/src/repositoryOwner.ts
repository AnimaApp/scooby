import simpleGit from "simple-git";

export async function getRepositoryOwner(): Promise<string> {
  const envRepositoryOwner = process.env["SCOOBY_REPOSITORY_OWNER"];
  if (envRepositoryOwner) {
    return envRepositoryOwner;
  }

  const gitRemoteOwner = await extractRepositoryOwnerFromGitRemote();
  if (gitRemoteOwner) {
    return gitRemoteOwner;
  }

  throw new Error("unable to determine repository owner");
}

export async function extractRepositoryOwnerFromGitRemote(): Promise<
  string | undefined
> {
  const git = simpleGit();
  const remoteUrl = (await git.getConfig("remote.origin.url")).value;
  console.log("REMOTE URL", remoteUrl);
  if (!remoteUrl) {
    return;
  }

  const ownerRegex = /.*\/(.*)\/.*\.git$/;
  const match = ownerRegex.exec(remoteUrl);
  if (!match?.[1]) {
    return;
  }

  return match[1];
}
