import {
  CodeFidelityRegressionTestEntry,
  CodeFidelityRegressionTestPair,
  HostedFidelityRegressionReport,
  HostedFidelityRegressionTestEntry,
  HostedFidelityRegressionTestPair,
  HostedResource,
  ImageFidelityRegressionTestEntry,
  ImageFidelityRegressionTestPair,
  Review,
  Sentiment,
} from "@animaapp/scooby-shared";
import { CodeEntry, Entry, EntryStatus, ImageEntry } from "../../../types";
import { getRankForSentiment } from "../../../utils/rank";
import {
  computeReportItemsReviewStatuses,
  ItemStatus,
} from "../../../utils/review";

export function generateEntries(
  report: HostedFidelityRegressionReport,
  review: Review | undefined
): Entry[] {
  const entries: Entry[] = [];
  if (!review) {
    entries.push(...generateImageEntriesWithoutReview(report));
  } else {
    entries.push(...generateImageEntriesWithReview(report, review));
  }

  entries.sort((a, b) => {
    if (a.sentiment !== b.sentiment) {
      return (
        (a.sentiment ? getRankForSentiment(a.sentiment) : 0) -
        (b.sentiment ? getRankForSentiment(b.sentiment) : 0)
      );
    } else {
      return (a.score ?? 0) - (b.score ?? 0);
    }
  });

  return entries;
}

function generateImageEntriesWithoutReview(
  report: HostedFidelityRegressionReport
): Entry[] {
  return [
    ...report.results.changed
      .map(mapFidelityRegressionPairToEntry)
      .map(
        (entry) => ({ ...entry, sentiment: "danger", tag: "changed" } as const)
      ),
    ...report.results.new
      .map(mapFidelityRegressionPairToEntry)
      .map((entry) => ({ ...entry, sentiment: "danger", tag: "new" } as const)),
    ...report.results.removed
      .map(mapFidelityRegressionEntryToEntry)
      .map(
        (entry) => ({ ...entry, sentiment: "danger", tag: "removed" } as const)
      ),
    ...report.results.unchanged
      .map(mapFidelityRegressionPairToEntry)
      .map(
        (entry) =>
          ({ ...entry, sentiment: "success", tag: "unchanged" } as const)
      ),
  ];
}

function generateImageEntriesWithReview(
  report: HostedFidelityRegressionReport,
  review: Review
): Entry[] {
  const itemStatuses = computeReportItemsReviewStatuses(
    report.name,
    report.items ?? [],
    review
  );

  return [
    ...report.results.changed.map(mapFidelityRegressionPairToEntry).map(
      (entry) =>
        ({
          ...entry,
          sentiment: getSentimentForStatus(itemStatuses[entry.id]),
          tag: "changed",
          status: getEntryStatus(itemStatuses[entry.id]),
        } as const)
    ),
    ...report.results.new.map(mapFidelityRegressionPairToEntry).map(
      (entry) =>
        ({
          ...entry,
          sentiment: getSentimentForStatus(itemStatuses[entry.id]),
          tag: "new",
          status: getEntryStatus(itemStatuses[entry.id]),
        } as const)
    ),
    ...report.results.removed.map(mapFidelityRegressionEntryToEntry).map(
      (entry) =>
        ({
          ...entry,
          sentiment: getSentimentForStatus(itemStatuses[entry.id]),
          tag: "removed",
          status: getEntryStatus(itemStatuses[entry.id]),
        } as const)
    ),
    ...report.results.unchanged.map(mapFidelityRegressionPairToEntry).map(
      (entry) =>
        ({
          ...entry,
          sentiment: getSentimentForStatus(itemStatuses[entry.id]),
          tag: "unchanged",
          status: getEntryStatus(itemStatuses[entry.id]),
        } as const)
    ),
  ];
}

function mapFidelityRegressionEntryToEntry(
  entry: HostedFidelityRegressionTestEntry
): Entry {
  switch (entry.type) {
    case "code":
      return mapFidelityRegressionEntryToCodeEntry(entry);
    case "image":
      return mapFidelityRegressionEntryToImageEntry(entry);
  }
}

function mapFidelityRegressionEntryToImageEntry(
  entry: ImageFidelityRegressionTestEntry<HostedResource>
): ImageEntry {
  return {
    type: "image",
    id: entry.id,
    thumbnailUrl: entry.image.url,
    path: entry.path,
  };
}

function mapFidelityRegressionEntryToCodeEntry(
  entry: CodeFidelityRegressionTestEntry<HostedResource>
): CodeEntry {
  return {
    type: "code",
    id: entry.id,
    path: entry.path,
  };
}

function mapFidelityRegressionPairToEntry(
  pair: HostedFidelityRegressionTestPair
): Entry {
  switch (pair.type) {
    case "code":
      return mapFidelityRegressionPairToCodeEntry(pair);
    case "image":
      return mapFidelityRegressionPairToImageEntry(pair);
  }
}

function mapFidelityRegressionPairToImageEntry(
  pair: ImageFidelityRegressionTestPair<HostedResource>
): ImageEntry {
  return {
    type: "image",
    id: pair.actual.id,
    thumbnailUrl: pair.fidelityComparison.diff.url,
    path: pair.actual.path,
    score: pair.fidelityComparison.similarity,
  };
}

function mapFidelityRegressionPairToCodeEntry(
  pair: CodeFidelityRegressionTestPair<HostedResource>
): CodeEntry {
  return {
    type: "code",
    id: pair.actual.id,
    path: pair.actual.path,
    score: pair.fidelityComparison.similarity,
  };
}

function getSentimentForStatus(status: ItemStatus): Sentiment {
  switch (status) {
    case "approved":
      return "success";
    case "success":
      return "success";
    case "failure":
      return "danger";
    case "changes_requested":
      return "danger";
  }
}

function getEntryStatus(status: ItemStatus): EntryStatus | undefined {
  switch (status) {
    case "approved":
      return "approved";
    case "changes_requested":
      return "changes_requested";
  }
}
