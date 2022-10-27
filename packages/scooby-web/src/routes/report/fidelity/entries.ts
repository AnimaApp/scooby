import {
  CodeFidelityTestPair,
  FidelityTestPair,
  HostedFidelityReport,
  HostedFidelityTestPair,
  HostedResource,
  ImageFidelityTestPair,
  Review,
  Sentiment,
} from "@animaapp/scooby-shared";
import { CodeEntry, Entry, ImageEntry } from "../../../types";
import { getRankForSentiment } from "../../../utils/rank";
import { computeReportItemsReviewStatuses } from "../../../utils/review";

type EnrichedEntry<TEntry extends Entry = Entry> = TEntry & {
  fidelityPair: HostedFidelityTestPair;
};

export function generateEntries(
  report: HostedFidelityReport,
  review: Review | undefined
): Entry[] {
  const entries: EnrichedEntry[] = [];
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
): EnrichedEntry[] {
  return report.pairs.map(mapFidelityPairToEntry);
}

function generateImageEntriesWithReview(
  report: HostedFidelityReport,
  review: Review
): EnrichedEntry[] {
  const itemStatuses = computeReportItemsReviewStatuses(
    report.items ?? [],
    review
  );

  return report.pairs.map(mapFidelityPairToEntry).map((entry) => {
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

function mapFidelityPairToEntry(pair: HostedFidelityTestPair): EnrichedEntry {
  if (pair.type === "image") {
    return mapFidelityPairToImageEntry(pair);
  } else if (pair.type === "code") {
    return mapFidelityPairToCodeEntry(pair);
  }

  throw new Error(
    "unable to generate entry, no handler is defined for pair type: " +
      // @ts-ignore
      pair.type
  );
}

function mapFidelityPairToBaseEntry(pair: FidelityTestPair<HostedResource>) {
  let sentiment: Sentiment = "success";
  if (pair.comparison.similarity < 0.5) {
    sentiment = "danger";
  } else if (pair.comparison.similarity < 1) {
    sentiment = "warning";
  }

  return {
    id: pair.actual.id,
    sentiment,
    tag: pair.comparison.similarity.toFixed(6),
    fidelityPair: pair,
  };
}

function mapFidelityPairToImageEntry(
  pair: ImageFidelityTestPair<HostedResource>
): EnrichedEntry<ImageEntry> {
  return {
    ...mapFidelityPairToBaseEntry(pair),
    type: "image",
    thumbnailUrl:
      pair.comparison.similarity === 1
        ? pair.comparison.normalizedActual.url
        : pair.comparison.diff.url,
  };
}

function mapFidelityPairToCodeEntry(
  pair: CodeFidelityTestPair<HostedResource>
): EnrichedEntry<CodeEntry> {
  return {
    ...mapFidelityPairToBaseEntry(pair),
    type: "code",
  };
}
