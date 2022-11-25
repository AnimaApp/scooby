import { ScoobyAPI } from "@animaapp/scooby-api";
import path from "path";
import fsExtra from "fs-extra";
import { ReportContext } from "../../src";
import { _processReport } from "../../src/reports";
import { archiveDirectory } from "../../src/archive";

describe("fidelity-regression test", () => {
  let mockContext: ReportContext;

  beforeEach(() => {
    mockContext = {
      api: {
        uploadFidelityRegressionReport: jest.fn((_, report) =>
          Promise.resolve(report)
        ),
        uploadSnapshotArchive: jest.fn(() => Promise.resolve()),
        downloadSnapshotArchive: jest.fn(),
      } as any,
      environment: {
        branchName: "feat/feature",
        baseCommitHash: "main-commit",
        currentCommitHash: "feature-commit",
        latestBaseCommitHashes: ["main-commit", "previous-main-commit"],
        isMainBranch: false,
        repositoryName: "test-repo",
        repositoryOwner: "test-owner",
      },
      isLocalRun: false,
    };
  });

  it("crashes with invalid name", async () => {
    expect(() =>
      _processReport(
        "fidelityRegression",
        {
          name: "invalid name/",
          actualPath: "path",
          expectedPath: "path",
          actualFileType: "html",
          expectedFileType: "html",
        },
        mockContext,
        { type: "hosted" }
      )
    ).rejects.toThrowError();
  });

  it("detects no regressions and bad fidelity (HTML)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/html-bad-fidelity-no-regression/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/html-bad-fidelity-no-regression/expected"
    );
    const referencePath = path.resolve(
      __dirname,
      "../data/fidelity-regression/html-bad-fidelity-no-regression/reference"
    );

    mockDownloadSnapshotArchiveImplementation(mockContext.api, referencePath);

    const report = await _processReport(
      "fidelityRegression",
      {
        name: "test-fidelity-regression",
        actualPath,
        expectedPath,
        actualFileType: "html",
        expectedFileType: "html",
      },
      mockContext,
      { type: "hosted" }
    );
    if (report.type !== "fidelity-regression") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity-regression");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("success");
    expect(report.results.new.length).toEqual(0);
    expect(report.results.changed.length).toEqual(0);
    expect(report.results.removed.length).toEqual(0);
    expect(report.results.unchanged.length).toEqual(3);
    expect(report.overallFidelityScore).toBeLessThan(1);

    expect(mockContext.api.uploadFidelityRegressionReport).toHaveBeenCalled();
  });

  it("detects regressions and bad fidelity (HTML)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/html-bad-fidelity-with-regression/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/html-bad-fidelity-with-regression/expected"
    );
    const referencePath = path.resolve(
      __dirname,
      "../data/fidelity-regression/html-bad-fidelity-with-regression/reference"
    );

    mockDownloadSnapshotArchiveImplementation(mockContext.api, referencePath);

    const report = await _processReport(
      "fidelityRegression",
      {
        name: "test-fidelity-regression",
        actualPath,
        expectedPath,
        actualFileType: "html",
        expectedFileType: "html",
      },
      mockContext,
      { type: "hosted" }
    );
    if (report.type !== "fidelity-regression") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity-regression");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("failure");
    expect(report.results.new.length).toEqual(1);
    expect(report.results.changed.length).toEqual(1);
    expect(report.results.removed.length).toEqual(1);
    expect(report.results.unchanged.length).toEqual(0);
    expect(report.overallFidelityScore).toBeLessThan(1);

    expect(mockContext.api.uploadFidelityRegressionReport).toHaveBeenCalled();
  });

  it("detects regressions (JSON)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-with-regression/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-with-regression/expected"
    );
    const referencePath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-with-regression/reference"
    );

    mockDownloadSnapshotArchiveImplementation(mockContext.api, referencePath);

    const report = await _processReport(
      "fidelityRegression",
      {
        name: "test-fidelity-regression",
        actualPath,
        expectedPath,
        actualFileType: "json",
        expectedFileType: "json",
      },
      mockContext,

      { type: "hosted" }
    );
    if (report.type !== "fidelity-regression") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-fidelity-regression");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("failure");

    expect(report.results.new.length).toEqual(1);
    expect(report.results.changed.length).toEqual(1);
    expect(report.results.removed.length).toEqual(1);
    expect(report.results.unchanged.length).toEqual(1);
    expect(report.results.new).toMatchObject([
      {
        actual: {
          id: "test4",
        },
      },
    ]);
    expect(report.results.removed).toMatchObject([
      {
        id: "test3",
      },
    ]);
    expect(report.results.unchanged).toMatchObject([
      {
        actual: {
          id: "test1",
        },
      },
    ]);
    expect(report.results.changed).toMatchObject([
      {
        actual: {
          id: "test2",
        },
      },
    ]);
    expect(report.overallFidelityScore).toBeLessThan(1);

    expect(mockContext.api.uploadFidelityRegressionReport).toHaveBeenCalled();
  });

  it("detects regressions with no matching dataset items (JSON)", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-no-matching/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-no-matching/expected"
    );
    const referencePath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-no-matching/reference"
    );

    mockDownloadSnapshotArchiveImplementation(mockContext.api, referencePath);

    const report = await _processReport(
      "fidelityRegression",
      {
        name: "test-regression",
        actualPath,
        expectedPath,
        actualFileType: "json",
        expectedFileType: "json",
      },
      mockContext,

      { type: "hosted" }
    );
    if (report.type !== "fidelity-regression") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-regression");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("failure");

    expect(report.results.new.length).toEqual(1);
    expect(report.results.changed.length).toEqual(0);
    expect(report.results.removed.length).toEqual(2);
    expect(report.results.unchanged.length).toEqual(0);
    expect(report.overallFidelityScore).toBeLessThan(1);

    expect(mockContext.api.uploadFidelityRegressionReport).toHaveBeenCalled();
  });

  it("uploads snapshot on main branch", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-no-matching/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-no-matching/expected"
    );
    const referencePath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-no-matching/reference"
    );

    mockDownloadSnapshotArchiveImplementation(mockContext.api, referencePath);

    mockContext.environment.branchName = "main";
    mockContext.environment.currentCommitHash = "main-commit";
    mockContext.environment.isMainBranch = true;

    mockDownloadSnapshotArchiveImplementation(mockContext.api, referencePath);

    const report = await _processReport(
      "fidelityRegression",
      {
        name: "test-regression",
        actualPath,
        expectedPath,
        actualFileType: "json",
        expectedFileType: "json",
      },
      mockContext,

      { type: "hosted" }
    );
    if (report.type !== "fidelity-regression") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-regression");

    expect(mockContext.api.uploadSnapshotArchive).toHaveBeenCalled();
  });

  it("doesn't upload report if the branch not main but the commit is the same", async () => {
    const actualPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-no-matching/actual"
    );
    const expectedPath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-no-matching/expected"
    );
    const referencePath = path.resolve(
      __dirname,
      "../data/fidelity-regression/json-bad-fidelity-no-matching/reference"
    );

    mockContext.environment.currentCommitHash = "main-commit";

    mockDownloadSnapshotArchiveImplementation(mockContext.api, referencePath);

    await expect(
      async () =>
        await _processReport(
          "fidelityRegression",
          {
            name: "test-regression",
            actualPath,
            expectedPath,
            actualFileType: "json",
            expectedFileType: "json",
          },
          mockContext,
          { type: "hosted" }
        )
    ).rejects.toThrow();

    expect(mockContext.api.uploadSnapshotArchive).not.toHaveBeenCalled();
    expect(
      mockContext.api.uploadFidelityRegressionReport
    ).not.toHaveBeenCalled();
  });
});

function mockDownloadSnapshotArchiveImplementation(
  api: ScoobyAPI,
  targetReferencePath: string
) {
  (api.downloadSnapshotArchive as jest.Mock).mockImplementation(
    async (_, targetPath: string) => {
      const archivePath = await archiveDirectory(targetReferencePath);
      await fsExtra.copy(archivePath, targetPath);
      return true;
    }
  );
}
