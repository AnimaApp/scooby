import {
  Review,
  ReviewApproval,
  ReviewRejection,
} from "@animaapp/scooby-shared";
import { mergeReviews } from "../../src/status/review";

describe("review merging", () => {
  test("merges approvals correctly", () => {
    const approval1: ReviewApproval = {
      commitHash: "commit-1",
      createdAt: 1,
      hash: "hash-1",
      id: "id-1",
      report: "report",
    };
    const approval2: ReviewApproval = {
      commitHash: "commit-2",
      createdAt: 2,
      hash: "hash-2",
      id: "id-2",
      report: "report",
    };

    expect(
      mergeReviews([
        {
          approvals: [approval1],
          rejections: [],
        },
        {
          approvals: [approval2],
          rejections: [],
        },
      ] as Review[])
    ).toEqual({
      approvals: [approval1, approval2],
      rejections: [],
    } as Review);
  });

  test("rejection overrides approval correctly", () => {
    const approval1: ReviewApproval = {
      commitHash: "commit-1",
      createdAt: 1,
      hash: "hash-1",
      id: "id-1",
      report: "report",
    };
    const rejection1: ReviewRejection = {
      commitHash: "commit-2",
      createdAt: 2,
      hash: "hash-1",
      id: "id-1",
      report: "report",
    };

    expect(
      mergeReviews([
        {
          approvals: [approval1],
          rejections: [],
        },
        {
          approvals: [],
          rejections: [rejection1],
        },
      ] as Review[])
    ).toEqual({
      approvals: [],
      rejections: [rejection1],
    } as Review);
  });

  test("approval overrides rejection correctly", () => {
    const rejection1: ReviewRejection = {
      commitHash: "commit-1",
      createdAt: 1,
      hash: "hash-1",
      id: "id-1",
      report: "report",
    };
    const approval1: ReviewApproval = {
      commitHash: "commit-2",
      createdAt: 2,
      hash: "hash-1",
      id: "id-1",
      report: "report",
    };

    expect(
      mergeReviews([
        {
          approvals: [],
          rejections: [rejection1],
        },
        {
          approvals: [approval1],
          rejections: [],
        },
      ] as Review[])
    ).toEqual({
      approvals: [approval1],
      rejections: [],
    } as Review);
  });

  test("handles single review correctly", () => {
    const approval1: ReviewApproval = {
      commitHash: "commit-1",
      createdAt: 1,
      hash: "hash-1",
      id: "id-1",
      report: "report",
    };
    const rejection1: ReviewRejection = {
      commitHash: "commit-1",
      createdAt: 1,
      hash: "hash-2",
      id: "id-2",
      report: "report",
    };

    expect(
      mergeReviews([
        {
          approvals: [approval1],
          rejections: [rejection1],
        },
      ] as Review[])
    ).toEqual({
      approvals: [approval1],
      rejections: [rejection1],
    } as Review);
  });

  test("handle duplicate entries", () => {
    const approval1: ReviewApproval = {
      commitHash: "commit-1",
      createdAt: 1,
      hash: "hash-1",
      id: "id-1",
      report: "report",
    };
    const approval2: ReviewApproval = {
      commitHash: "commit-2",
      createdAt: 2,
      hash: "hash-2",
      id: "id-2",
      report: "report",
    };
    const approval1Duplicate: ReviewApproval = {
      commitHash: "commit-2",
      createdAt: 2,
      hash: "hash-1",
      id: "id-1",
      report: "report",
    };

    expect(
      mergeReviews([
        {
          approvals: [approval1],
          rejections: [],
        },
        {
          approvals: [approval2, approval1Duplicate],
          rejections: [],
        },
      ] as Review[])
    ).toEqual({
      approvals: [approval1Duplicate, approval2],
      rejections: [],
    } as Review);
  });
});
