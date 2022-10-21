import {
  HostedFidelityReport,
  HostedFidelityTestPair,
  Review,
  Sentiment,
} from "@animaapp/scooby-shared";
import { ImageEntry } from "../../../components/ImageEntryList";
import { getRankForSentiment } from "../../../utils/rank";
import { computeReportItemsReviewStatuses } from "../../../utils/review";

type EnrichedImageEntry = ImageEntry & {
  fidelityPair: HostedFidelityTestPair;
};

export function generateImageEntries(
  report: HostedFidelityReport,
  review: Review | undefined
): ImageEntry[] {
  const entries: EnrichedImageEntry[] = [];
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
      return (
        a.fidelityPair.comparison.similarity -
        b.fidelityPair.comparison.similarity
      );
    }
  });

  return entries;
}

function generateImageEntriesWithoutReview(
  report: HostedFidelityReport
): EnrichedImageEntry[] {
  return report.pairs.map(mapFidelityPairToImageEntry);
}

function generateImageEntriesWithReview(
  report: HostedFidelityReport,
  review: Review
): EnrichedImageEntry[] {
  const itemStatuses = computeReportItemsReviewStatuses(
    report.items ?? [],
    review
  );

  return report.pairs.map(mapFidelityPairToImageEntry).map((entry) => {
    const status = itemStatuses[entry.id];

    if (status === "changes_requested") {
      return {
        ...entry,
        sentiment: "danger",
        status: "changes_requested",
      };
    } else if (status === "approved") {
      return {
        ...entry,
        sentiment: "success",
        status: "approved",
      };
    } else {
      return entry;
    }
  });
}

function mapFidelityPairToImageEntry(
  pair: HostedFidelityTestPair
): EnrichedImageEntry {
  let sentiment: Sentiment = "success";
  if (pair.comparison.similarity < 0.5) {
    sentiment = "danger";
  } else if (pair.comparison.similarity < 1) {
    sentiment = "warning";
  }

  return {
    id: pair.actual.id,
    thumbnailUrl:
      pair.comparison.similarity === 1
        ? pair.comparison.normalizedActual.url
        : pair.comparison.diff.url,
    sentiment,
    tag: pair.comparison.similarity.toFixed(6),
    fidelityPair: pair,
  };
}
