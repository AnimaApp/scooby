import {
  CodeRegressionTestEntry,
  CodeRegressionTestPair,
  HostedRegressionReport,
  HostedRegressionTestEntry,
  HostedRegressionTestPair,
  HostedResource,
  ImageRegressionTestEntry,
  ImageRegressionTestPair,
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
  report: HostedRegressionReport,
  review: Review | undefined
): Entry[] {
  const entries: Entry[] = [];
  if (!review) {
    entries.push(...generateImageEntriesWithoutReview(report));
  } else {
    entries.push(...generateImageEntriesWithReview(report, review));
  }

  entries.sort(
    (a, b) =>
      (a.sentiment ? getRankForSentiment(a.sentiment) : 0) -
      (b.sentiment ? getRankForSentiment(b.sentiment) : 0)
  );

  return entries;
}

function generateImageEntriesWithoutReview(
  report: HostedRegressionReport
): Entry[] {
  return [
    ...report.results.changed
      .map(mapRegressionPairToEntry)
      .map(
        (entry) => ({ ...entry, sentiment: "danger", tag: "changed" } as const)
      ),
    ...report.results.new
      .map(mapRegressionEntryToEntry)
      .map((entry) => ({ ...entry, sentiment: "danger", tag: "new" } as const)),
    ...report.results.removed
      .map(mapRegressionEntryToEntry)
      .map(
        (entry) => ({ ...entry, sentiment: "danger", tag: "removed" } as const)
      ),
    ...report.results.unchanged
      .map(mapRegressionPairToEntry)
      .map(
        (entry) =>
          ({ ...entry, sentiment: "success", tag: "unchanged" } as const)
      ),
  ];
}

function generateImageEntriesWithReview(
  report: HostedRegressionReport,
  review: Review
): Entry[] {
  const itemStatuses = computeReportItemsReviewStatuses(
    report.items ?? [],
    review
  );

  return [
    ...report.results.changed.map(mapRegressionPairToEntry).map(
      (entry) =>
        ({
          ...entry,
          sentiment: getSentimentForStatus(itemStatuses[entry.id]),
          tag: "changed",
          status: getEntryStatus(itemStatuses[entry.id]),
        } as const)
    ),
    ...report.results.new.map(mapRegressionEntryToEntry).map(
      (entry) =>
        ({
          ...entry,
          sentiment: getSentimentForStatus(itemStatuses[entry.id]),
          tag: "new",
          status: getEntryStatus(itemStatuses[entry.id]),
        } as const)
    ),
    ...report.results.removed.map(mapRegressionEntryToEntry).map(
      (entry) =>
        ({
          ...entry,
          sentiment: getSentimentForStatus(itemStatuses[entry.id]),
          tag: "removed",
          status: getEntryStatus(itemStatuses[entry.id]),
        } as const)
    ),
    ...report.results.unchanged.map(mapRegressionPairToEntry).map(
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

function mapRegressionEntryToEntry(entry: HostedRegressionTestEntry): Entry {
  switch (entry.type) {
    case "code":
      return mapRegressionEntryToCodeEntry(entry);
    case "image":
      return mapRegressionEntryToImageEntry(entry);
  }
}

function mapRegressionEntryToImageEntry(
  entry: ImageRegressionTestEntry<HostedResource>
): ImageEntry {
  return {
    type: "image",
    id: entry.id,
    thumbnailUrl: entry.image.url,
  };
}

function mapRegressionEntryToCodeEntry(
  entry: CodeRegressionTestEntry<HostedResource>
): CodeEntry {
  return {
    type: "code",
    id: entry.id,
  };
}

function mapRegressionPairToEntry(pair: HostedRegressionTestPair): Entry {
  switch (pair.type) {
    case "code":
      return mapRegressionPairToCodeEntry(pair);
    case "image":
      return mapRegressionPairToImageEntry(pair);
  }
}

function mapRegressionPairToImageEntry(
  pair: ImageRegressionTestPair<HostedResource>
): ImageEntry {
  return {
    type: "image",
    id: pair.actual.id,
    thumbnailUrl: pair.comparison.diff.url,
  };
}

function mapRegressionPairToCodeEntry(
  pair: CodeRegressionTestPair<HostedResource>
): CodeEntry {
  return {
    type: "code",
    id: pair.actual.id,
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
