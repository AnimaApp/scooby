import path from "path";
import { ReportContext } from "../../src";
import { _processReport } from "../../src/reports";

describe("fidelity test", () => {
  let mockContext: ReportContext;

  beforeEach(() => {
    mockContext = {
      api: {
        uploadFidelityReport: jest.fn((_, report) => Promise.resolve(report)),
      } as any,
      environment: {
        branchName: "feat/feature",
        baseCommitHash: "main-commit",
        currentCommitHash: "feature-commit",
        latestMainBranchCommitHashes: ["main-commit", "previous-main-commit"],
        isMainBranch: false,
        repositoryName: "test-repo",
        repositoryOwner: "test-owner",
      },
    };
  });

  it("crashes with invalid name", async () => {
    expect(() =>
      _processReport(
        "fidelity",
        {
          name: "invalid name/",
          actualPath: "path",
          expectedPath: "path",
          actualFileType: "html",
          expectedFileType: "html",
        },
        mockContext
      )
    ).rejects.toThrowError();
  });

  it("crashes with non-matching datasets", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity/non-matching/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity/non-matching/expected"
    );
    expect(() =>
      _processReport(
        "fidelity",
        {
          name: "test-fidelity",
          actualPath,
          expectedPath,
          actualFileType: "html",
          expectedFileType: "html",
        },
        mockContext
      )
    ).rejects.toThrowError();
  });

  it("handles perfect fidelity report (HTML)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity/html-perfect-fidelity/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity/html-perfect-fidelity/expected"
    );

    const report = await _processReport(
      "fidelity",
      {
        name: "test-fidelity",
        actualPath,
        expectedPath,
        actualFileType: "html",
        expectedFileType: "html",
      },
      mockContext
    );
    if (report.type !== "fidelity") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("success");
    expect(report.overallFidelityScore).toEqual(1);
    expect(report.pairs.length).toEqual(3);

    expect(mockContext.api.uploadFidelityReport).toHaveBeenCalled();
  });

  it("handles perfect fidelity report (JSON)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity/json-perfect-fidelity/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity/json-perfect-fidelity/expected"
    );

    const report = await _processReport(
      "fidelity",
      {
        name: "test-fidelity",
        actualPath,
        expectedPath,
        actualFileType: "json",
        expectedFileType: "json",
      },
      mockContext
    );
    if (report.type !== "fidelity") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("success");
    expect(report.overallFidelityScore).toEqual(1);
    expect(report.pairs.length).toEqual(2);

    expect(mockContext.api.uploadFidelityReport).toHaveBeenCalled();
  });

  it("handles perfect fidelity report (JSX)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity/jsx-perfect-fidelity/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity/jsx-perfect-fidelity/expected"
    );

    const report = await _processReport(
      "fidelity",
      {
        name: "test-fidelity",
        actualPath,
        expectedPath,
        actualFileType: "jsx",
        expectedFileType: "jsx",
      },
      mockContext
    );
    if (report.type !== "fidelity") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("success");
    expect(report.overallFidelityScore).toEqual(1);
    expect(report.pairs.length).toEqual(2);

    expect(mockContext.api.uploadFidelityReport).toHaveBeenCalled();
  });

  it("automatically formats code if formatter is not disabled (JSON)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity/unformatted-equal-json/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity/unformatted-equal-json/expected"
    );

    const report = await _processReport(
      "fidelity",
      {
        name: "test-fidelity",
        actualPath,
        expectedPath,
        actualFileType: "json",
        expectedFileType: "json",
      },
      mockContext
    );
    if (report.type !== "fidelity") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("success");
    expect(report.overallFidelityScore).toEqual(1);
    expect(report.pairs.length).toEqual(2);

    expect(mockContext.api.uploadFidelityReport).toHaveBeenCalled();
  });

  it("doesn't format code if formatter is disabled (JSON)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity/unformatted-equal-json/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity/unformatted-equal-json/expected"
    );

    const report = await _processReport(
      "fidelity",
      {
        name: "test-fidelity",
        actualPath,
        expectedPath,
        formatter: "none",
        actualFileType: "json",
        expectedFileType: "json",
      },
      mockContext
    );
    if (report.type !== "fidelity") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("success");
    expect(report.overallFidelityScore).toBeLessThan(1);
    expect(report.pairs.length).toEqual(2);

    expect(mockContext.api.uploadFidelityReport).toHaveBeenCalled();
  });

  it("handles fidelity report with differences (HTML)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity/html-with-differences/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity/html-with-differences/expected"
    );

    const report = await _processReport(
      "fidelity",
      {
        name: "test-fidelity",
        actualPath,
        expectedPath,
        actualFileType: "html",
        expectedFileType: "html",
      },
      mockContext
    );
    if (report.type !== "fidelity") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("success");
    expect(report.overallFidelityScore).toBeLessThan(1);
    expect(report.pairs.length).toEqual(3);

    expect(mockContext.api.uploadFidelityReport).toHaveBeenCalled();
  });

  it("handles fidelity report with differences (JSON)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity/json-with-differences/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity/json-with-differences/expected"
    );

    const report = await _processReport(
      "fidelity",
      {
        name: "test-fidelity",
        actualPath,
        expectedPath,
        actualFileType: "json",
        expectedFileType: "json",
      },
      mockContext
    );
    if (report.type !== "fidelity") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("success");
    expect(report.overallFidelityScore).toBeLessThan(1);
    expect(report.pairs.length).toEqual(2);
    expect(
      (report.pairs as any[]).every((pair) => pair.comparison.similarity < 1)
    ).toEqual(true);

    expect(mockContext.api.uploadFidelityReport).toHaveBeenCalled();
  });

  it("fails if entries have a fidelity lower then threshold (JSON)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity/json-with-differences/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity/json-with-differences/expected"
    );

    const report = await _processReport(
      "fidelity",
      {
        name: "test-fidelity",
        actualPath,
        expectedPath,
        threshold: 1,
        actualFileType: "json",
        expectedFileType: "json",
      },
      mockContext
    );
    if (report.type !== "fidelity") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("failure");
    expect(report.overallFidelityScore).toBeLessThan(1);
    expect(report.pairs.length).toEqual(2);
    expect(
      (report.pairs as any[]).every((pair) => pair.comparison.similarity < 1)
    ).toEqual(true);

    expect(mockContext.api.uploadFidelityReport).toHaveBeenCalled();
  });

  it("handles fidelity report with differences (JSX)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity/jsx-with-differences/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity/jsx-with-differences/expected"
    );

    const report = await _processReport(
      "fidelity",
      {
        name: "test-fidelity",
        actualPath,
        expectedPath,
        actualFileType: "jsx",
        expectedFileType: "jsx",
      },
      mockContext
    );
    if (report.type !== "fidelity") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("success");
    expect(report.overallFidelityScore).toBeLessThan(1);
    expect(report.pairs.length).toEqual(2);
    expect(
      (report.pairs as any[]).every((pair) => pair.comparison.similarity < 1)
    ).toEqual(true);

    expect(mockContext.api.uploadFidelityReport).toHaveBeenCalled();
  });

  it("doesn't upload fidelity report if current commit is equal to base commit (and not main)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity/html-perfect-fidelity/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity/html-perfect-fidelity/expected"
    );

    mockContext.environment.branchName = "feat/another-branch";
    mockContext.environment.currentCommitHash = "main-commit";

    const report = await _processReport(
      "fidelity",
      {
        name: "test-fidelity",
        actualPath,
        expectedPath,
        actualFileType: "html",
        expectedFileType: "html",
      },
      mockContext
    );
    if (report.type !== "fidelity") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity");

    expect(mockContext.api.uploadFidelityReport).not.toHaveBeenCalled();
  });
});
