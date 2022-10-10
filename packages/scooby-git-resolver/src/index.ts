import { fsUtil } from "./fs-util";

import { CommitExplorer } from "./commit-explorer";

export class GitCommitResolver {
  private _explorer = new CommitExplorer();

  getExpectedKey(): Promise<string> {
    if (!this._checkAndMessage()) {
      return Promise.reject<string>(null);
    }
    try {
      const result = this._explorer.getBaseCommitHash();
      if (result) {
        return Promise.resolve(result);
      } else {
        return Promise.reject<string>(null);
      }
    } catch (e: any) {
      console.error(e);
      return Promise.reject<string>(null);
    }
  }

  getActualKey(): Promise<string> {
    if (!this._checkAndMessage()) {
      return Promise.reject<string>(new Error());
    }
    return Promise.resolve(this._explorer.getCurrentCommitHash());
  }

  private _isInGitRepository() {
    return !!fsUtil.lookup(".git", process.cwd());
  }

  private _checkAndMessage() {
    const result = this._isInGitRepository();
    if (!result) {
      console.error(
        "scooby-git-resolver does not work outside of a Git repository. Please retry after running `git init`."
      );
    }
    return result;
  }
}
