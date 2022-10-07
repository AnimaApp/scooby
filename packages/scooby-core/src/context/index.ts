import { getCommitHash } from "./commitHash";
import { getRepositoryName } from "./repositoryName";

export * from "./repositoryName";
export * from "./commitHash";

export type Context = {
  commitHash: string;
  repositoryName: string;
};

export async function getContext(): Promise<Context> {
  return {
    commitHash: await getCommitHash(),
    repositoryName: await getRepositoryName(),
  };
}
