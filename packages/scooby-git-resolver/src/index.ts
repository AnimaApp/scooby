import { fsUtil } from "./fs-util";

import { CommitExplorer } from "./commit-explorer";

export class GitResolver {
  private _explorer = new CommitExplorer();

  async getBranchName(): Promise<string> {
    if (!this._checkAndMessage()) {
      throw new Error("invalid git configuration");
    }
    return this._explorer.getCurrentBranchName();
  }

  async getBaseCommitHash(): Promise<string | undefined> {
    if (!this._checkAndMessage()) {
      return;
    }
    try {
      const result = this._explorer.getBaseCommitHash();
      if (result) {
        return result;
      }
    } catch (e: any) {
      console.error(e);
    }
  }

  async getCurrentCommitHash(): Promise<string> {
    if (!this._checkAndMessage()) {
      throw new Error("invalid git configuration");
    }
    return this._explorer.getCurrentCommitHash();
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
