import { ScoobyAPI } from "@animaapp/scooby-api";
import { GitHubAPI } from "@animaapp/scooby-github-api/src/types";
import {
  Review,
  ReviewApproval,
  ReviewRejection,
} from "@animaapp/scooby-shared";

export async function getAggregatedReview(
  commit: string,
  api: ScoobyAPI,
  githubApi: GitHubAPI
): Promise<Review> {
  console.log("fetching associated commits...");
  const commits = await githubApi.getAssociatedCommits(commit);
  if (!commits?.length) {
    console.warn(
      "could not find associated commits, falling back on empty review"
    );
    return buildEmptyReview();
  }

  console.log("fetching reviews...");
  const reviews = await fetchReviews(commits, api);
  if (!reviews.length) {
    console.info("no reviews found, falling back on empty review");
    return buildEmptyReview();
  }

  return mergeReviews(reviews);
}

export function mergeReviews(reviews: Review[]): Review {
  // Reviews are ordered from least recent to more recent

  type Entry =
    | { status: "approved"; approval: ReviewApproval }
    | { status: "rejected"; rejection: ReviewRejection };

  const itemStatuses: Map<ReviewItemHash, Entry> = new Map();

  for (const review of reviews) {
    for (const rejection of review.rejections) {
      itemStatuses.set(getHashForReviewItem(rejection), {
        status: "rejected",
        rejection,
      });
    }

    for (const approval of review.approvals) {
      itemStatuses.set(getHashForReviewItem(approval), {
        status: "approved",
        approval,
      });
    }
  }

  const approvals = Array(...itemStatuses.values()).flatMap((entry) =>
    entry.status === "approved" ? [entry.approval] : []
  );
  approvals.sort((a, b) => a.createdAt - b.createdAt);

  const rejections = Array(...itemStatuses.values()).flatMap((entry) =>
    entry.status === "rejected" ? [entry.rejection] : []
  );
  rejections.sort((a, b) => a.createdAt - b.createdAt);

  const aggregatedReview: Review = {
    approvals,
    rejections,
  };

  return aggregatedReview;
}

type ReviewItemHash = string;

function getHashForReviewItem(
  item: ReviewApproval | ReviewRejection
): ReviewItemHash {
  return `${item.report}-${item.id}-${item.hash}`;
}

async function fetchReviews(
  commits: string[],
  api: ScoobyAPI
): Promise<Review[]> {
  const reviews: Review[] = [];

  for (const commit of commits) {
    const review = await api.getReview({ commitHash: commit });
    if (review) {
      reviews.push(review);
    }
  }

  return reviews;
}

function buildEmptyReview(): Review {
  return {
    approvals: [],
    rejections: [],
  };
}
