import { fsUtil } from "./fs-util";

import { CommitExplorer } from "./commit-explorer";

export class GitResolver {
  private _explorer = new CommitExplorer();

  async getBranchName(): Promise<string | undefined> {
    if (!this._checkAndMessage()) {
      return;
    }
    try {
      const result = this._explorer.getCurrentBranchName();
      if (result) {
        return result;
      }
    } catch (e: any) {
      console.error(e);
    }
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

  async getCurrentCommitHash(): Promise<string | undefined> {
    if (!this._checkAndMessage()) {
      return;
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
