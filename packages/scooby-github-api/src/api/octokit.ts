import { Octokit } from "@octokit/core";
import { GitHubAPIOptions } from "../options";
import { CommitStatus, GitHubAPI, PRApprovalStatus } from "../types";

export class OctokitGitHubAPI implements GitHubAPI {
  private options: GitHubAPIOptions;
  private octokit: Octokit;

  constructor(options: GitHubAPIOptions) {
    this.options = options;
    this.octokit = new Octokit({
      auth: this.options.accessToken,
    });
  }

  async getAssociatedPR(commit: string): Promise<number | undefined> {
    const response = await this.octokit.request(
      "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls",
      {
        owner: this.options.owner,
        repo: this.options.repository,
        commit_sha: commit,
      }
    );

    if (response.status !== 200) {
      throw new Error(
        "could not get associated PR, received status: " +
          response.status +
          " and body: " +
          response.data
      );
    }

    if (response.data.length === 0) {
      return;
    }

    const sortedPRs = [...response.data];
    sortedPRs.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    return sortedPRs[0]["number"];
  }

  async postCommitStatus(commit: string, status: CommitStatus): Promise<void> {
    const response = await this.octokit.request(
      "POST /repos/{owner}/{repo}/statuses/{sha}",
      {
        owner: this.options.owner,
        repo: this.options.repository,
        sha: commit,
        state: status.state,
        target_url: status.targetUrl,
        description: status.description,
        context: `scooby/${status.name}`,
      }
    );

    if (response.status !== 201) {
      throw new Error(
        "could post commit status, received HTTP status: " +
          response.status +
          " and body: " +
          response.data
      );
    }
  }

  async hasPRBeenApproved(pr: number): Promise<PRApprovalStatus> {
    const response = await this.octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
      {
        owner: this.options.owner,
        repo: this.options.repository,
        pull_number: pr,
      }
    );

    if (response.status !== 200) {
      throw new Error(
        "could not check if PR has been approved, received status: " +
          response.status +
          " and body: " +
          response.data
      );
    }

    const approvalReview = response.data.find(
      (review) => review.state === "APPROVED"
    );

    if (approvalReview) {
      return {
        approved: true,
        user: approvalReview["user"]?.["login"],
      };
    } else {
      return {
        approved: false,
      };
    }
  }
}
