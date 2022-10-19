import { ScoobyAPI } from "@animaapp/scooby-api";
import path from "path";
import fsExtra from "fs-extra";
import { ReportContext } from "../../src";
import { _processReport } from "../../src/reports";
import { archiveDirectory } from "../../src/archive";

describe("regression test", () => {
  let mockContext: ReportContext;

  beforeEach(() => {
    mockContext = {
      api: {
        uploadRegressionReport: jest.fn((_, report) => Promise.resolve(report)),
        uploadSnapshotArchive: jest.fn(() => Promise.resolve()),
        downloadSnapshotArchive: jest.fn(),
      } as any,
      environment: {
        branchName: "feat/feature",
        baseCommitHash: "main-commit",
        currentCommitHash: "feature-commit",
        isMainBranch: false,
        repositoryName: "test-repo",
        repositoryOwner: "test-owner",
      },
    };
  });

  it("crashes with invalid name", async () => {
    expect(() =>
      _processReport(
        "regression",
        { name: "invalid name/", testsPath: "path" },
        mockContext
      )
    ).rejects.toThrowError();
  });

  it("detects no regressions (HTML)", async () => {
    const testsPath = path.resolve(
      __dirname,
      "../data/regression/html-no-regressions/actual"
    );
    const referencePath = path.resolve(
      __dirname,
      "../data/regression/html-no-regressions/expected"
    );

    mockDownloadSnapshotArchiveImplementation(mockContext.api, referencePath);

    const report = await _processReport(
      "regression",
      { name: "test-regression", testsPath },
      mockContext
    );
    if (report.type !== "regression") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-regression");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("success");
    expect(report.results.new.length).toEqual(0);
    expect(report.results.changed.length).toEqual(0);
    expect(report.results.removed.length).toEqual(0);
    expect(report.results.unchanged.length).toEqual(2);

    expect(mockContext.api.uploadRegressionReport).toHaveBeenCalled();
  });

  it("detects regressions (HTML)", async () => {
    const testsPath = path.resolve(
      __dirname,
      "../data/regression/html-regression-with-differences/actual"
    );
    const referencePath = path.resolve(
      __dirname,
      "../data/regression/html-regression-with-differences/expected"
    );

    mockDownloadSnapshotArchiveImplementation(mockContext.api, referencePath);

    const report = await _processReport(
      "regression",
      { name: "test-regression", testsPath },
      mockContext
    );
    if (report.type !== "regression") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-regression");
    expect(report.commitHash).toEqual("feature-commit");
    expect(report.summary.result).toEqual("failure");

    expect(report.results.new.length).toEqual(1);
    expect(report.results.changed.length).toEqual(1);
    expect(report.results.removed.length).toEqual(1);
    expect(report.results.unchanged.length).toEqual(1);
    expect(report.results.new).toMatchObject([
      {
        id: "test4-1920x1080",
      },
    ]);
    expect(report.results.removed).toMatchObject([
      {
        id: "test3-1920x1080",
      },
    ]);
    expect(report.results.unchanged).toMatchObject([
      {
        actual: {
          id: "test1-1920x1080",
        },
      },
    ]);
    expect(report.results.changed).toMatchObject([
      {
        actual: {
          id: "test2-1920x1080",
        },
      },
    ]);

    expect(mockContext.api.uploadRegressionReport).toHaveBeenCalled();
  });

  it("uploads snapshot on main branch", async () => {
    const testsPath = path.resolve(
      __dirname,
      "../data/regression/html-no-regressions/actual"
    );
    const referencePath = path.resolve(
      __dirname,
      "../data/regression/html-no-regressions/expected"
    );

    mockContext.environment.branchName = "main";
    mockContext.environment.currentCommitHash = "main-commit";
    mockContext.environment.isMainBranch = true;

    mockDownloadSnapshotArchiveImplementation(mockContext.api, referencePath);

    const report = await _processReport(
      "regression",
      { name: "test-regression", testsPath },
      mockContext
    );
    if (report.type !== "regression") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-regression");

    expect(mockContext.api.uploadSnapshotArchive).toHaveBeenCalled();
  });

  it("doesn't upload report if the branch not main but the commit is the same", async () => {
    const testsPath = path.resolve(
      __dirname,
      "../data/regression/html-no-regressions/actual"
    );
    const referencePath = path.resolve(
      __dirname,
      "../data/regression/html-no-regressions/expected"
    );

    mockContext.environment.currentCommitHash = "main-commit";

    mockDownloadSnapshotArchiveImplementation(mockContext.api, referencePath);

    const report = await _processReport(
      "regression",
      { name: "test-regression", testsPath },
      mockContext
    );
    if (report.type !== "regression") {
      throw new Error("invalid report type received: " + report.type);
    }

    expect(report.name).toEqual("test-regression");

    expect(mockContext.api.uploadSnapshotArchive).not.toHaveBeenCalled();
    expect(mockContext.api.uploadRegressionReport).not.toHaveBeenCalled();
  });
});

function mockDownloadSnapshotArchiveImplementation(
  api: ScoobyAPI,
  targetReferencePath: string
) {
  (api.downloadSnapshotArchive as jest.Mock).mockImplementation(
    async (_, targetPath: string) => {
      const archivePath = await archiveDirectory(targetReferencePath);
      fsExtra.copy(archivePath, targetPath);
      return true;
    }
  );
}