import {
  HostedRegressionReport,
  HostedRegressionTestEntry,
  HostedRegressionTestPair,
  Review,
  Sentiment,
} from "@animaapp/scooby-shared";
import {
  ImageEntry,
  ImageEntryStatus,
} from "../../../components/ImageEntryList";
import { getRankForSentiment } from "../../../utils/rank";
import {
  computeReportItemsReviewStatuses,
  ItemStatus,
} from "../../../utils/review";

export function generateImageEntries(
  report: HostedRegressionReport,
  review: Review | undefined
): ImageEntry[] {
  const entries: ImageEntry[] = [];
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
): ImageEntry[] {
  return [
    ...report.results.changed
      .map(mapRegressionPairToImageEntry)
      .map(
        (entry) => ({ ...entry, sentiment: "danger", tag: "changed" } as const)
      ),
    ...report.results.new
      .map(mapRegressionEntryToImageEntry)
      .map((entry) => ({ ...entry, sentiment: "danger", tag: "new" } as const)),
    ...report.results.removed
      .map(mapRegressionEntryToImageEntry)
      .map(
        (entry) => ({ ...entry, sentiment: "danger", tag: "removed" } as const)
      ),
    ...report.results.unchanged
      .map(mapRegressionPairToImageEntry)
      .map(
        (entry) =>
          ({ ...entry, sentiment: "success", tag: "unchanged" } as const)
      ),
  ];
}

function generateImageEntriesWithReview(
  report: HostedRegressionReport,
  review: Review
): ImageEntry[] {
  const itemStatuses = computeReportItemsReviewStatuses(
    report.items ?? [],
    review
  );

  return [
    ...report.results.changed.map(mapRegressionPairToImageEntry).map(
      (entry) =>
        ({
          ...entry,
          sentiment: getSentimentForStatus(itemStatuses[entry.id]),
          tag: "changed",
          status: getEntryStatus(itemStatuses[entry.id]),
        } as const)
    ),
    ...report.results.new.map(mapRegressionEntryToImageEntry).map(
      (entry) =>
        ({
          ...entry,
          sentiment: getSentimentForStatus(itemStatuses[entry.id]),
          tag: "new",
          status: getEntryStatus(itemStatuses[entry.id]),
        } as const)
    ),
    ...report.results.removed.map(mapRegressionEntryToImageEntry).map(
      (entry) =>
        ({
          ...entry,
          sentiment: getSentimentForStatus(itemStatuses[entry.id]),
          tag: "removed",
          status: getEntryStatus(itemStatuses[entry.id]),
        } as const)
    ),
    ...report.results.unchanged.map(mapRegressionPairToImageEntry).map(
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

function mapRegressionEntryToImageEntry(
  entry: HostedRegressionTestEntry
): ImageEntry {
  return {
    id: entry.id,
    thumbnailUrl: entry.image.url,
  };
}

function mapRegressionPairToImageEntry(
  pair: HostedRegressionTestPair
): ImageEntry {
  return {
    id: pair.actual.id,
    thumbnailUrl: pair.comparison.diff.url,
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

function getEntryStatus(status: ItemStatus): ImageEntryStatus | undefined {
  switch (status) {
    case "approved":
      return "approved";
    case "changes_requested":
      return "changes_requested";
  }
}
