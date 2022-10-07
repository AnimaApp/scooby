import {
  HostedRegressionReport,
  HostedResource,
  LocalRegressionReport,
  LocalResource,
} from "@animaapp/scooby-shared";

export function getAllLocalResourcesForRegression(
  report: LocalRegressionReport
): LocalResource[] {
  return [
    ...report.results.new.map((entry) => entry.image),
    ...report.results.removed.map((entry) => entry.image),
    ...report.results.changed.flatMap((pair) => [
      pair.actual.image,
      pair.expected.image,
      pair.comparison.diff,
      pair.comparison.overlap,
      pair.comparison.normalizedActual,
      pair.comparison.normalizedExpected,
    ]),
    ...report.results.unchanged.flatMap((pair) => [
      pair.actual.image,
      pair.expected.image,
      pair.comparison.diff,
      pair.comparison.overlap,
      pair.comparison.normalizedActual,
      pair.comparison.normalizedExpected,
    ]),
  ];
}

export function buildHostedRegressionReport(
  localReport: LocalRegressionReport,
  resources: Record<string, HostedResource>
): HostedRegressionReport {
  return {
    ...localReport,
    results: {
      new: localReport.results.new.map((entry) => ({
        ...entry,
        image: getResource(entry.image.path, resources),
      })),
      removed: localReport.results.removed.map((entry) => ({
        ...entry,
        image: getResource(entry.image.path, resources),
      })),
      unchanged: localReport.results.unchanged.map((pair) => ({
        actual: {
          ...pair.actual,
          image: getResource(pair.actual.image.path, resources),
        },
        expected: {
          ...pair.expected,
          image: getResource(pair.expected.image.path, resources),
        },
        comparison: {
          ...pair.comparison,
          diff: getResource(pair.comparison.diff.path, resources),
          overlap: getResource(pair.comparison.overlap.path, resources),
          normalizedActual: getResource(
            pair.comparison.normalizedActual.path,
            resources
          ),
          normalizedExpected: getResource(
            pair.comparison.normalizedExpected.path,
            resources
          ),
        },
      })),
      changed: localReport.results.changed.map((pair) => ({
        actual: {
          ...pair.actual,
          image: getResource(pair.actual.image.path, resources),
        },
        expected: {
          ...pair.expected,
          image: getResource(pair.expected.image.path, resources),
        },
        comparison: {
          ...pair.comparison,
          diff: getResource(pair.comparison.diff.path, resources),
          overlap: getResource(pair.comparison.overlap.path, resources),
          normalizedActual: getResource(
            pair.comparison.normalizedActual.path,
            resources
          ),
          normalizedExpected: getResource(
            pair.comparison.normalizedExpected.path,
            resources
          ),
        },
      })),
    },
  };
}

function getResource(
  path: string,
  resources: Record<string, HostedResource>
): HostedResource {
  const resource = resources[path];
  if (!resource) {
    throw new Error(
      "invariant violation, hosted resource not found for path: " + path
    );
  }

  return resource;
}
