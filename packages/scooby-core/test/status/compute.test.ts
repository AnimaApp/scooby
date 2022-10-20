import { HostedReport, Review, ReviewApproval } from "@animaapp/scooby-shared";
import { computeReportStatuses } from "../../src/status/compute";

describe("compute report status", () => {
  const defaultContext: Parameters<typeof computeReportStatuses>[0] = {
    isMainBranch: false,
    commitHash: "commit-1",
    repositoryName: "repository",
    s3bucket: "bucket",
    s3region: "region",
    webBaseUrl: "http://url",
  };

  const mockReport: HostedReport = {
    type: "fidelity",
    commitHash: "commit-1",
    createdAt: 1,
    name: "report",
    overallFidelityScore: 0.5,
    pairs: [],
    items: [
      {
        id: "id-1",
        hash: "hash-1",
        status: "failure",
      },
      {
        id: "id-2",
        hash: "hash-2",
        status: "success",
      },
    ],
    summary: { result: "failure", stats: [] },
  };

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

  const mockReview: Review = {
    approvals: [approval1, approval2],
    rejections: [],
  };

  test("always report approved statuses on main", async () => {
    const statuses = await computeReportStatuses(
      { ...defaultContext, isMainBranch: true },
      [mockReport],
      mockReview
    );

    expect(statuses.map((status) => status.state)).toEqual(["approved"]);
  });

  test("pass if all failed tests are approved", async () => {
    const statuses = await computeReportStatuses(
      { ...defaultContext },
      [mockReport],
      mockReview
    );

    expect(statuses.map((status) => status.state)).toEqual(["approved"]);
  });

  test("pass if all tests are successful (with approval)", async () => {
    const report: HostedReport = {
      ...mockReport,
      items: [
        {
          id: "id-1",
          hash: "hash-1",
          status: "success",
        },
        {
          id: "id-2",
          hash: "hash-2",
          status: "success",
        },
      ],
    };

    const statuses = await computeReportStatuses(
      { ...defaultContext },
      [report],
      mockReview
    );

    expect(statuses.map((status) => status.state)).toEqual(["success"]);
  });

  test("pass if all tests are successful (without approval)", async () => {
    const report: HostedReport = {
      ...mockReport,
      items: [
        {
          id: "id-1",
          hash: "hash-1",
          status: "success",
        },
        {
          id: "id-2",
          hash: "hash-2",
          status: "success",
        },
      ],
    };

    const statuses = await computeReportStatuses(
      { ...defaultContext },
      [report],
      {
        approvals: [],
        rejections: [],
      }
    );

    expect(statuses.map((status) => status.state)).toEqual(["success"]);
  });

  test("fails if a previous approved id is failing and changed hash", async () => {
    const report: HostedReport = {
      ...mockReport,
      items: [
        {
          id: "id-1",
          hash: "this-hash-has-changed",
          status: "failure",
        },
        {
          id: "id-2",
          hash: "hash-2",
          status: "success",
        },
      ],
    };

    const statuses = await computeReportStatuses(
      { ...defaultContext },
      [report],
      mockReview
    );

    expect(statuses.map((status) => status.state)).toEqual(["failure"]);
  });

  test("fails all entries are successful, but some changes are requested", async () => {
    const report: HostedReport = {
      ...mockReport,
      items: [
        {
          id: "id-1",
          hash: "hash-1",
          status: "success",
        },
        {
          id: "id-2",
          hash: "hash-2",
          status: "success",
        },
      ],
    };

    const review: Review = {
      approvals: [],
      rejections: [
        {
          id: "id-2",
          commitHash: "commit-1",
          createdAt: 1,
          hash: "hash-2",
          report: "report",
        },
      ],
    };

    const statuses = await computeReportStatuses(
      { ...defaultContext },
      [report],
      review
    );

    expect(statuses.map((status) => status.state)).toEqual([
      "changes_requested",
    ]);
  });
});
